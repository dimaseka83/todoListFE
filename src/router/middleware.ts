import { useUser } from '@/stores/User'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUser()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
}
