export default [
  {
    path: 'comprehensiveDisplay',
    name: 'comprehensiveDisplay',
    component: () => import('@/components/layout/PlaceholderLayout.vue'),
    meta: { title: '综合展示' }
  },
  {
    path: 'waterSourceMonitoring',
    name: 'waterSourceMonitoring',
    redirect: { name: 'waterSourceProjects' },
    component: () => import('@/components/layout/SidebarLayout.vue'),
    meta: { title: '水源监测' },
    children: [
      {
        path: 'waterSourceProjects',
        name: 'waterSourceProjects',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '水源工程', mark: 'waterSourceMonitoring', icon: 'app-store-fill' }
      },
      {
        path: 'waterDiversionProjects',
        name: 'waterDiversionProjects',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '引水工程', mark: 'waterSourceMonitoring', icon: 'app-store-fill' }
      }
    ]
  },
  {
    path: 'confirmationManagement',
    name: 'confirmationManagement',
    component: () => import('@/components/layout/PlaceholderLayout.vue'),
    meta: { title: '确权管理' }
  },
  {
    path: 'transactionManagement',
    name: 'transactionManagement',
    redirect: { name: 'storageConfiguration' },
    component: () => import('@/components/layout/SidebarLayout.vue'),
    meta: { title: '交易管理' },
    children: [
      {
        path: 'storageConfiguration',
        name: 'storageConfiguration',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '收储配置', mark: 'transactionManagement', icon: 'app-store-fill' }
      },
      {
        path: 'listingInformation',
        name: 'listingInformation',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '挂牌信息', mark: 'transactionManagement', icon: 'app-store-fill' }
      },
      {
        path: 'transactionRecords',
        name: 'transactionRecords',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '交易记录', mark: 'transactionManagement', icon: 'app-store-fill' }
      }
    ]
  },
  {
    path: 'informationService',
    name: 'informationService',
    component: () => import('@/components/layout/PlaceholderLayout.vue'),
    meta: { title: '信息服务' }
  },
  {
    path: 'systemManagement',
    name: 'systemManagement',
    redirect: { name: 'userManagement' },
    component: () => import('@/components/layout/SidebarLayout.vue'),
    meta: { title: '系统管理' },
    children: [
      {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '用户管理', mark: 'systemManagement', icon: 'app-store-fill' }
      },
      {
        path: 'roleManagement',
        name: 'roleManagement',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '角色管理', mark: 'systemManagement', icon: 'app-store-fill' }
      }
    ]
  }
]
