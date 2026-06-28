import { ref, onMounted, onUnmounted } from 'vue'
import { chatApi } from '@/utils/api'
import type { Message, Conversation } from '@/utils/api'
import { getOrCreateVisitorId } from '@/utils/visitorId'
import { ElMessage } from 'element-plus'

export function useCustomerService(initialConversationId?: number) {
    const messages = ref<Message[]>([])
    const conversation = ref<Conversation | null>(null)
    const loading = ref(false)
    const visitorId = getOrCreateVisitorId()
    let socket: WebSocket | null = null

    // 初始化：查找或创建会话
    const initSession = async () => {
        if (initialConversationId) {
            // 如果传入了 ID (客服端)，直接加载
            await loadConversation(initialConversationId)
        } else {
            // 访客端：查找当前访客的活跃会话
            await findOrCreateConversation()
        }
    }

    // 查找或创建会话
    const findOrCreateConversation = async () => {
        loading.value = true
        try {
            // 1. 查找或创建活跃会话 (由后端 API 统一封装)
            const data = await chatApi.getOrCreateConversation({
                visitor_id: visitorId,
                visitor_name: '访客 ' + visitorId.slice(-4),
                page_url: window.location.href,
                user_agent: navigator.userAgent
            })
            conversation.value = data
            await loadMessages(data.id)
            subscribeToMessages(data.id, false)
        } catch (error: any) {
            console.error('Error init session:', error)
        } finally {
            loading.value = false
        }
    }

    // 加载指定会话 (客服端用)
    const loadConversation = async (id: number) => {
        loading.value = true
        try {
            const data = await chatApi.getConversation(id)
            conversation.value = data
            await loadMessages(id)
            subscribeToMessages(id, true)
        } catch (error: any) {
            console.error('Error loading conversation:', error)
        } finally {
            loading.value = false
        }
    }

    // 加载历史消息
    const loadMessages = async (conversationId: number) => {
        try {
            const data = await chatApi.getMessages(conversationId)
            messages.value = data || []
        } catch (error) {
            console.error('Error loading messages:', error)
        }
    }

    // 订阅实时消息 (使用原生 WebSocket 连接自建服务端)
    const subscribeToMessages = (conversationId: number, isAdmin: boolean = false) => {
        if (socket) {
            socket.close()
        }

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
        const wsUrl = `${protocol}//${window.location.host}/ws`
        socket = new WebSocket(wsUrl)

        socket.onopen = () => {
            // 握手并注册角色及会话 ID
            socket?.send(JSON.stringify({
                type: 'register',
                role: isAdmin ? 'admin' : 'visitor',
                conversationId: conversationId
            }))
        }

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                // 仅处理属于当前会话的即时消息
                if (data.type === 'message' && Number(data.message.conversation_id) === Number(conversationId)) {
                    const exists = messages.value.some(m => m.id === data.message.id)
                    if (!exists) {
                        messages.value.push(data.message)
                    }
                }
            } catch (err) {
                console.error('WebSocket message parsing error:', err)
            }
        }

        socket.onerror = (err) => {
            console.error('WebSocket error:', err)
        }
    }

    // 发送消息
    const sendMessage = async (content: string, senderType: 'visitor' | 'agent' = 'visitor') => {
        if (!conversation.value) return

        // 前端防抖/冷却 (仅针对访客)
        if (senderType === 'visitor') {
            const now = Date.now()
            const lastSent = parseInt(sessionStorage.getItem('last_msg_time') || '0')
            if (now - lastSent < 1000) {
                ElMessage.warning('发送太快了，请稍后再试')
                return
            }
            sessionStorage.setItem('last_msg_time', now.toString())
        }

        const senderName = senderType === 'visitor'
            ? (conversation.value.visitor_name || '访客')
            : '客服'

        try {
            await chatApi.sendMessage(
                conversation.value.id,
                content,
                senderType,
                senderName
            )
            // 发送成功即可，新写入的消息会通过 WebSocket 服务端广播发回给当前客户端，由 onmessage 监听并渲染
        } catch (error: any) {
            console.error('Error sending message:', error)
            ElMessage.error('发送失败，请检查网络连接')
        }
    }

    onMounted(() => {
        // 挂载逻辑
    })

    onUnmounted(() => {
        if (socket) {
            socket.close()
        }
    })

    return {
        messages,
        conversation,
        loading,
        initSession,
        loadConversation,
        sendMessage,
        visitorId
    }
}
