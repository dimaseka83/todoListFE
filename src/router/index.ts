import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/views/tasks/TasksView.vue'), // Update the path to the correct file name
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(authGuard)

export default router
