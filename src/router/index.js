import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Simulations from '@/views/Simulations.vue'
import About from '@/views/About.vue'
import Profile from '@/views/Profile.vue'
import ExternalApi from '@/views/ExternalApi'

import { authenticationGuard } from '@/auth/authenticationGuard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/simulations',
      name: 'simulations',
      component: Simulations,
      beforeEnter: authenticationGuard,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: authenticationGuard,
    },
    {
      path: '/external-api',
      name: 'external-api',
      component: ExternalApi,
      beforeEnter: authenticationGuard,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
})

export default router
