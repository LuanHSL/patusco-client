import { createRouter, createWebHistory } from 'vue-router'
import authenticationGuard from './guards/AuthenticationGuard'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  await authenticationGuard(to, from, next)
})

export default function (app) {
  app.use(router)
}
export { router }

