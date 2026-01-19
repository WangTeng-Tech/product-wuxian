<template>
  <div id="app-layout">
    <AppHeader />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
    
    <!-- 客服组件 -->
    <template v-if="showChatWidget">
      <ChatBubble 
        v-if="!isChatOpen"
        :unread-count="unreadCount" 
        @toggle="isChatOpen = true" 
      />
      <transition name="fade">
        <ChatWindow 
          v-if="isChatOpen" 
          @close="isChatOpen = false" 
        />
      </transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ChatBubble from '@/components/customer-service/ChatBubble.vue'
import ChatWindow from '@/components/customer-service/ChatWindow.vue'

const route = useRoute()
const userStore = useUserStore()
const isChatOpen = ref(false)

onMounted(() => {
  userStore.initialize()
})

// 简单计算未读数 (实际应由后端返回或前端计算 last_read_at)
// 这里暂时用 0，或者如果未打开窗口且有新消息则显示
const unreadCount = computed(() => {
  // 简化逻辑：如果聊天窗关闭且有消息，显示红点 (这里暂不实现精确计数)
  return 0 
})

// 在 Admin 页面不显示访客聊天
const showChatWidget = computed(() => {
  return route.path !== '/wtwx-panel' && !route.path.startsWith('/wtwx-panel/')
})
</script>

<style lang="scss" scoped>
#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 80px; // Space for fixed header
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
