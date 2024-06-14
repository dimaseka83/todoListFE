import { useUser } from '@/stores/User'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUser()
  const token = localStorage.getItem('token')

  if (token) {
    try {
      await userStore.fetchUser()
      if (to.name === 'login' || to.name === 'register') {
        next({ name: 'tasks' })
      } else {
        next()
      }
    } catch (error) {
      userStore.logout()
      next({ name: 'login' })
    }
  } else {
    if (to.meta.requiresAuth) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
}
