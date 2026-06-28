import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // 允许跨域携带 cookie (如 JWT 身份凭证)
  headers: {
    'Content-Type': 'application/json'
  }
})

// === 数据接口定义 ===

export interface InquiryForm {
  name: string
  mobile: string
  email?: string
  company: string
  type: string
  message: string
}

export interface Inquiry extends InquiryForm {
  id: number
  inquiry_type: string
  status: string
  created_at: string
}

export interface User {
  id: number
  email: string
}

export interface Session {
  user: User
}

export interface Message {
  id?: number
  conversation_id: number
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
  page_url?: string
  user_agent?: string
  created_at?: string
}

// === 商务咨询公共 API ===

/**
 * 提交商务咨询
 * @param formData 表单数据
 */
export const submitInquiry = async (formData: InquiryForm) => {
  try {
    const response = await api.post('/inquiries', {
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      company: formData.company,
      inquiry_type: formData.type,
      message: formData.message
    })
    return { success: true, message: response.data.message || '提交成功' }
  } catch (err: any) {
    console.error('API submission error:', err)
    return { success: false, message: err.response?.data?.error || '提交失败，请稍后重试' }
  }
}

// === 身份验证 API ===

export const authApi = {
  /**
   * 获取当前管理员会话
   */
  async getSession(): Promise<{ data: { session: Session | null } }> {
    try {
      const response = await api.get('/auth/session')
      return { data: { session: response.data.session } }
    } catch (err) {
      return { data: { session: null } }
    }
  },

  /**
   * 登录
   */
  async signIn(email: string, password: string): Promise<{ data: { success: boolean, user: User } | null, error: any }> {
    try {
      const response = await api.post('/auth/login', { email, password })
      return { data: response.data, error: null }
    } catch (err: any) {
      return { data: null, error: err.response?.data || { error: '登录失败' } }
    }
  },

  /**
   * 注销
   */
  async signOut(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }
}

// === 客户服务聊天 API ===

export const chatApi = {
  /**
   * 获取或创建访客的活跃客服会话
   */
  async getOrCreateConversation(params: { visitor_id: string, visitor_name?: string, page_url?: string, user_agent?: string }): Promise<Conversation> {
    const response = await api.post('/conversations', params)
    return response.data
  },

  /**
   * 加载指定客服会话
   */
  async getConversation(id: number): Promise<Conversation> {
    const response = await api.get(`/conversations/${id}`)
    return response.data
  },

  /**
   * 获取会话的所有聊天记录
   */
  async getMessages(conversationId: number): Promise<Message[]> {
    const response = await api.get(`/conversations/${conversationId}/messages`)
    return response.data
  },

  /**
   * 发送聊天消息
   */
  async sendMessage(conversationId: number, content: string, senderType: 'visitor' | 'agent', senderName: string): Promise<Message> {
    const response = await api.post(`/conversations/${conversationId}/messages`, {
      sender_type: senderType,
      sender_name: senderName,
      content
    })
    return response.data
  }
}

// === 管理后台专用数据 API ===

export const adminApi = {
  /**
   * 获取后台咨询与客服仪表盘指标
   */
  async getStats(): Promise<{ totalCount: number, todayCount: number, weekCount: number }> {
    const response = await api.get('/admin/stats')
    return response.data
  },

  /**
   * 获取全部咨询表单数据
   */
  async getInquiries(): Promise<Inquiry[]> {
    const response = await api.get('/admin/inquiries')
    return response.data
  },

  /**
   * 分页获取客服会话列表
   */
  async getConversations(page: number, pageSize: number): Promise<{ list: Conversation[], total: number }> {
    const response = await api.get('/admin/conversations', { params: { page, pageSize } })
    return response.data
  },

  /**
   * 清理无消息的空会话
   */
  async cleanupConversations(): Promise<{ success: boolean, count: number, cleanedIds: number[] }> {
    const response = await api.post('/admin/conversations/cleanup')
    return response.data
  }
}
