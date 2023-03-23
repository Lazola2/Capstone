import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';

// initializing the routes
const routes = [
  {
    // homepage route
    path: '/',
    name: 'home',
    component: function () {
      return import('../views/HomeView.vue');
    }
  },
  {
    // account route: login and register
    path: '/account',
    name: 'account',
    component: function () {
      return import('../views/AccountView.vue');
    }
  },
  {
    // about page route
    path: '/about',
    name: 'about',
    component: function () {
      return import('../views/AboutView.vue');
    }
  },
  {
    path: '/products', beforeEnter() {
      if(!store.state.loggedUser) {
        router.push({name: 'account'});
      }
    },
    
    name: 'products',
    component: function () {
      return import('../views/CoursesView.vue');
    }
  },
  {
    path: '/cart', beforeEnter() {
      if(!store.state.loggedUser) {
        router.push({name: 'account'});
      }
    },
    
    name: 'cart',
    component: function () {
      return import('../views/CartView.vue');
    }
  },
  {
    path: '/checkout', beforeEnter() {
      if(!store.state.loggedUser) {
        router.push({name: 'account'});
      }
    },
    
    name: 'checkout',
    component: function () {
      return import('../views/CheckoutPage.vue');
    }
  },
  {
    path: '/admin', beforeEnter() {
      if(!store.state.loggedUser) {
        router.push({name: 'account'});
      }
    },
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
  },
  {
    path: '/contact',
    name: 'contact',
    component: function () {
      return import('../views/ContactPageView.vue');
    }
  },
  {
    path: '/:patchMatch(.*)*',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: function () {
      return import('../views/HomeView.vue');
    }
  },
  // route for the user's profile
  {
    path: '/profile', beforeEnter() {
      if(!store.state.loggedUser) {
        router.push({name: 'account'});
      }
    },
    
    name: 'profile',
    component: function () {
      return import('../views/UserProfileView.vue');
    }
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
