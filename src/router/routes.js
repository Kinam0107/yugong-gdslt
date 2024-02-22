export default [
  {
    path: 'comprehensiveDisplay',
    component: () => import('@/components/layout/PlaceholderLayout.vue'),
    meta: { title: '综合展示' }
  },
  {
    path: 'waterSourceMonitoring',
    component: () => import('@/components/layout/SidebarLayout.vue'),
    meta: { title: '水源监测' },
    children: [
      {
        path: 'waterSourceProjects',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '水源工程', icon: 'app-store-fill' }
      },
      {
        path: 'waterDiversionProjects',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '引水工程', icon: 'app-store-fill' }
      }
    ]
  },
  {
    path: 'confirmationManagement',
    component: () => import('@/components/layout/PlaceholderLayout.vue'),
    meta: { title: '确权管理' }
  },
  {
    path: 'transactionManagement',
    component: () => import('@/components/layout/SidebarLayout.vue'),
    meta: { title: '交易管理' },
    children: [
      {
        path: 'storageConfiguration',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '收储配置', icon: 'app-store-fill' }
      },
      {
        path: 'listingInformation',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '挂牌信息', icon: 'app-store-fill' }
      },
      {
        path: 'transactionRecords',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '交易记录', icon: 'app-store-fill' }
      }
    ]
  },
  {
    path: 'informationService',
    component: () => import('@/components/layout/PlaceholderLayout.vue'),
    meta: { title: '信息服务' }
  },
  {
    path: 'systemManagement',
    component: () => import('@/components/layout/SidebarLayout.vue'),
    meta: { title: '系统管理' },
    children: [
      {
        path: 'userManagement',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '用户管理', icon: 'app-store-fill' }
      },
      {
        path: 'roleManagement',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '角色管理', icon: 'app-store-fill' }
      }
    ]
  }
]
