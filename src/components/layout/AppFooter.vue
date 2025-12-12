<script setup lang="ts">
import { ChatDotRound, Notebook, VideoPlay, Promotion } from '@element-plus/icons-vue'
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
            <el-tooltip content="微信:staff9525" placement="top">
              <div class="icon-btn"><el-icon><ChatDotRound /></el-icon></div>
            </el-tooltip>
            <el-tooltip content="知乎:nexble" placement="top">
              <div class="icon-btn"><el-icon><Notebook /></el-icon></div>
            </el-tooltip>
            <el-tooltip content="抖音:hanzoWT" placement="top">
              <div class="icon-btn"><el-icon><VideoPlay /></el-icon></div>
            </el-tooltip>
            <el-tooltip content="钉钉:i1000100" placement="top">
              <div class="icon-btn"><el-icon><Promotion /></el-icon></div>
            </el-tooltip>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="link-group">
            <h4>产品介绍</h4>
            <router-link to="/product">MDM Agent</router-link>
            <router-link to="/product">分销系统</router-link>
            <router-link to="/product">广告平台</router-link>
          </div>
          <div class="link-group">
            <h4>解决方案</h4>
            <router-link to="/solutions">航天国防</router-link>
            <router-link to="/solutions">教育医疗</router-link>
            <router-link to="/solutions">金融科技</router-link>
          </div>
          <div class="link-group">
            <h4>关于我们</h4>
            <router-link to="/join">加入我们</router-link>
            <router-link to="/partners">合作伙伴</router-link>
            <router-link to="/contact">联系我们</router-link>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} 网腾无限科技. All rights reserved.</p>
      </div>
    </div>
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
</style>
