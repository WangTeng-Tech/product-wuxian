<template>
  <div class="admin-view">
    <!-- 登录界面 -->
    <div v-if="!isAuthenticated" class="login-container">
      <el-card class="login-card">
        <template #header>
          <h2>商务咨询管理后台</h2>
        </template>
        <el-form @submit.prevent="handleLogin">
          <el-form-item label="管理员邮箱">
            <el-input 
              v-model="email" 
              type="email" 
              placeholder="请输入管理员邮箱"
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item label="访问密码">
            <el-input 
              v-model="password" 
              type="password" 
              placeholder="请输入管理密码"
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading" style="width: 100%">
            登录
          </el-button>
        </el-form>
      </el-card>
    </div>

    <!-- 数据管理界面 -->
    <div v-else class="admin-container">
      <div class="admin-header">
        <h1>管理后台</h1>
        <div class="header-actions">
          <el-button @click="logout" type="danger">
            <el-icon><SwitchButton /></el-icon> 退出
          </el-button>
        </div>
      </div>

      <el-tabs v-model="activeTab" class="admin-tabs">
        <!-- Tab 1: 商务咨询 (原有功能) -->
        <el-tab-pane label="商务咨询" name="inquiries">
          <div class="tab-actions">
            <el-button @click="refreshData" :loading="loading">
              <el-icon><Refresh /></el-icon> 刷新
            </el-button>
            <el-button @click="exportToCSV">
              <el-icon><Download /></el-icon> 导出 CSV
            </el-button>
          </div>

          <!-- 统计卡片 -->
          <div class="stats-cards">
            <el-card class="stat-card">
              <div class="stat-content">
                <div class="stat-label">总咨询数</div>
                <div class="stat-value">{{ total }}</div>
              </div>
            </el-card>
            <el-card class="stat-card">
              <div class="stat-content">
                <div class="stat-label">今日新增</div>
                <div class="stat-value">{{ todayCount }}</div>
              </div>
            </el-card>
            <el-card class="stat-card">
              <div class="stat-content">
                <div class="stat-label">本周新增</div>
                <div class="stat-value">{{ weekCount }}</div>
              </div>
            </el-card>
          </div>

          <!-- 数据表格 -->
          <el-card class="table-card">
            <el-table 
              :data="inquiries" 
              v-loading="loading"
              stripe
              border
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template #default="{ row }">
                  <div class="expand-content">
                    <p><strong>详细需求：</strong></p>
                    <p class="message-content">{{ row.message }}</p>
                    <p><strong>提交时间：</strong> {{ formatDate(row.created_at) }}</p>
                  </div>
                </template>
              </el-table-column>
              
              <el-table-column prop="name" label="姓名" width="120" />
              <el-table-column prop="company" label="公司" width="200" />
              <el-table-column prop="mobile" label="手机号" width="130" />
              <el-table-column prop="email" label="邮箱" width="200" />
              
              <el-table-column prop="type" label="咨询类型" width="150">
                <template #default="{ row }">
                  <el-tag :type="getTypeColor(row.type)">
                    {{ getTypeLabel(row.type) }}
                  </el-tag>
                </template>
              </el-table-column>
              
              <el-table-column prop="created_at" label="提交时间" width="180">
                <template #default="{ row }">
                  {{ formatDate(row.created_at) }}
                </template>
              </el-table-column>
              
              <el-table-column label="操作" width="150" fixed="right">
                <template #default="{ row }">
                  <el-button 
                    link 
                    type="primary" 
                    @click="copyContact(row)"
                  >
                    复制联系方式
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页控件 -->
            <div class="pagination-container">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-card>
        </el-tab-pane>

        <!-- Tab 2: 在线客服 (新功能) -->
        <el-tab-pane label="在线客服" name="chat">
          <div class="chat-dashboard">
            <!-- 左侧：会话列表 -->
            <div class="conversation-list">
              <div class="list-header">
                <h3>会话列表 ({{ convTotal }})</h3>
                <div class="header-actions">
                  <el-button circle size="small" @click="fetchConversations">
                    <el-icon><Refresh /></el-icon>
                  </el-button>
                  <el-popconfirm
                    title="确定要清理所有空会话吗？"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="cleanupEmptyConversations"
                  >
                    <template #reference>
                      <el-button size="small" type="warning" :loading="cleanupLoading">
                        清理空会话
                      </el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
              
              <div class="conv-list-content">
                <div v-if="conversations.length === 0" class="empty-list">
                  暂无会话
                </div>

                <div 
                  v-for="conv in conversations" 
                  :key="conv.id"
                  class="conversation-item"
                  :class="{ active: currentConversation?.id === conv.id }"
                  @click="selectConversation(conv)"
                >
                  <div class="conv-avatar">
                    <el-avatar :size="40">{{ conv.visitor_name?.slice(-2) || '访客' }}</el-avatar>
                    <div class="status-dot" :class="conv.status"></div>
                  </div>
                  <div class="conv-info">
                    <div class="conv-name">{{ conv.visitor_name || '匿名访客' }}</div>
                    <div class="conv-time">{{ formatTime(conv.last_message_at) }}</div>
                  </div>
                </div>
              </div>

              <!-- 会话列表分页 -->
              <div v-if="convTotal > convPageSize" class="conv-pagination">
                <el-pagination
                  v-model:current-page="convPage"
                  :page-size="convPageSize"
                  layout="prev, pager, next"
                  :total="convTotal"
                  small
                  @current-change="handleConvPageChange"
                />
              </div>
            </div>

            <!-- 右侧：聊天窗口 -->
            <div class="chat-panel">
              <div v-if="!currentConversation" class="no-selection">
                <el-empty description="请选择一个会话开始聊天" />
              </div>
              
              <div v-else class="active-chat">
                <div class="chat-header-bar">
                  <span>{{ currentConversation.visitor_name }}</span>
                  <el-tag size="small" :type="getStatusType(currentConversation.status)">
                    {{ currentConversation.status }}
                  </el-tag>
                </div>

                <div class="chat-messages-area" ref="chatAreaRef">
                  <div v-if="currentMessages.length === 0" class="empty-messages">
                    <p>暂无消息记录</p>
                  </div>
                  <div 
                    v-for="(msg, index) in currentMessages" 
                    :key="msg.id || index"
                    class="admin-message-item"
                    :class="{ 'is-me': msg.sender_type === 'agent' }"
                  >
                    <div class="msg-bubble">
                      {{ msg.content }}
                    </div>
                    <div class="msg-time">{{ formatTime(msg.created_at || '') }}</div>
                  </div>
                </div>

                <div class="chat-input-area">
                  <el-input
                    v-model="replyText"
                    type="textarea"
                    :rows="3"
                    placeholder="输入回复..."
                    @keyup.enter.ctrl="sendReply"
                  />
                  <div class="input-tools">
                    <span class="tip">Ctrl + Enter 发送</span>
                    <el-button type="primary" @click="sendReply" :loading="sending">发送</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh, Download, SwitchButton } from '@element-plus/icons-vue'
import { supabase } from '@/utils/supabase'
import { useCustomerService } from '@/composables/useCustomerService'

const isAuthenticated = ref(false)
const email = ref('')
const password = ref('')
const loading = ref(false)
const activeTab = ref('inquiries')

// --- 商务咨询逻辑 ---
const inquiries = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const todayCount = ref(0)
const weekCount = ref(0)

// 登录
const handleLogin = async () => {
  if (!email.value || !password.value) {
    ElMessage.warning('请输入邮箱和密码')
    return
  }

  if (!supabase) {
    ElMessage.error('数据库连接未初始化')
    return
  }

  loading.value = true
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) throw error

    isAuthenticated.value = true
    ElMessage.success('登录成功')
    fetchStats()
    fetchInquiries()
    fetchConversations()
  } catch (error: any) {
    ElMessage.error('登录失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

// 退出
const logout = async () => {
  if (!supabase) return
  try {
    await supabase.auth.signOut()
    isAuthenticated.value = false
    email.value = ''
    password.value = ''
    ElMessage.success('已退出登录')
  } catch (error: any) {
    ElMessage.error('退出失败: ' + error.message)
  }
}

// 获取统计数据 (独立获取，不受分页影响)
const fetchStats = async () => {
  if (!supabase) return
  
  // 获取总数
  const { count } = await supabase.from('inquiries').select('*', { count: 'exact', head: true })
  total.value = count || 0

  // 获取今日新增
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const { count: todayC } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString())
  todayCount.value = todayC || 0

  // 获取本周新增
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const { count: weekC } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', weekAgo.toISOString())
  weekCount.value = weekC || 0
}

const fetchInquiries = async () => {
  loading.value = true
  try {
    if (!supabase) return
    
    const from = (currentPage.value - 1) * pageSize.value
    const to = from + pageSize.value - 1

    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error
    inquiries.value = data || []
  } catch (error: any) {
    ElMessage.error('获取咨询失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchInquiries()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchInquiries()
}

const refreshData = () => {
  fetchStats()
  fetchInquiries()
  ElMessage.success('数据已刷新')
}

const exportToCSV = async () => {
  // 导出时获取所有数据
  if (!supabase) return
  const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
  
  if (!data) return

  const headers = ['姓名', '公司', '手机号', '邮箱', '咨询类型', '详细需求', '提交时间']
  const rows = data.map(item => [
    item.name, item.company, item.mobile, item.email || '',
    getTypeLabel(item.type), item.message, formatDate(item.created_at)
  ])
  const csv = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n')
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `inquiries_${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
}

const copyContact = (row: any) => {
  const text = `姓名: ${row.name}\n公司: ${row.company}\n手机: ${row.mobile}\n邮箱: ${row.email || '未填写'}`
  navigator.clipboard.writeText(text)
  ElMessage.success('已复制')
}

// --- 在线客服逻辑 ---
const conversations = ref<any[]>([])
const currentConversation = ref<any>(null)
const replyText = ref('')
const sending = ref(false)
const chatAreaRef = ref<HTMLElement | null>(null)
const convPage = ref(1)
const convPageSize = ref(20)
const convTotal = ref(0)
const cleanupLoading = ref(false)

// 复用 composable，但这里主要用于单个会话的操作
const { 
  messages: currentMessages, 
  loadConversation,
  sendMessage 
} = useCustomerService()

// 获取会话列表
const fetchConversations = async () => {
  if (!supabase) return
  try {
    // 获取总数
    const { count } = await supabase
      .from('customer_conversations')
      .select('*', { count: 'exact', head: true })
    convTotal.value = count || 0

    // 获取分页数据
    const from = (convPage.value - 1) * convPageSize.value
    const to = from + convPageSize.value - 1

    const { data, error } = await supabase
      .from('customer_conversations')
      .select('*')
      .order('last_message_at', { ascending: false })
      .range(from, to)
    
    if (error) throw error
    conversations.value = data || []
  } catch (error) {
    console.error('Error fetching conversations:', error)
    ElMessage.error('获取会话列表失败')
  }
}

const handleConvPageChange = (val: number) => {
  convPage.value = val
  fetchConversations()
}

// 清理空会话
const cleanupEmptyConversations = async () => {
  if (!supabase) return
  
  cleanupLoading.value = true
  try {
    // 1. 获取所有会话ID
    const { data: allConvs, error: fetchError } = await supabase
      .from('customer_conversations')
      .select('id')
    
    if (fetchError) throw fetchError
    if (!allConvs || allConvs.length === 0) {
      ElMessage.info('没有会话需要清理')
      return
    }

    // 2. 检查每个会话是否有消息
    const emptyConvIds: number[] = []
    for (const conv of allConvs) {
      const { count } = await supabase
        .from('customer_messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', conv.id)
      
      if (count === 0) {
        emptyConvIds.push(conv.id)
      }
    }

    if (emptyConvIds.length === 0) {
      ElMessage.success('没有空会话，无需清理')
      return
    }

    // 3. 删除空会话
    const { error: deleteError } = await supabase
      .from('customer_conversations')
      .delete()
      .in('id', emptyConvIds)
    
    if (deleteError) throw deleteError

    ElMessage.success(`成功清理 ${emptyConvIds.length} 个空会话`)
    
    // 4. 刷新列表
    convPage.value = 1
    await fetchConversations()
    
    // 5. 如果当前选中的会话被删除了，清空选择
    if (currentConversation.value && emptyConvIds.includes(currentConversation.value.id)) {
      currentConversation.value = null
    }
  } catch (error: any) {
    console.error('Error cleaning up conversations:', error)
    ElMessage.error('清理失败: ' + error.message)
  } finally {
    cleanupLoading.value = false
  }
}

// 选择会话
const selectConversation = async (conv: any) => {
  currentConversation.value = conv
  await loadConversation(conv.id)
  scrollToBottom()
}

// 发送回复
const sendReply = async () => {
  if (!replyText.value.trim() || !currentConversation.value) return
  
  sending.value = true
  try {
    await sendMessage(replyText.value, 'agent')
    replyText.value = ''
    scrollToBottom()
    // 更新列表中的时间
    fetchConversations() 
  } finally {
    sending.value = false
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatAreaRef.value) {
    chatAreaRef.value.scrollTop = chatAreaRef.value.scrollHeight
  }
}

// 监听新消息滚动
watch(() => currentMessages.value.length, scrollToBottom)

// 初始化
onMounted(async () => {
  if (!supabase) {
    console.warn('Supabase not configured. Admin features will be limited.')
    return
  }
  // 检查是否已登录
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    isAuthenticated.value = true
    fetchStats()
    fetchInquiries()
    fetchConversations()
    
    // 订阅新会话
    supabase
      .channel('admin-conversations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'customer_conversations' }, () => {
        fetchConversations()
      })
      .subscribe()
  }
})

// --- 通用工具 ---
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  })
}

const formatTime = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
  return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'partnership': '商务合作', 'product': '产品咨询',
    'solution': '解决方案', 'other': '其他'
  }
  return labels[type] || type
}

const getTypeColor = (type: string): any => {
  const colors: Record<string, string> = {
    'partnership': 'success', 'product': 'primary',
    'solution': 'warning', 'other': 'info'
  }
  return colors[type] || 'info'
}

const getStatusType = (status: string) => {
  return status === 'active' ? 'success' : (status === 'waiting' ? 'warning' : 'info')
}
</script>

<style lang="scss" scoped>
.admin-view {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  h2 { text-align: center; margin: 0; }
}

.admin-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h1 { margin: 0; }
}

.tab-actions {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  .stat-content { text-align: center; }
  .stat-label { font-size: 14px; color: #909399; margin-bottom: 8px; }
  .stat-value { font-size: 32px; font-weight: 700; color: #409eff; }
}

.expand-content {
  padding: 20px;
  background-color: #f9fafb;
  .message-content { white-space: pre-wrap; line-height: 1.6; }
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 客服面板样式 */
.chat-dashboard {
  display: flex;
  height: 600px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  overflow: hidden;
}

.conversation-list {
  width: 300px;
  border-right: 1px solid #ebeef5;
  display: flex;
  flex-direction: column;
  background: #fcfcfc;

  .list-header {
    padding: 15px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 { margin: 0; font-size: 16px; }
    
    .header-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  }

  .conv-list-content {
    flex: 1;
    overflow-y: auto;
  }

  .empty-list {
    padding: 20px;
    text-align: center;
    color: #909399;
  }

  .conversation-item {
    padding: 15px;
    display: flex;
    gap: 12px;
    cursor: pointer;
    transition: background 0.2s;
    border-bottom: 1px solid #f0f2f5;

    &:hover { background: #f5f7fa; }
    &.active { background: #ecf5ff; }

    .conv-avatar {
      position: relative;
      .status-dot {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid #fff;
        &.active { background: #67c23a; }
        &.waiting { background: #e6a23c; }
        &.closed { background: #909399; }
      }
    }

    .conv-info {
      flex: 1;
      overflow: hidden;
      .conv-name { font-weight: 500; margin-bottom: 4px; }
      .conv-time { font-size: 12px; color: #909399; }
    }
  }

  .conv-pagination {
    padding: 10px;
    border-top: 1px solid #ebeef5;
    display: flex;
    justify-content: center;
  }
}

.chat-panel {
  flex: 1;
  display: flex;
  flex-direction: column;

  .no-selection {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active-chat {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .chat-header-bar {
    padding: 15px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
  }

  .chat-messages-area {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #f5f7fa;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .empty-messages {
      text-align: center;
      color: #909399;
      margin-top: 20px;
    }
  }

  .admin-message-item {
    display: flex;
    flex-direction: column;
    max-width: 70%;
    
    &.is-me {
      align-self: flex-end;
      align-items: flex-end;
      .msg-bubble { background: #409eff; color: #fff; border-radius: 12px 12px 0 12px; }
    }

    &:not(.is-me) {
      align-self: flex-start;
      .msg-bubble { background: #fff; border-radius: 12px 12px 12px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    }

    .msg-bubble { padding: 10px 15px; line-height: 1.5; }
    .msg-time { font-size: 12px; color: #c0c4cc; margin-top: 4px; }
  }

  .chat-input-area {
    padding: 15px;
    border-top: 1px solid #ebeef5;
    background: #fff;

    .input-tools {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      .tip { font-size: 12px; color: #909399; }
    }
  }
}
</style>
