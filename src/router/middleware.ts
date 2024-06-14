import { useUser } from '@/stores/User'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUser()
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth) {
    if (token) {
      try {
        await userStore.fetchUser() // Pastikan fungsi ini mengupdate isAuthenticated
        next()
      } catch (error) {
        next({ name: 'login' })
      }
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
}
