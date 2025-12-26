<script setup lang="ts">
import { ref } from 'vue'
import { ChatDotRound, VideoPlay, Promotion, Download } from '@element-plus/icons-vue'
import AppDownloadModal from '@/components/common/AppDownloadModal.vue'

const showDownloadModal = ref(false)
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <h3 class="footer-logo">网腾无限</h3>
          <p class="footer-desc">
            全平台物联网多级分销系统解决方案提供商。<br>
            无限科技、无限收益。
          </p>
          <div class="social-icons">
            <!-- WeChat -->
            <el-popover placement="top" :width="150" trigger="hover">
              <template #reference>
                <div class="icon-btn"><el-icon><ChatDotRound /></el-icon></div>
              </template>
              <div class="qr-code-box">
                <img src="/weixin.png" alt="微信" />
                <p>客服微信</p>
              </div>
            </el-popover>

            <!-- YouTube -->
            <el-tooltip content="YouTube:wuxian.xyz" placement="top">
              <div class="icon-btn"><el-icon><VideoPlay /></el-icon></div>
            </el-tooltip>

            <!-- DingTalk -->
            <el-popover placement="top" :width="150" trigger="hover">
              <template #reference>
                <div class="icon-btn"><el-icon><Promotion /></el-icon></div>
              </template>
              <div class="qr-code-box">
                <img src="/dingtalk.png" alt="官方钉钉" />
                <p>官方钉钉</p>
              </div>
            </el-popover>

            <!-- APP Download -->
            <el-tooltip content="APP下载" placement="top">
              <div class="icon-btn" @click="showDownloadModal = true">
                <el-icon><Download /></el-icon>
              </div>
            </el-tooltip>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="link-group">
            <h4>产品介绍</h4>
            <router-link to="/product">MDM Agent</router-link>
            <router-link to="/product">多租户管理</router-link>
            <router-link to="/product">分销&分润</router-link>
          </div>
          <div class="link-group">
            <h4>解决方案</h4>
            <router-link to="/solutions">航天国防</router-link>
            <router-link to="/solutions">教育医疗</router-link>
            <router-link to="/solutions">数字化方案</router-link>
          </div>
          <div class="link-group">
            <h4>关于我们</h4>
            <router-link to="/join">招贤纳士</router-link>
            <router-link to="/privacy">隐私政策</router-link>
            <router-link to="/terms">使用条款</router-link>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} 网腾无限. All rights reserved.</p>
      </div>
    </div>
    
    <AppDownloadModal v-model="showDownloadModal" />
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  background-color: $color-bg-surface;
  padding: $spacing-xl 0 $spacing-lg;
  border-top: 1px solid $color-border;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: $spacing-xl;
  margin-bottom: $spacing-xl;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
    padding-left: 15px;
  }
}

.footer-logo {
  font-size: 1.5rem;
  margin-bottom: $spacing-md;
  color: $color-primary-black;
}

.footer-desc {
  color: $color-secondary-gray;
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: $spacing-md;
}

.social-icons {
  display: flex;
  gap: 12px;
  
  .icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: $color-bg-white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-secondary-gray;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid $color-border;

    &:hover {
      background: $color-brand-blue;
      color: white;
      border-color: $color-brand-blue;
    }
  }
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.link-group {
  h4 {
    font-size: 1rem;
    margin-bottom: $spacing-md;
    color: $color-primary-black;
  }

  a {
    display: block;
    color: $color-secondary-gray;
    margin-bottom: $spacing-sm;
    font-size: 0.875rem;

    &:hover {
      color: $color-brand-blue;
    }
  }
}

.footer-bottom {
  text-align: center;
  padding-top: $spacing-lg;
  border-top: 1px solid $color-border;
  
  p {
    color: $color-secondary-gray;
    font-size: 0.75rem;
  }
}

.qr-code-box {
  text-align: center;
  padding: 8px;
  
  img {
    width: 120px;
    height: 120px;
    margin-bottom: 8px;
    display: block;
  }
  
  p {
    font-size: 0.875rem;
    color: $color-secondary-gray;
    margin: 0;
  }
}

.show-on-mobile-flex {
  display: none !important;
  
  @media (max-width: 768px) {
    display: flex !important;
    background-color: $color-brand-blue !important;
    color: white !important;
    border-color: $color-brand-blue !important;
  }
}
</style>
