import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('@/views/index.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/AboutView.vue')
        },
        {
          path: '/403',
          name: '403',
          component: () => import('@/views/403.vue')
        },
        {
          path: '/404',
          name: '404',
          component: () => import('@/views/404.vue')
        },
        {
          path: '/500',
          name: '500',
          component: () => import('@/views/500.vue')
        }
      ]
    }
  ]
})

export default router
