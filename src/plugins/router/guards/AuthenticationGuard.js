import { useAuthStore } from '@/store/authStore'

const beforeEach = async (to, from, next) => {
  const isLoggedIn = useAuthStore().isLoggedIn()
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else if (to.name === 'me-appointment' && !to.params.id && useAuthStore().isDoctor()) {
    next({ name: 'dashboard' })
  } else if (to.name === 'create-appointment' && isLoggedIn) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
}

export default beforeEach
