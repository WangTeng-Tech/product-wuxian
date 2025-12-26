<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-content" data-aos="fade-up">
        <h1 class="hero-title">
          连接万物<br>
          <span class="highlight">赋能商业</span>
        </h1>
        <p class="hero-subtitle">
          全平台物联网多级分销系统解决方案。<br>
          支持 Android, Windows, Linux, iOS/macOS 全端设备管理。
        </p>
        <div class="hero-actions">
          <router-link to="/contact" class="btn btn-primary btn-lg">立即咨询</router-link>
          <router-link to="/product" class="btn btn-outline btn-lg">了解产品</router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section features-section">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>核心能力</h2>
          <p>打造极致的物联网分销体验</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div class="icon-wrapper">
              <el-icon><Monitor /></el-icon>
            </div>
            <h3>全平台兼容</h3>
            <p>完美支持 Android, Windows, Linux, iOS/macOS 等主流操作系统，实现设备统一纳管。</p>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div class="icon-wrapper">
              <el-icon><Share /></el-icon>
            </div>
            <h3>多级分销引擎</h3>
            <p>内置强大的多级分销体系，支持用户分级、佣金自动结算，助力商业模式快速裂变。</p>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div class="icon-wrapper">
              <el-icon><Connection /></el-icon>
            </div>
            <h3>多行业赋能</h3>
            <p>深度适配新质生产力、国防军工、航空航天、乡村振兴、分布式技术、数字化办公等行业场景，提供定制化解决方案。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Global Customers Section -->
    <section class="section customers-section">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>全球客户信赖之选</h2>
          <p>合作伙伴遍布全球</p>
        </div>
        
        <div class="customers-content">
          <div class="map-background">
            <img src="/world.svg" alt="World Map" class="world-map" />
          </div>
          
          <div class="logos-grid" data-aos="fade-up" data-aos-delay="200">
            <div class="logo-item" v-for="customer in customers" :key="customer.name">
              <div class="logo-wrapper">
                <div class="logo-placeholder">
                  <img :src="customer.logo" :alt="customer.name" class="company-logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Solutions Preview -->
    <section class="section solutions-preview">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>行业解决方案</h2>
          <p>深入场景，创造价值</p>
        </div>
        
        <div class="solutions-grid">
          <router-link to="/solutions" class="solution-card" data-aos="fade-up" data-aos-delay="100">
            <div class="card-content">
              <h3>航天国防</h3>
              <p>高安全级的特种设备管理，支持国产化操作系统与物理隔离。</p>
              <span class="link-text">了解更多 &rarr;</span>
            </div>
          </router-link>
          
          <router-link to="/solutions" class="solution-card" data-aos="fade-up" data-aos-delay="200">
            <div class="card-content">
              <h3>新质生产力</h3>
              <p>聚焦低空经济与机器人协同，驱动未来的创新引擎。</p>
              <span class="link-text">了解更多 &rarr;</span>
            </div>
          </router-link>
          
          <router-link to="/solutions" class="solution-card" data-aos="fade-up" data-aos-delay="300">
            <div class="card-content">
              <h3>智慧数字化</h3>
              <p>结合分布式加密技术，保障分销数据透明可追溯。</p>
              <span class="link-text">了解更多 &rarr;</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item" data-aos="fade-up">
            <div class="number">100+</div>
            <div class="label">行业客户</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="100">
            <div class="number">500K+</div>
            <div class="label">在线设备</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="200">
            <div class="number">30+</div>
            <div class="label">覆盖行业</div>
          </div>
          <div class="stat-item" data-aos="fade-up" data-aos-delay="300">
            <div class="number">99.999%</div>
            <div class="label">系统可用性</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container cta-content" data-aos="zoom-in">
        <h2>准备好开始了吗？</h2>
        <p>立即联系我们，获取专属解决方案。</p>
        <router-link to="/contact" class="btn btn-primary btn-lg">联系商务</router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Monitor, Share, Connection } from '@element-plus/icons-vue'

// 全球知名科技公司
const customers = [
  { name: 'Google', logo: '/logos/brandbird-Google-logotype.svg', industry: 'technology' },
  { name: 'Microsoft Azure', logo: '/logos/brandbird-Microsoft Azure-logotype.svg', industry: 'cloud' },
  { name: 'Amazon', logo: '/logos/brandbird-Amazon-logotype.svg', industry: 'cloud' },
  { name: 'Meta', logo: '/logos/brandbird-Meta-logotype.svg', industry: 'social' },
  { name: 'Netflix', logo: '/logos/brandbird-Netflix-logotype.svg', industry: 'media' },
  { name: 'Alibaba', logo: '/logos/brandbird-Alibaba-logotype.svg', industry: 'ecommerce' },
  { name: 'OpenAI', logo: '/logos/brandbird-OpenAI-logotype.svg', industry: 'ai' },
  { name: 'IBM', logo: '/logos/brandbird-IBM-logotype.svg', industry: 'enterprise' }
]
</script>

<style lang="scss" scoped>
@use 'sass:color';

.hero-section {
  padding: 160px 0 100px;
  background-color: $color-bg-white;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 120px 0 60px;
  }
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  color: $color-primary-black;
  margin-bottom: $spacing-lg;
  line-height: 1.1;
  letter-spacing: -1px;

  .highlight {
    background: linear-gradient(120deg, $color-brand-blue 0%, color.mix(#fff, $color-brand-blue, 20%) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  color: $color-secondary-gray;
  margin-bottom: $spacing-xl;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: $spacing-md;
}

.section {
  padding: 100px 0;
  
  &.features-section {
    background-color: $color-bg-surface;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: $color-bg-white;
  padding: $spacing-xl;
  border-radius: 8px;
  border: 1px solid $color-border;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    background-color: rgba($color-brand-blue, 0.1);
    color: $color-brand-blue;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: $spacing-md;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: $spacing-sm;
  }

  p {
    color: $color-secondary-gray;
    font-size: 1rem;
  }
}

.customers-section {
  background-color: $color-bg-white;
  position: relative;
  overflow: hidden;
  padding: 100px 0;
}

.customers-content {
  position: relative;
  min-height: 400px;
  
  .map-background {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 1400px;
    opacity: 0.9;
    pointer-events: none;
    z-index: 0;
    
    .world-map {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

.logos-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: $spacing-lg;
  margin-top: $spacing-xl;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.logo-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-wrapper {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    
    .logo-placeholder {
      background-color: $color-bg-white;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      border-color: $color-brand-blue;
      
      .company-logo {
        filter: grayscale(0%) opacity(1);
        transform: scale(1.05);
      }
    }
  }
}

.logo-placeholder {
  width: 100%;
  height: 100%;
  background-color: $color-bg-surface;
  border: 1px solid $color-border;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  transition: all 0.3s ease;
  
  .company-logo {
    width: 80%;
    height: auto;
    max-height: 60px;
    object-fit: contain;
    filter: grayscale(100%) opacity(0.6);
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
      max-height: 40px;
    }
  }
}

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-lg;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.solution-card {
  display: block;
  background: $color-bg-white;
  border: 1px solid $color-border;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: $color-brand-blue;
    transform: translateY(-5px);
    
    .link-text {
      color: $color-brand-blue;
      padding-left: 5px;
    }
  }

  .card-content {
    padding: $spacing-xl;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: $spacing-md;
    color: $color-primary-black;
  }

  p {
    color: $color-secondary-gray;
    margin-bottom: $spacing-lg;
    min-height: 3rem;
  }

  .link-text {
    font-weight: 500;
    color: $color-primary-black;
    transition: all 0.3s ease;
  }
}

.stats-section {
  background-color: $color-primary-black;
  color: white;
  padding: 80px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-lg;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-xl;
  }
}

.stat-item {
  .number {
    font-size: 3rem;
    font-weight: 700;
    color: $color-brand-blue;
    margin-bottom: $spacing-sm;
    font-family: 'Roboto', sans-serif; // Use a more technical font if available
  }

  .label {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
  }
}

.cta-section {
  padding: 100px 0;
  text-align: center;
  background-color: $color-bg-white;

  h2 {
    font-size: 2.5rem;
    margin-bottom: $spacing-md;
  }

  p {
    font-size: 1.25rem;
    color: $color-secondary-gray;
    margin-bottom: $spacing-lg;
  }
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}
</style>
