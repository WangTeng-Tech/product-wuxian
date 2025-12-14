<template>
  <div class="solutions-view">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container" data-aos="fade-up">
        <h1>行业定制解决方案</h1>
        <p>深度融合业务场景，为各行各业提供数字化转型动力。</p>
      </div>
    </section>

    <!-- Solutions List -->
    <section class="section">
      <div class="container">
        
        <!-- 1. Smart Elderly Care -->
        <div class="solution-block" id="elderly-care" data-aos="fade-up">
          <div class="content">
            <span class="tag">智慧养老</span>
            <h2>社区养老服务与监管</h2>
            <p>响应人社部养老政策，利用 PMS 系统解决社区上门看护“执行难、监管难”的痛点。通过物联网设备记录服务时长与质量，确保政策红利真正惠及老人。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 政策落地执行方案</li>
              <li><el-icon><Check /></el-icon> 上门服务数字化监管</li>
              <li><el-icon><Check /></el-icon> 服务工单与结算闭环</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><Sunny /></el-icon>
              <span>养老服务监管</span>
            </div>
          </div>
        </div>

        <!-- 2. Pet Industry -->
        <div class="solution-block reverse" id="pet" data-aos="fade-up">
          <div class="content">
            <span class="tag">宠物生态</span>
            <h2>宠物用品私域分销体系</h2>
            <p>为宠物粮、宠物用品构建去中心化的销售渠道。赋能宝妈及低收入人群，通过分享与分销优质宠物产品，实现灵活就业与创收。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 宝妈/个人分销平台</li>
              <li><el-icon><Check /></el-icon> 零库存一件代发</li>
              <li><el-icon><Check /></el-icon> 社交裂变营销工具</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><Present /></el-icon>
              <span>宠物经济分销</span>
            </div>
          </div>
        </div>

        <!-- 3. Blockchain / AI Infrastructure -->
        <div class="solution-block" id="blockchain" data-aos="fade-up">
          <div class="content">
            <span class="tag">区块链 & AI 基建</span>
            <h2>分布式算力资产与收益管理</h2>
            <p>打造去中心化算力网络，支持用户将闲置的 GPU/ASIC 算力设备接入平台。通过智能合约自动分配计算任务，实现算力贡献的透明化收益结算。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 算力设备加盟平台</li>
              <li><el-icon><Check /></el-icon> 每日收益自动结算</li>
              <li><el-icon><Check /></el-icon> 矿机/服务器远程运维</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><Cpu /></el-icon>
              <span>算力收益管理</span>
            </div>
          </div>
        </div>

        <!-- 4. Finance RWA -->
        <div class="solution-block reverse" id="finance" data-aos="fade-up">
          <div class="content">
            <span class="tag">金融科技</span>
            <h2>全域 RWA 资产评估赋能</h2>
            <p>为现实世界资产 (RWA) 提供数字化评估模型。通过物联网数据实时监控资产状态（如车辆、设备、仓储），为金融机构提供精准的信贷风控依据。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 动产状态实时追踪</li>
              <li><el-icon><Check /></el-icon> 资产价值动态评估</li>
              <li><el-icon><Check /></el-icon> 金融级数据风控</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><Wallet /></el-icon>
              <span>RWA 资产评估</span>
            </div>
          </div>
        </div>

        <!-- 5. Rural Revitalization -->
        <div class="solution-block" id="rural" data-aos="fade-up">
          <div class="content">
            <span class="tag">乡村振兴</span>
            <h2>乡村文旅与农家乐分销赋能</h2>
            <p>搭建乡村旅游资源的分销网络。帮助农家乐、民宿对接城市客源，通过分销员体系解决乡村旅游“获客难”问题，带动乡村经济发展。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 农家乐客源引流</li>
              <li><el-icon><Check /></el-icon> 乡村土特产分销</li>
              <li><el-icon><Check /></el-icon> 订单统一管理系统</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><Sunny /></el-icon>
              <span>乡村文旅分销</span>
            </div>
          </div>
        </div>

        <!-- 6. Smart Agriculture -->
        <div class="solution-block reverse" id="agriculture" data-aos="fade-up">
          <div class="content">
            <span class="tag">智慧农业</span>
            <h2>农牧智能设备渠道分销网</h2>
            <p>构建农业无人机、智能灌溉、畜牧监测等设备的销售与服务网络。让先进的农业科技通过分销体系快速下沉到田间地头。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 农机设备代理体系</li>
              <li><el-icon><Check /></el-icon> 售后服务工单管理</li>
              <li><el-icon><Check /></el-icon> 租赁与共享模式支持</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><DataLine /></el-icon>
              <span>农机设备分销</span>
            </div>
          </div>
        </div>

        <!-- 7. 2C Scenarios -->
        <div class="solution-block" id="2c" data-aos="fade-up">
          <div class="content">
            <span class="tag">2C 消费场景</span>
            <h2>个人消费新零售 P2P 分销</h2>
            <p>打通从个人到个人的消费链路。支持新零售产品通过社交网络进行裂变传播，让每个消费者都能成为品牌的传播者与受益者。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 社交电商裂变</li>
              <li><el-icon><Check /></el-icon> 个人带货分佣</li>
              <li><el-icon><Check /></el-icon> 线上线下渠道融合</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><User /></el-icon>
              <span>个人新零售</span>
            </div>
          </div>
        </div>

        <!-- 8. Medical -->
        <div class="solution-block reverse" id="medical" data-aos="fade-up">
          <div class="content">
            <span class="tag">智慧医疗</span>
            <h2>医疗设备共享与分润</h2>
            <p>针对大型医疗设备与康复器械，提供“以租代售”与“按次付费”的商业模式。系统自动统计设备使用频次，为医院、代理商与设备厂商实时结算分润。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 设备使用按次计费</li>
              <li><el-icon><Check /></el-icon> 多方分润自动结算</li>
              <li><el-icon><Check /></el-icon> 耗材销售渠道返佣</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><FirstAidKit /></el-icon>
              <span>医疗设备分润</span>
            </div>
          </div>
        </div>

        <!-- 9. Education -->
        <div class="solution-block" id="education" data-aos="fade-up">
          <div class="content">
            <span class="tag">智慧教育</span>
            <h2>智慧校园内容分发</h2>
            <p>依托校园智能终端，构建优质教育资源的付费分发渠道。老师与内容创作者通过平台发布课程，系统自动处理版权收益与渠道佣金分配。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 教学内容付费订阅</li>
              <li><el-icon><Check /></el-icon> 终端设备远程管控</li>
              <li><el-icon><Check /></el-icon> 渠道推广收益管理</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><Reading /></el-icon>
              <span>教育内容分发</span>
            </div>
          </div>
        </div>

        <!-- 10. Energy -->
        <div class="solution-block reverse" id="energy" data-aos="fade-up">
          <div class="content">
            <span class="tag">智慧能源</span>
            <h2>新能源资产运营</h2>
            <p>覆盖光伏、储能与充电桩场景。从用户充电/用能计费，到场地业主、运营商与投资方的多级返佣，实现能源资产的全链路收益管理。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 充电/储能分时计费</li>
              <li><el-icon><Check /></el-icon> 场地/代理多级返佣</li>
              <li><el-icon><Check /></el-icon> 碳资产交易管理</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><Lightning /></el-icon>
              <span>能源计费返佣</span>
            </div>
          </div>
        </div>

        <!-- 11. Smart Manufacturing -->
        <div class="solution-block" id="manufacturing" data-aos="fade-up">
          <div class="content">
            <span class="tag">智能制造</span>
            <h2>工业互联与价值分配</h2>
            <p>在人机协同的制造场景中，精确计量“人”的技能投入与“物”的生产产出。构建透明的收益管理体系，激励产线工人与设备运营者。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 人机产出价值量化</li>
              <li><el-icon><Check /></el-icon> 生产绩效自动核算</li>
              <li><el-icon><Check /></el-icon> 设备产能共享分红</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><Setting /></el-icon>
              <span>工业价值分配</span>
            </div>
          </div>
        </div>

        <!-- 12. Aerospace -->
        <div class="solution-block reverse" id="aerospace" data-aos="fade-up">
          <div class="content">
            <span class="tag">航天国防</span>
            <h2>特种装备收益管理</h2>
            <p>针对高价值特种装备，建立平台级的资产管理与绩效评估体系。清晰界定各保障单位与人员在装备维护、运行中的价值贡献与收益。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 装备全生命周期管理</li>
              <li><el-icon><Check /></el-icon> 维护保障绩效评估</li>
              <li><el-icon><Check /></el-icon> 资产运营收益核算</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><Promotion /></el-icon>
              <span>特种装备管理</span>
            </div>
          </div>
        </div>

        <!-- 13. New Productivity -->
        <div class="solution-block" id="new-productivity" data-aos="fade-up">
          <div class="content">
            <span class="tag">新质生产力</span>
            <h2>未来产业智能协作</h2>
            <p>面向无人机物流、人形机器人服务等新业态。通过平台调度智能体集群，自动计算任务完成度与算力/能耗成本，实现无人化作业的收益闭环。</p>
            <ul class="features">
              <li><el-icon><Check /></el-icon> 智能体任务计费</li>
              <li><el-icon><Check /></el-icon> 算力/能耗成本分摊</li>
              <li><el-icon><Check /></el-icon> 运营方收益自动结算</li>
            </ul>
          </div>
          <div class="image-placeholder">
            <div class="placeholder-content">
              <el-icon class="icon"><Cpu /></el-icon>
              <span>智能协作收益</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Check, FirstAidKit, Present, Wallet, DataLine, Sunny, Cpu, User, Reading, Lightning, Setting, Promotion } from '@element-plus/icons-vue'
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

.solution-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xxl;
  align-items: center;
  margin-bottom: 120px;

  &.reverse {
    direction: rtl;
    
    .content {
      direction: ltr;
    }
  }

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: $spacing-xl;
    margin-bottom: 80px;
    
    &.reverse {
      direction: ltr;
    }
  }
}

.content {
  .tag {
    display: inline-block;
    padding: 4px 12px;
    background-color: rgba($color-brand-blue, 0.1);
    color: $color-brand-blue;
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: $spacing-md;
  }

  h2 {
    font-size: 2.25rem;
    color: $color-primary-black;
    margin-bottom: $spacing-md;
  }

  p {
    color: $color-secondary-gray;
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: $spacing-lg;
  }

  .features {
    li {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      color: $color-primary-black;
      font-weight: 500;

      .el-icon {
        color: $color-success;
      }
    }
  }
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 4/3;
  background-color: $color-bg-surface;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed $color-border;

  .placeholder-content {
    text-align: center;
    color: $color-secondary-gray;
    
    .icon {
      font-size: 48px;
      margin-bottom: 16px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
