import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';

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
      return import('../views/AboutView.vue');
    }
  },
  {
    path: '/products',/*, beforeEnter() {
      if(!store.state.loggedUser) {
        router.push({name: 'account'});
      }
   },*/
    name: 'products',
    component: function () {
      return import('../views/CoursesView.vue');
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: function () {
      return import('../views/AdminView.vue');
    }
  },
  {
    path: '/course',
    name: 'course',
    component: function () {
      return import('../views/SingleCourseView.vue');
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
