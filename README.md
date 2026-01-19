# 无限科技官方网站 (Wuxian Official Website)

无限科技（Wuxian PMS）官方营销门户网站，展示全平台物联网多级分销系统解决方案。

## 🚀 项目概述

本项目基于 **Vue 3 + TypeScript + Vite** 构建，采用极简主义设计风格，旨在为用户提供流畅、专业的浏览体验。

- **最新版本**: v3.1.0
- **最后更新**: 2025-11-27
- **技术栈**: Vue 3, TypeScript, Vite, Element Plus, Supabase

## ✨ 核心功能

### 1. 首页 (Home)
- **英雄区域**: 沉浸式视觉体验，清晰的价值主张。
- **全球客户模块**: 
  - 动态世界地图背景 (SVG/PNG)
  - 全球知名科技企业展示 (Google, Microsoft, Amazon, Meta, etc.)
  - 悬停交互效果
- **业务数据看板**: 实时展示服务客户数 (100+) 和设备连接数 (100K+)。
- **核心优势**: 6大核心能力展示。

### 2. 解决方案 (Solutions)
- **13+ 行业场景**: 覆盖智慧医疗、金融科技、AI算力、智慧农业、新能源、智慧教育、智能制造、新零售等。
- **深度定制**: 针对不同行业痛点的详细解决方案。

### 3. 产品中心 (Product)
- **全平台 MDM**: 支持 Android, Windows, Linux, iOS, macOS 全端设备管理。
- **多级分销体系**: 强大的收益管理与结算系统。
- **APP 下载中心**: 集成 Partner Wallet 和各端 Agent 下载入口。

### 4. 商务咨询 (Contact & Support)
- **Supabase 集成**: 咨询表单数据直接存入 Supabase 数据库。
- **分支机构**: 北京、杭州、成都、深圳四大运营中心展示。
- **支持中心**: 常见问题解答 (FAQ) 和文档索引。

### 5. 即时客服系统 (Customer Service) 🆕
- **访客端**: 
  - 右下角悬浮聊天气泡
  - 实时消息推送 (Supabase Realtime)
  - 自动会话管理
  - 防刷限制 (1秒冷却 + 每分钟10条消息限制)
- **客服端**: 
  - 集成在管理后台的"在线客服"标签页
  - 会话列表实时更新
  - 多会话管理
  - 访客信息展示
- **技术特性**:
  - 基于 Supabase Realtime 的双向通信
  - RLS 行级安全策略保护
  - 前后端双重防刷机制
  - 零额外成本 (使用 Supabase 免费额度)

### 6. 管理后台 (Admin)
- **访问地址**: `/dashboard-panel` (管理入口)
- **认证方式**: Supabase Authentication (Email + Password)
- **功能模块**: 
  - **商务咨询**: 查看、搜索、导出商务咨询数据
  - **在线客服**: 实时会话管理、消息收发
- **安全特性**: 
  - 移除硬编码密码
  - 使用 Supabase Auth 统一认证
  - 不易猜测的访问路径

### 7. 部署与运维
- **Cloudflare Worker**: 智能负载均衡 (`worker-enhanced.js`)，支持地理位置路由和故障转移。
- **多云部署支持**: Vercel, Netlify, Render, 腾讯云。

### 8. Supabase 保活机制 (Keep-Alive) 🆕
针对 Supabase 免费版在长期无活动（通常为 7 天）后会自动关停（Pause）的问题，本项目设计了一套 **“全自动心跳保活” (Keep-Alive)** 策略，确保你的数据库始终处于活跃状态。

- **核心逻辑**: 每周二、五定期触发 GitHub Action，运行脚本对数据库进行一次简单的查询操作。
- **自动化脚本**: [scripts/supabase-keep-alive.mjs](./scripts/supabase-keep-alive.mjs)
- **GitHub Action**: [.github/workflows/supabase-keep-alive.yml](./.github/workflows/supabase-keep-alive.yml)
- **配置要求**: 需要在 GitHub Repo Settings -> Secrets 中配置 `PUBLIC_SUPABASE_URL` 和 `PUBLIC_SUPABASE_ANON_KEY`。

## 🛠️ 技术栈详情

- **核心框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **语言**: TypeScript
- **UI 组件库**: Element Plus
- **样式预处理**: SCSS (Dart Sass)
- **状态管理**: Pinia
- **路由管理**: Vue Router 4
- **动画库**: AOS (Animate On Scroll)
- **后端服务**: Supabase (BaaS)

## 📦 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖
```bash
npm install
```

### 本地开发
```bash
npm run dev
```
访问: `http://localhost:5173`

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 🔧 配置说明

### Supabase 数据库配置

本项目使用 Supabase 作为后端服务，用于存储商务咨询表单数据。

#### 1. 创建 Supabase 项目
1. 访问 [Supabase](https://supabase.com/) 并创建账号
2. 创建新项目
3. 在 SQL Editor 中依次执行以下 SQL 文件：
   - `supabase_schema.sql` (商务咨询表)
   - `supabase_migrations_20251127_customer_service.sql` (客服系统表)
   - `supabase_migrations_20251127_rate_limit.sql` (防刷限制策略)
4. 在 Authentication → Users 中创建管理员账号 (用于登录后台)

#### 2. 配置环境变量

**本地开发环境**：

在项目根目录创建 `.env` 文件：
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

获取凭证：
- 登录 Supabase Dashboard
- 进入 Settings → API
- 复制 **Project URL** 和 **anon public** key

**生产环境**：

在各部署平台的环境变量配置中添加相同的变量。详见 [部署指南](#-部署指南)。

**阶段一：去黑名单（当前阶段）**
策略：严防死守。维持当前的“完全登录墙”模式。
目的：向 Google/Microsoft 传递最清晰的信号——“我们没有公开分发任何文件，请移除警报”。确保申诉一次通过。
优化建议：我会在代码中修复一个小笔误（标题中的“此次下载中心”应为“下载中心”），并可以在登录界面加一行纯文本说明：“支持 Windows, macOS, Android, iOS 全平台客户端”，这样用户在登录前就知道里面有什么，既通过了审查，又兼顾了知情权。
**阶段二：常态化运营（警报解除后）**
策略：展示按钮，点击弹登录框。
技术要求：不能直接渲染 href="file.exe"。必须渲染为 <button @click="showLogin">。只有在登录成功后，才将按钮替换为真正的下载链接。
目的：提升用户体验和转化率。

#### 3. 验证配置

启动开发服务器后，访问 `/contact` 页面提交表单，然后在 Supabase Dashboard 的 Table Editor 中查看 `inquiries` 表是否有数据。

📚 **详细配置文档**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## 🚀 部署指南

### 支持的部署平台

- ✅ **Vercel** - 推荐,部署快速,全球 CDN
- ✅ **Netlify** - 易用,功能丰富
- ✅ **Cloudflare Pages** - 免费无限带宽
- ✅ **Render** - 简单直接

## 🌍 全球化与部署

项目包含 `worker-enhanced.js`,用于 Cloudflare Workers 部署,实现:
- **智能地理路由**: 根据用户位置路由到最快的服务器 (基于 91 节点真实测速数据优化)
  - 国内用户 → Vercel (87.1ms,电信/联通/多线最快)
  - 欧洲用户 → Netlify
  - 其他地区 → Vercel (全球最优)
- **HTML 页面缓存**: 边缘缓存 HTML 页面 (5分钟),二级页面秒开
- **静态资源缓存**: 长期缓存静态资源 (1年),加速全球访问
- **智能回退**: 按权重排序 (Vercel 3, Netlify 2, Render 2, Qcloud 1),故障自动切换

### 性能优化 (2025-11-28)

基于 91 节点国内测速数据的优化:
- ✅ 禁用竞速模式,节省 75% 带宽
- ✅ 启用 HTML 缓存,二级页面从 3-5s 降至 20-90ms
- ✅ 优化地理路由,国内用户延迟从 264ms 降至 87ms (提升 67%)
- ✅ 调整超时时间至 3 秒,提高容错性

**预期效果**: 二级页面加载时间提升 **98%**

## 📄 目录结构
```
wuxian-official-website/
├── public/              # 静态资源 (Logo, Favicon, World Map)
├── src/
│   ├── assets/          # 编译资源
│   ├── components/      # 公共组件
│   │   ├── layout/      # Header, Footer
│   │   └── customer-service/  # 客服组件 (ChatBubble, ChatWindow) 🆕
│   ├── composables/     # 组合式函数 (useCustomerService) 🆕
│   ├── router/          # 路由配置
│   ├── styles/          # 全局样式 (SCSS)
│   ├── utils/           # 工具函数 (Supabase, visitorId) 🆕
│   ├── views/           # 页面视图 (Home, Solutions, Product, Admin...)
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── supabase_schema.sql  # 商务咨询表结构
├── supabase_migrations_20251127_customer_service.sql  # 客服系统表结构 🆕
├── supabase_migrations_20251127_rate_limit.sql  # 防刷限制策略 🆕
├── worker-enhanced.js   # Cloudflare Worker 配置
├── index.html           # HTML 入口
└── vite.config.ts       # Vite 配置
```

---
© 2025 无限科技 (Wuxian PMS). All Rights Reserved.