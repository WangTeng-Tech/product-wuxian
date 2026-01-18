<template>
  <el-dialog
    v-model="visible"
    title="下载中心"
    width="700px"
    align-center
    class="app-download-modal"
    :append-to-body="true"
  >
    <div class="download-layout">
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
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Platform, Monitor, Cpu, Iphone, CircleCheckFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style lang="scss" scoped>
@use 'sass:color';

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
</style>
