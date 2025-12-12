import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: '网腾无限 - 全平台物联网多级分销系统' }
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/views/Product.vue'),
      meta: { title: '产品介绍 - 网腾无限' }
    },
    {
      path: '/solutions',
      name: 'solutions',
      component: () => import('@/views/Solutions.vue'),
      meta: { title: '解决方案 - 网腾无限' }
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('@/views/Support.vue'),
      meta: { title: '支持中心 - 网腾无限' }
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('@/views/JoinUs.vue'),
      meta: { title: '加入我们 - 网腾无限' }
    },
    {
      path: '/partners',
      name: 'partners',
      component: () => import('@/views/Partners.vue'),
      meta: { title: '合作伙伴 - 网腾无限' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/Contact.vue'),
      meta: { title: '联系我们 - 网腾无限' }
    },
    {
      path: '/wtwx-panel',
      name: 'admin',
      component: () => import('@/views/Admin.vue'),
      meta: { title: '管理后台 - 网腾无限' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || '网腾无限'
  next()
})

export default router
