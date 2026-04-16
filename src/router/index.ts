import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/trip',
      name: 'trip',
      component: () => import('@/views/TripView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/gear',
      name: 'gear',
      component: () => import('@/views/GearView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('@/views/WeatherView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/stay',
      name: 'stay',
      component: () => import('@/views/StayView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAppStore()
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && store.isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
