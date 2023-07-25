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
        }
      ]
    }
  ]
})

export default router
