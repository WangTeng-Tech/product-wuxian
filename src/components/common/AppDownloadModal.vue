<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Platform, Monitor, Cpu, Iphone, CircleCheckFilled, User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const userStore = useUserStore()
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// === Auth Logic ===
const isLoginMode = ref(true)
const authForm = reactive({
  email: '',
  password: ''
})
const authRules = reactive({
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ]
})
const authFormRef = ref()

const handleAuth = async () => {
  if (!authFormRef.value) return
  
  await authFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        if (isLoginMode.value) {
          await userStore.signIn(authForm.email, authForm.password)
          ElMessage.success('Login successfully')
        } else {
          await userStore.signUp(authForm.email, authForm.password)
          ElMessage.success('Registration successful! Please check your email to confirm.')
          // Switch to login or stay? Valid user might be returned if auto-confirm is on, otherwise wait.
          // For simple UX, let's assume they can login or utilize the session if Supabase allows.
          // If confirm is required, they can't login yet.
          // Let's assume standard Supabase behavior (often requires email confirm for production).
          // But for "User Convenience", maybe just tell them.
        }
      } catch (e: any) {
        ElMessage.error(e.message || 'Authentication failed')
      }
    }
  })
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="userStore.user ? '下载中心' : '访问验证'"
    width="700px"
    align-center
    class="app-download-modal"
    :append-to-body="true"
  >
    <!-- Logged In: Show Downloads -->
    <div v-if="userStore.user" class="download-layout">
      <!-- Left: Partner Wallet -->
      <div class="download-section partner-section">
        <div class="section-header">
          <h3>无限合伙人钱包</h3>
          <p>分销收益管理与提现</p>
        </div>
        
        <div class="main-app-card">
          <div class="qr-box">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://dl.wuxian.xyz/app/wtwx-wallet.apk" alt="无限合伙人钱包" />
          </div>
          <div class="platform-tag">
            <el-icon><Platform /></el-icon> Android 客户端
          </div>
          <a href="https://dl.wuxian.xyz/app/wtwx-wallet.apk" target="_blank" download>
            <el-button type="primary" round class="download-btn">立即下载</el-button>
          </a>
          <div class="user-info-check">
            <el-tag size="small" type="success">已验证: {{ userStore.user.email }}</el-tag>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Right: MDM Agents -->
      <div class="download-section agent-section">
        <div class="section-header">
          <h3>无限 MDM Agent</h3>
          <p>各端设备接入与管控插件</p>
        </div>

        <div class="agent-list">
          <!-- Android -->
          <div class="agent-item">
            <div class="agent-icon android">
              <el-icon><Platform /></el-icon>
            </div>
            <div class="agent-info">
              <span class="name">Android Agent</span>
              <span class="ver">v2.1.0</span>
            </div>
            <a href="https://dl.wuxian.xyz/app/wtwx-android-agent.apk" target="_blank" download>
              <el-button link type="primary">下载</el-button>
            </a>
          </div>

          <!-- Windows -->
          <div class="agent-item">
            <div class="agent-icon windows">
              <el-icon><Monitor /></el-icon>
            </div>
            <div class="agent-info">
              <span class="name">Windows Agent</span>
              <span class="ver">v1.5.2</span>
            </div>
            <a href="https://dl.wuxian.xyz/app/wtwx-windows-agent.exe" target="_blank" download>
              <el-button link type="primary">下载</el-button>
            </a>
          </div>

          <!-- Linux -->
          <div class="agent-item">
            <div class="agent-icon linux">
              <el-icon><Cpu /></el-icon>
            </div>
            <div class="agent-info">
              <span class="name">Linux Agent</span>
              <span class="ver">v1.2.0</span>
            </div>
            <a href="https://dl.wuxian.xyz/app/wtwx-linux-agent.AppImage" target="_blank" download>
              <el-button link type="primary">下载</el-button>
            </a>
          </div>

          <!-- iOS -->
          <div class="agent-item">
            <div class="agent-icon apple">
              <el-icon><Iphone /></el-icon>
            </div>
            <div class="agent-info">
              <span class="name">iOS Agent</span>
              <span class="ver">v1.0.1</span>
            </div>
            <a href="https://dl.wuxian.xyz/app/wtwx-ios-agent.ipa" target="_blank" download>
              <el-button link type="primary">下载</el-button>
            </a>
          </div>

          <!-- macOS -->
          <div class="agent-item">
            <div class="agent-icon apple">
              <el-icon><Monitor /></el-icon>
            </div>
            <div class="agent-info">
              <span class="name">macOS Agent</span>
              <span class="ver">v1.0.1</span>
            </div>
            <a href="https://dl.wuxian.xyz/app/wtwx-mac-agent.dmg" target="_blank" download>
              <el-button link type="primary">下载</el-button>
            </a>
          </div>
        </div>

        <!-- Security Notice -->
        <div class="security-notice">
          <el-icon><CircleCheckFilled /></el-icon>
          <span>所有安装包均通过 360/火绒/腾讯管家 安全扫描，可放心安装。</span>
        </div>
      </div>
    </div>

    <!-- Not Logged In: Show Auth Form -->
    <div v-else class="auth-container">
      <div class="auth-header">
        <h3 class="auth-title">{{ isLoginMode ? '登录下载中心' : '注册新账户' }}</h3>
        <p class="auth-subtitle">为了保障软件分发安全，请先登录账户以获取下载权限。</p>
      </div>

      <el-form 
        ref="authFormRef"
        :model="authForm"
        :rules="authRules"
        label-position="top"
        class="auth-form"
        @keyup.enter="handleAuth"
      >
        <el-form-item label="电子邮箱" prop="email">
          <el-input 
            v-model="authForm.email" 
            placeholder="请输入您的邮箱"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item label="登录密码" prop="password">
          <el-input 
            v-model="authForm.password" 
            type="password"
            placeholder="请输入密码 (至少 6 位)"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-button 
          type="primary" 
          class="auth-submit-btn" 
          @click="handleAuth" 
          :loading="userStore.loading"
        >
          {{ isLoginMode ? '立即登录' : '注册账户' }}
        </el-button>
      </el-form>

      <div class="auth-switch">
        <span>{{ isLoginMode ? '还没有账户？' : '已有账户？' }}</span>
        <el-link type="primary" @click="isLoginMode = !isLoginMode">
          {{ isLoginMode ? '免费注册' : '直接登录' }}
        </el-link>
      </div>

      <div class="auth-notice">
        <p>登录即代表您同意 <router-link to="/terms">服务条款</router-link> 和 <router-link to="/privacy">隐私政策</router-link></p>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
@use 'sass:color';

/* === Existing Styles === */
.download-layout {
  display: flex;
  gap: 30px;
  padding: 10px 0;

  @media (max-width: 640px) {
    flex-direction: column;
  }
}

.download-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-header {
  text-align: center;
  margin-bottom: 24px;

  h3 {
    font-size: 1.25rem;
    color: $color-primary-black;
    margin-bottom: 4px;
  }

  p {
    font-size: 0.875rem;
    color: $color-secondary-gray;
  }
}

.main-app-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $color-bg-surface;
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 240px;

  .qr-box {
    width: 140px;
    height: 140px;
    background: white;
    padding: 8px;
    border-radius: 8px;
    margin-bottom: 16px;
    
    img {
      width: 100%;
      height: 100%;
    }
  }

  .platform-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    color: $color-secondary-gray;
    font-size: 0.9rem;
    margin-bottom: 16px;
  }

  .download-btn {
    width: 100%;
  }

  .user-info-check {
    margin-top: 12px;
  }
  
  a {
    width: 100%;
    text-decoration: none;
  }
}

.divider {
  width: 1px;
  background-color: $color-border;
  
  @media (max-width: 640px) {
    width: 100%;
    height: 1px;
  }
}

.agent-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.agent-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: $color-bg-surface;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: color.scale($color-bg-surface, $lightness: -2%);
  }

  .agent-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    font-size: 20px;

    &.android { background: rgba(#3DDC84, 0.1); color: #3DDC84; }
    &.windows { background: rgba(#0078D6, 0.1); color: #0078D6; }
    &.linux { background: rgba(#FCC624, 0.1); color: #F7931E; }
    &.apple { background: rgba(#000000, 0.05); color: #000000; }
  }

  .agent-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .name {
      font-size: 0.95rem;
      font-weight: 500;
      color: $color-primary-black;
    }

    .ver {
      font-size: 0.75rem;
      color: $color-secondary-gray;
    }
  }
  
  a {
    text-decoration: none;
  }
}

.security-notice {
  margin-top: 24px;
  padding: 12px;
  background: rgba(#67C23A, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #67C23A;
  font-size: 0.85rem;
  line-height: 1.4;

  .el-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }
}

/* === Auth Styles === */
.auth-container {
  padding: 0 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;

  .auth-title {
    font-size: 1.5rem;
    color: $color-primary-black;
    margin-bottom: 8px;
  }

  .auth-subtitle {
    font-size: 0.9rem;
    color: $color-secondary-gray;
  }
}

.auth-form {
  width: 100%;
  max-width: 320px;
}

.auth-submit-btn {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  margin-top: 10px;
}

.auth-switch {
  margin-top: 20px;
  font-size: 0.9rem;
  color: $color-secondary-gray;
  display: flex;
  gap: 8px;
  align-items: center;
}

.auth-notice {
  margin-top: 30px;
  font-size: 0.75rem;
  color: $color-secondary-gray;
  
  a {
    color: $color-secondary-gray;
    text-decoration: underline;
    &:hover { color: $color-brand-blue; }
  }
}
</style>
