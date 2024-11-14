export default [
  {
    path: 'elementControl',
    component: () => import('@/views/elementControl/IndexView.vue'),
    meta: { title: '要素管控' }
  },
  {
    path: 'intelligentProtection',
    component: () => import('@/views/intelligentProtection/IndexView.vue'),
    meta: { title: '水库智护' }
  },
  {
    path: 'collaborativeControl',
    component: () => import('@/views/collaborativeControl/IndexView.vue'),
    meta: { title: '协同管控' }
  },
  {
    path: 'forecastWarning',
    component: () => import('@/views/forecastWarning/IndexView.vue'),
    meta: { title: '预报预警' }
  }
]
