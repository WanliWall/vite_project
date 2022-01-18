import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import login from '../views/login/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
