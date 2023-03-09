import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: function () {
      return import('../views/HomeView.vue');
    }
  },
  {
    path: '/account',
    name: 'account',
    component: function () {
      return import('../views/AccountView.vue');
    }
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue');
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
