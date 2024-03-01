import sidebar from '@/components/layout/SidebarLayout.vue'
import placeholder from '@/components/layout/PlaceholderLayout.vue'

export default [
  {
    path: 'comprehensiveDisplay',
    component: placeholder,
    meta: { title: '综合展示' }
  },
  {
    path: 'waterSourceMonitoring',
    component: () => sidebar,
    meta: { title: '水源监测' },
    children: [
      {
        path: 'waterSourceProjects',
        component: placeholder,
        meta: { title: '水源工程', icon: 'app-store-fill' }
      },
      {
        path: 'waterDiversionProjects',
        component: placeholder,
        meta: { title: '引水工程', icon: 'app-store-fill' }
      }
    ]
  },
  {
    path: 'confirmationManagement',
    component: placeholder,
    meta: { title: '确权管理' }
  },
  {
    path: 'transactionManagement',
    component: () => sidebar,
    meta: { title: '交易管理' },
    children: [
      {
        path: 'storageConfiguration',
        component: placeholder,
        meta: { title: '收储配置', icon: 'app-store-fill' }
      },
      {
        path: 'listingInformation',
        component: placeholder,
        meta: { title: '挂牌信息', icon: 'app-store-fill' }
      },
      {
        path: 'transactionRecords',
        component: placeholder,
        meta: { title: '交易记录', icon: 'app-store-fill' }
      }
    ]
  },
  {
    path: 'informationService',
    component: placeholder,
    meta: { title: '信息服务' }
  },
  {
    path: 'systemManagement',
    component: () => sidebar,
    meta: { title: '系统管理' },
    children: [
      {
        path: 'userManagement',
        component: placeholder,
        meta: { title: '用户管理', icon: 'app-store-fill' }
      },
      {
        path: 'roleManagement',
        component: placeholder,
        meta: { title: '角色管理', icon: 'app-store-fill' }
      }
    ]
  }
]
