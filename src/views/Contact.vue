<template>
  <div class="contact-view">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container" data-aos="fade-up">
        <h1>联系我们</h1>
        <p>无论是业务合作还是技术咨询，我们都期待与您的交流。</p>
      </div>
    </section>

    <section class="section">
      <div class="container contact-layout">
        <!-- Contact Info & Social -->
        <div class="contact-info" data-aos="fade-right">
          <div class="info-block">
            <h3>公司总部</h3>
            <p>北京市朝阳区博瑞大厦 A 座 2088 室</p>
          </div>

          <div class="info-block">
            <h3>分支机构</h3>
            <ul class="branch-list">
              <li><strong>北京</strong></li>
              <li><strong>杭州</strong></li>
              <li><strong>成都</strong></li>
              <li><strong>深圳</strong></li>
            </ul>
          </div>

          <div class="info-block">
            <h3>联系邮箱</h3>
            <ul class="email-list">
              <li><span>技术支持:</span> support@wuxian.xyz</li>
              <li><span>商务合作:</span> contact@wuxian.xyz</li>
              <li><span>媒体联络:</span> press@wuxian.xyz</li>
            </ul>
          </div>

          <div class="social-block">
            <h3>关注我们</h3>
            <div class="social-icons">
              <!-- WeChat -->
              <el-popover placement="top" :width="200" trigger="hover">
                <template #reference>
                  <div class="social-icon wechat">
                    <el-icon><ChatDotRound /></el-icon>
                  </div>
                </template>
                <div class="qr-code-box">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WeChat-Official-Account" alt="微信公众号" />
                  <p>关注微信公众号</p>
                </div>
              </el-popover>

              <!-- LinkedIn (Link) -->
              <a href="#" target="_blank" class="social-icon linkedin">
                <el-icon><Share /></el-icon>
              </a>

              <!-- Weibo (Link) -->
              <a href="#" target="_blank" class="social-icon weibo">
                <el-icon><View /></el-icon>
              </a>
            </div>
          </div>
        </div>

        <!-- Inquiry Form -->
        <div class="form-wrapper" data-aos="fade-left">
          <div class="form-card">
            <h3>商务咨询</h3>
            <p class="form-desc">请填写以下信息，我们的商务经理将在 24 小时内与您联系。</p>
            
            <el-form 
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="top"
              class="inquiry-form"
              v-loading="loading"
            >
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入您的姓名" />
              </el-form-item>

              <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请输入 11 位手机号码" />
              </el-form-item>

              <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="form.email" placeholder="接收资料或报价单 (选填)" />
              </el-form-item>

              <el-form-item label="公司名称" prop="company">
                <el-input v-model="form.company" placeholder="请输入公司全称" />
              </el-form-item>

              <el-form-item label="咨询类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择咨询类型" style="width: 100%">
                  <el-option label="商务合作 (分销/代理)" value="partnership" />
                  <el-option label="产品咨询 (MDM/PMS)" value="product" />
                  <el-option label="行业解决方案" value="solution" />
                  <el-option label="其他" value="other" />
                </el-select>
              </el-form-item>

              <el-form-item label="详细需求" prop="message">
                <el-input 
                  v-model="form.message" 
                  type="textarea" 
                  :rows="4" 
                  placeholder="请简要描述您的业务场景或需求..." 
                />
              </el-form-item>

              <el-form-item>
                <el-button type="primary" class="submit-btn" @click="submitForm(formRef)">
                  提交咨询
                </el-button>
                <div class="form-privacy-tip">
                  提交即代表您同意我们的 <router-link to="/privacy">隐私政策</router-link>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ChatDotRound, Share, View } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { submitInquiry } from '@/utils/supabase'

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  name: '',
  mobile: '',
  email: '',
  company: '',
  type: '',
  message: ''
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的 11 位手机号码', trigger: 'blur' }
  ],
  company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择咨询类型', trigger: 'change' }],
  message: [{ required: true, message: '请填写详细需求', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const result = await submitInquiry(form)
        if (result.success) {
          ElMessage.success('提交成功！我们会尽快与您联系。')
          formEl.resetFields()
        } else {
          ElMessage.error(result.message)
        }
      } catch (e) {
        ElMessage.error('系统错误，请稍后重试')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.page-hero {
  padding: 120px 0 80px;
  text-align: center;
  background-color: $color-bg-surface;

  h1 {
    font-size: 3rem;
    color: $color-primary-black;
    margin-bottom: $spacing-md;
  }

  p {
    font-size: 1.25rem;
    color: $color-secondary-gray;
  }
}

.section {
  padding: 80px 0;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xxl;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: $spacing-xl;
  }
}

.info-block {
  margin-bottom: $spacing-xl;

  h3 {
    font-size: 1.5rem;
    margin-bottom: $spacing-md;
  }

  p {
    color: $color-secondary-gray;
    margin-bottom: $spacing-sm;
    font-size: 1.125rem;
  }

  ul {
    padding-left: 0;
    
    li {
      display: inline-block;
      margin-right: 12px;
      margin-bottom: 8px;
      color: $color-primary-black;
      font-size: 1rem;
      background: $color-bg-surface;
      padding: 4px 12px;
      border-radius: 4px;
      border: 1px solid $color-border;
      
      strong {
        font-weight: 500;
      }
    }
  }
}

.social-block {
  h3 {
    font-size: 1.5rem;
    margin-bottom: $spacing-md;
  }
}

.social-icons {
  display: flex;
  gap: $spacing-md;
}

.social-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: $color-bg-surface;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: $color-primary-black;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid $color-border;

  &:hover {
    background-color: $color-brand-blue;
    color: white;
    border-color: $color-brand-blue;
  }
}

.form-card {
  background: $color-bg-white;
  padding: $spacing-xl;
  border-radius: 8px;
  border: 1px solid $color-border;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);

  h3 {
    font-size: 1.5rem;
    margin-bottom: $spacing-sm;
  }

  .form-desc {
    color: $color-secondary-gray;
    margin-bottom: $spacing-lg;
  }
}

.submit-btn {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
}

.qr-code-box {
  text-align: center;
  padding: 10px;
  
  img {
    width: 150px;
    height: 150px;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 0.875rem;
    color: $color-secondary-gray;
  }
}

.form-privacy-tip {
  margin-top: 12px;
  text-align: center;
  font-size: 0.85rem;
  color: $color-secondary-gray;

  a {
    color: $color-brand-blue;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
}
</style>
