import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import MenuView from '@/views/MenuView.vue'
import CustomerView from '@/views/CustomerView.vue'
import TableManagementView from '@/views/TableManagementView.vue'
import OrderManagementView from '@/views/OrderManagementView.vue'
import CallingNumberView from '@/views/CallingNumberView.vue'
import CreateOrderView from '@/views/CreateOrderView.vue'
const routes = [
  
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { layout: 'empty', requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { layout: 'empty', requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'menu',
        name: 'menu',
        component: MenuView,
        meta: { requiresAuth: true }
      },
      {
        path: 'customers',
        name: 'customers',
        component: CustomerView,
        meta: { requiresAuth: true }
      },
      {
        path: 'tables',
        name: 'tables',
        component: TableManagementView,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'orders',
        component: OrderManagementView,
        meta: { requiresAuth: true }
      },
      {
        path: 'calling-number',
        name: 'calling-number',
        component: CallingNumberView,
        meta: { requiresAuth: true }
      },
      {
        path: 'create-order',
        name: 'create-order',
        component: CreateOrderView,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router