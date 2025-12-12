import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/utils/supabase'
import { getOrCreateVisitorId } from '@/utils/visitorId'
import { ElMessage } from 'element-plus'

export interface Message {
    id?: number
    content: string
    sender_type: 'visitor' | 'agent'
    sender_name: string
    created_at?: string
    is_read?: boolean
}

export interface Conversation {
    id: number
    visitor_id: string
    status: string
    last_message_at: string
    visitor_name?: string
}

export function useCustomerService(initialConversationId?: number) {
    const messages = ref<Message[]>([])
    const conversation = ref<Conversation | null>(null)
    const loading = ref(false)
    const visitorId = getOrCreateVisitorId()
    let channel: any = null

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
        if (!supabase) return
        loading.value = true
        try {
            // 1. 查找现有会话
            const { data: existing } = await supabase
                .from('customer_conversations')
                .select('*')
                .eq('visitor_id', visitorId)
                .order('last_message_at', { ascending: false })
                .limit(1)
                .single()

            if (existing) {
                conversation.value = existing
                await loadMessages(existing.id)
                subscribeToMessages(existing.id)
            } else {
                // 2. 创建新会话
                const { data: newConv, error: createError } = await supabase
                    .from('customer_conversations')
                    .insert({
                        visitor_id: visitorId,
                        visitor_name: '访客 ' + visitorId.slice(-4),
                        status: 'waiting',
                        page_url: window.location.href,
                        user_agent: navigator.userAgent
                    })
                    .select()
                    .single()

                if (createError) throw createError
                conversation.value = newConv
                subscribeToMessages(newConv.id)
            }
        } catch (error: any) {
            // PGRST116 means no rows returned, which is fine for findError
            if (error.code !== 'PGRST116') {
                console.error('Error init session:', error)
            }
        } finally {
            loading.value = false
        }
    }

    // 加载指定会话 (客服端用)
    const loadConversation = async (id: number) => {
        if (!supabase) return
        loading.value = true
        try {
            const { data, error } = await supabase
                .from('customer_conversations')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            conversation.value = data
            await loadMessages(id)
            subscribeToMessages(id)
        } catch (error: any) {
            console.error('Error loading conversation:', error)
        } finally {
            loading.value = false
        }
    }

    // 加载历史消息
    const loadMessages = async (conversationId: number) => {
        if (!supabase) return

        const { data, error } = await supabase
            .from('customer_messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true })

        if (error) {
            console.error('Error loading messages:', error)
            return
        }

        messages.value = data || []
    }

    // 订阅实时消息
    const subscribeToMessages = (conversationId: number) => {
        if (!supabase) return
        if (channel) supabase.removeChannel(channel)

        channel = supabase
            .channel(`conversation:${conversationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'customer_messages',
                    filter: `conversation_id=eq.${conversationId}`
                },
                (payload) => {
                    const newMessage = payload.new as Message
                    messages.value.push(newMessage)
                }
            )
            .subscribe()
    }

    // 发送消息
    const sendMessage = async (content: string, senderType: 'visitor' | 'agent' = 'visitor') => {
        if (!conversation.value || !supabase) return

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
            const { error } = await supabase
                .from('customer_messages')
                .insert({
                    conversation_id: conversation.value.id,
                    sender_type: senderType,
                    sender_name: senderName,
                    content
                })

            if (error) throw error

        } catch (error: any) {
            console.error('Error sending message:', error)
            if (error.code === '42501' || error.message?.includes('policy')) {
                ElMessage.error('发送频率过高，请稍后重试')
            } else {
                ElMessage.error('发送失败')
            }
        }
    }

    onMounted(() => {
        // 组件挂载逻辑
    })

    onUnmounted(() => {
        if (channel && supabase) {
            supabase.removeChannel(channel)
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
