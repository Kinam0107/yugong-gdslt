export default [
  {
    path: 'siquan',
    component: () => import('@/views/si_quan/IndexView.vue'),
    meta: { title: '四全' }
  },
  {
    path: 'sizhi',
    component: () => import('@/views/si_zhi/IndexView.vue'),
    meta: { title: '四制' }
  },
  {
    path: 'siyu',
    component: () => import('@/views/si_yu/IndexView.vue'),
    meta: { title: '四预' }
  },
  {
    path: 'siguan',
    component: () => import('@/views/si_guan/IndexView.vue'),
    meta: { title: '四管' }
  }
]
