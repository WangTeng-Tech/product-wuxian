import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)
    const session = ref<Session | null>(null)
    const loading = ref(false)

    // 初始化：检查当且会话
    const initialize = async () => {
        if (!supabase) return

        // 获取当前会话
        const { data } = await supabase.auth.getSession()
        session.value = data.session
        user.value = data.session?.user || null

        // 监听 Auth 变化
        supabase.auth.onAuthStateChange((_event: AuthChangeEvent, _session: Session | null) => {
            session.value = _session
            user.value = _session?.user || null
        })
    }

    // 登录
    const signIn = async (email: string, password: string) => {
        if (!supabase) throw new Error('Supabase client not initialized')
        loading.value = true
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) throw error
        } finally {
            loading.value = false
        }
    }

    // 注册
    const signUp = async (email: string, password: string) => {
        if (!supabase) throw new Error('Supabase client not initialized')
        loading.value = true
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password
            })
            if (error) throw error
        } finally {
            loading.value = false
        }
    }

    // 登出
    const signOut = async () => {
        if (!supabase) return
        await supabase.auth.signOut()
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
