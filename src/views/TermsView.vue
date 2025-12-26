<template>
  <div class="terms-view">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container" data-aos="fade-up">
        <h1>使用条款</h1>
        <p>感谢您选择网腾无限。请在使用我们的服务前仔细阅读以下条款。</p>
      </div>
    </section>

    <section class="section">
      <div class="container content-wrapper" data-aos="fade-up">
        <div class="terms-content">
          <h2>1. 接受条款</h2>
          <p>通过访问或使用网腾无限（以下简称“我们”）提供的网站、服务或产品，即表示您已阅读、理解并同意受本使用条款（以下简称“条款”）的约束。如果您不同意这些条款，请勿使用我们的服务。</p>

          <h2>2. 服务使用许可</h2>
          <p>我们授予您一项有限的、非排他的、不可转让的许可，允许您按照本条款规定的目的访问和使用我们的网站。您不得：</p>
          <ul>
            <li>逆向工程、反编译或试图获取我们软件的源代码。</li>
            <li>利用我们的服务从事任何非法活动或破坏社交秩序的行为。</li>
            <li>未经授权访问我们的系统或试图干扰服务的正常运行。</li>
          </ul>

          <h2>3. 知识产权</h2>
          <p>网站上的所有内容，包括但不限于文本、图形、Logo、设计、软件和代码，均属于网腾无限或其许可方的财产，并受著作权法、商标法等法律的保护。未经明示授权，您不得擅自使用、复制或传播这些内容。</p>

          <h2>4. 免责声明</h2>
          <p>我们的服务按“现状”和“现有”的基础提供。在法律允许的最大范围内，我们不提供任何形式的明示或暗示保证，包括但不限于对适销性、特定目的的适用性或不侵权的保证。我们不对由于使用或无法使用我们的服务而导致的任何直接或间接损失承担责任。</p>

          <h2>5. 账户与安全</h2>
          <p>如果您在我们的系统上注册了账户，您有责任妥善保管您的登录信息及账户安全。您对在您账户下发生的所有活动承担全部责任。</p>

          <h2>6. 条款修订</h2>
          <p>我们保留随时修改本条款的权利。修订后的条款将在本页面发布并立即生效。您在条款修订后续使用我们的服务，即视为您接受修订后的内容。</p>

          <h2>7. 法律适用与争议解决</h2>
          <p>本条款受中华人民共和国法律管辖。因执行本条款而产生的任何争议，双方应友好协商解决；协商不成的，应提交至我们所在地有管辖权的人民法院诉讼解决。</p>

          <h2>8. 联系方式</h2>
          <p>如果您对本使用条款有任何疑问，请联系我们：</p>
          <p>邮箱: contact@wuxian.xyz</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Terms page script logic if needed
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

.terms-content {
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
