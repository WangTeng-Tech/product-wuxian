<template>
  <header class="app-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="container header-inner">
      <router-link to="/" class="logo">
        <img src="/logo-symbol.svg" alt="网腾无限" class="logo-icon" />
        <span class="logo-text">网腾无限</span>
      </router-link>

      <nav class="nav-menu" :class="{ 'is-active': isMobileMenuOpen }">
        <router-link to="/" class="nav-link" @click="closeMobileMenu">首页</router-link>
        <router-link to="/product" class="nav-link" @click="closeMobileMenu">产品介绍</router-link>
        <router-link to="/solutions" class="nav-link" @click="closeMobileMenu">解决方案</router-link>
        <router-link to="/partners" class="nav-link" @click="closeMobileMenu">伙伴计划</router-link>
        <router-link to="/contact" class="nav-link" @click="closeMobileMenu">联系我们</router-link>
      </nav>

      <div class="header-actions">
        <button class="btn btn-outline btn-sm hide-on-mobile" @click="showDownloadModal = true">APP 下载</button>
        <router-link to="/contact" class="btn btn-primary btn-sm">立即咨询</router-link>
        <button class="mobile-menu-toggle" :class="{ 'is-active': isMobileMenuOpen }" @click="toggleMobileMenu">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
    </div>

    <AppDownloadModal v-model="showDownloadModal" />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppDownloadModal from '@/components/common/AppDownloadModal.vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const showDownloadModal = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;

  &.is-scrolled {
    background-color: rgba(255, 255, 255, 0.98);
    border-bottom-color: $color-border;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    @media (prefers-color-scheme: dark) {
      background-color: rgba(15, 23, 42, 0.95);
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(15, 23, 42, 0.9);
  }
}

.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: $color-primary-black;
  letter-spacing: -0.5px;
  
  .logo-icon {
    width: 36px;
    height: 36px;
    display: block;
  }
  
  .logo-text {
    display: block;
  }

  @media (prefers-color-scheme: dark) {
    color: white;
    
    .logo-icon {
      filter: brightness(0) invert(1);
    }
  }
}

.nav-menu {
  display: flex;
  gap: $spacing-lg;

  @media (max-width: 768px) {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background-color: white;
    flex-direction: column;
    padding: $spacing-md;
    gap: $spacing-md;
    border-bottom: 1px solid $color-border;
    transform: translateY(-150%);
    transition: transform 0.3s ease;
    z-index: 999;

    &.is-active {
      transform: translateY(0);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    @media (prefers-color-scheme: dark) {
      background-color: rgba(15, 23, 42, 0.95);
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }
  }
}

.nav-link {
  font-size: 1rem;
  font-weight: 500;
  color: $color-secondary-gray;
  position: relative;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.7);
  }
  padding-bottom: 4px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: $color-brand-blue;
    transition: width 0.3s ease;
  }

  &:hover {
    color: $color-primary-black;
    @media (prefers-color-scheme: dark) {
      color: #15bbbeff;
    }
    
    &::after {
      width: 100%;
    }
  }

  &.router-link-active {
    color: $color-primary-black;
    @media (prefers-color-scheme: dark) {
      color: #ffffff;
    }
    
    &::after {
      width: 100%;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: $spacing-md;

  .hide-on-mobile {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .btn-outline {
    @media (prefers-color-scheme: dark) {
      color: rgba(255, 255, 255, 0.9) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;

      &:hover {
        border-color: #ffffff !important;
        color: #ffffff !important;
        background-color: rgba(255, 255, 255, 0.05);
      }
    }
  }
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    display: flex;
  }

  .icon-bar {
    width: 24px;
    height: 2px;
    background-color: $color-primary-black;

    // Force white in dark mode with higher specificity/!important if needed, 
    // but usually media query inside selector works. 
    // Let's ensure it applies by checking the parent context
    @media (prefers-color-scheme: dark) {
      background-color: #ffffff !important;
    }
    
    transition: all 0.3s ease;
  }

  &.is-active {
    .icon-bar:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }
    
    .icon-bar:nth-child(2) {
      opacity: 0;
    }
    
    .icon-bar:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg);
    }
  }
}
</style>
