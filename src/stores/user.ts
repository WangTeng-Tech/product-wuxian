import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/utils/api'
import type { User, Session } from '@/utils/api'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)
    const session = ref<Session | null>(null)
    const loading = ref(false)

    // 初始化：从后端获取当前的会话状态
    const initialize = async () => {
        try {
            const { data } = await authApi.getSession()
            session.value = data.session
            user.value = data.session?.user || null
        } catch (err) {
            session.value = null
            user.value = null
        }
    }

    // 登录
    const signIn = async (email: string, password: string) => {
        loading.value = true
        try {
            const { data, error } = await authApi.signIn(email, password)
            if (error) throw new Error(error.error || '登录失败')
            if (data && data.success) {
                user.value = data.user
                session.value = { user: data.user }
            }
        } finally {
            loading.value = false
        }
    }

    // 注册（由于安全性考虑，后台管理账户目前仅支持通过数据库 Seed 初始化）
    const signUp = async (_email: string, _password: string) => {
        throw new Error('自建后台已关闭公开注册通道，请联系系统管理员分配账号。')
    }

    // 登出
    const signOut = async () => {
        await authApi.signOut()
        user.value = null
        session.value = null
    }

    return {
        user,
        session,
        loading,
        initialize,
        signIn,
        signUp,
        signOut
    }
})
