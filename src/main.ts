import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Styles
import 'element-plus/dist/index.css'
import '@/styles/index.scss'

// AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

// Vercel Speed Insights
import { injectSpeedInsights } from '@vercel/speed-insights'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 50
})

// Initialize Vercel Speed Insights (client-side only)
injectSpeedInsights()

app.mount('#app')
