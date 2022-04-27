import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'home',
    component: () => import('@/views/recommend.vue')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('@/views/singer.vue')
  },
  {
    path: '/top-list',
    name: 'top-list',
    component: () => import('@/views/top-list.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
