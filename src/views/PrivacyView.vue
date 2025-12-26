<template>
  <div class="privacy-view">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container" data-aos="fade-up">
        <h1>隐私政策</h1>
        <p>我们非常重视您的隐私，致力于保护您的个人信息安全。</p>
      </div>
    </section>

    <section class="section">
      <div class="container content-wrapper" data-aos="fade-up">
        <div class="privacy-content">
          <h2>1. 信息收集</h2>
          <p>当您通过我们的官方网站提交咨询表单时，我们可能会收集您的以下信息：</p>
          <ul>
            <li>姓名</li>
            <li>手机号码</li>
            <li>电子邮箱</li>
            <li>公司名称</li>
            <li>咨询的具体业务需求</li>
          </ul>

          <h2>2. 信息用途</h2>
          <p>收集上述信息的目的仅限于：</p>
          <ul>
            <li>回复您的咨询并为您提供所需的业务支持。</li>
            <li>向您发送与您需求相关的产品介绍、报价单或行业解决方案。</li>
            <li>优化我们的服务质量并维护良好的客户关系。</li>
          </ul>

          <h2>3. 信息保护</h2>
          <p>我们采用行业通用的安全技术和保护措施，防止您的个人信息在未经授权的情况下被访问、使用、泄露或损坏。您的数据存储在安全的服务器环境下，并受到严格的权限控制。</p>

          <h2>4. 第三方披露</h2>
          <p>我们承诺不会将您的个人信息出售、出租或以任何形式提供给第三方，除非：</p>
          <ul>
            <li>获得您的明确同意。</li>
            <li>法律法规、政府部门的要求。</li>
            <li>在紧急情况下为保护我们的合法权利或公共利益而必须进行的操作。</li>
          </ul>

          <h2>5. Cookies 使用</h2>
          <p>本网站可能会使用 Cookies 来优化您的浏览体验并统计网站流量数据。您可以通过浏览器设置拒绝 Cookies，但这可能会影响您使用某些功能。</p>

          <h2>6. 更新与修订</h2>
          <p>我们可能会根据相关法律法规或业务发展不时更新本隐私政策。更新后的政策一旦在网站公布即刻生效。建议您定期查看本页面。 </p>

          <h2>7. 联系我们</h2>
          <p>如果您对本隐私政策有任何疑问或希望更正、删除您的个人信息，请通过以下方式联系我们：</p>
          <p>邮箱: contact@wuxian.xyz</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Privacy page script logic if needed
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

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.privacy-content {
  line-height: 1.8;
  color: $color-primary-black;

  h2 {
    font-size: 1.75rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: $color-brand-blue;
    border-left: 4px solid $color-brand-blue;
    padding-left: 1rem;
  }

  p {
    margin-bottom: 1rem;
    color: $color-secondary-gray;
  }

  ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      color: $color-secondary-gray;
      list-style-type: disc;
    }
  }
}
</style>
