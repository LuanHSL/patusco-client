export const routes = [
  { path: '/', redirect: { name: 'dashboard' } },
  {
    path: '/me/',
    component: () => import('@/layouts/default.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path: 'appointment/:id?',
        name: 'me-appointment',
        component: () => import('@/pages/appointment.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
      {
        path: 'create-appointment',
        name: 'create-appointment',
        component: () => import('@/pages/appointment.vue'),
      },
    ],
  },
]
