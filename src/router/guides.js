export default [
  {
    path: 'specification',
    name: 'specification',
    redirect: { name: 'overallSituation' },
    component: () => import('@/components/layout/SidebarLayout.vue'),
    meta: { title: '水利厅·桌面端规范' },
    children: [
      {
        path: 'overallSituation',
        name: 'overallSituation',
        redirect: { name: 'icon' },
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '全局', mark: 'specification', icon: 'app-store' },
        children: [
          {
            path: 'layout',
            name: 'layout',
            component: () => import('@/guides/layout/IndexView.vue'),
            meta: { title: '布局', mark: 'specification' }
          },
          {
            path: 'color',
            name: 'color',
            component: () => import('@/guides/color/IndexView.vue'),
            meta: { title: '颜色', mark: 'specification' }
          },
          {
            path: 'typeface',
            name: 'typeface',
            component: () => import('@/guides/typeface/IndexView.vue'),
            meta: { title: '字体', mark: 'specification' }
          },
          {
            path: 'button',
            name: 'button',
            component: () => import('@/guides/button/IndexView.vue'),
            meta: { title: '按钮', mark: 'specification' }
          },
          {
            path: 'icon',
            name: 'icon',
            component: () => import('@/guides/icon/IndexView.vue'),
            meta: { title: '图标', mark: 'specification' }
          }
        ]
      },
      {
        path: 'navigation',
        name: 'navigation',
        redirect: { name: 'menu' },
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '导航', mark: 'specification', icon: 'component' },
        children: [
          {
            path: 'menu',
            name: 'menu',
            component: () => import('@/guides/menu/IndexView.vue'),
            meta: { title: '菜单', mark: 'specification' }
          },
          {
            path: 'pageHeader',
            name: 'pageHeader',
            component: () => import('@/guides/pageHeader/IndexView.vue'),
            meta: { title: '页头', mark: 'specification' }
          },
          {
            path: 'tabs',
            name: 'tabs',
            component: () => import('@/guides/tabs/IndexView.vue'),
            meta: { title: '标签页', mark: 'specification' }
          },
          {
            path: 'pagination',
            name: 'pagination',
            component: () => import('@/guides/pagination/IndexView.vue'),
            meta: { title: '分页', mark: 'specification' }
          },
          {
            path: 'steps',
            name: 'steps',
            component: () => import('@/guides/steps/IndexView.vue'),
            meta: { title: '步骤条', mark: 'specification' }
          }
        ]
      },
      {
        path: 'dataEntry',
        name: 'dataEntry',
        redirect: { name: 'inputBox' },
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '数据录入', mark: 'specification', icon: 'data-materials' },
        children: [
          {
            path: 'inputBox',
            name: 'inputBox',
            component: () => import('@/guides/input/IndexView.vue'),
            meta: { title: '输入框', mark: 'specification' }
          },
          {
            path: 'select',
            name: 'select',
            component: () => import('@/guides/select/IndexView.vue'),
            meta: { title: '选择器', mark: 'specification' }
          },
          {
            path: 'actionBox',
            name: 'actionBox',
            component: () => import('@/guides/actionBox/IndexView.vue'),
            meta: { title: '操作框', mark: 'specification' }
          },
          {
            path: 'upload',
            name: 'upload',
            component: () => import('@/guides/upload/IndexView.vue'),
            meta: { title: '上传', mark: 'specification' }
          },
          {
            path: 'form',
            name: 'form',
            component: () => import('@/guides/form/IndexView.vue'),
            meta: { title: '表单', mark: 'specification' }
          }
        ]
      },
      {
        path: 'dataDisplay',
        name: 'dataDisplay',
        redirect: { name: 'list' },
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '数据展示', mark: 'specification', icon: 'data-search' },
        children: [
          {
            path: 'list',
            name: 'list',
            component: () => import('@/guides/list/IndexView.vue'),
            meta: { title: '列表', mark: 'specification' }
          },
          {
            path: 'table',
            name: 'table',
            component: () => import('@/guides/table/IndexView.vue'),
            meta: { title: '表格', mark: 'specification' }
          },
          {
            path: 'descriptions',
            name: 'descriptions',
            component: () => import('@/guides/DescriptionsView.vue'),
            meta: { title: '详情描述', mark: 'specification' }
          }
        ]
      },
      {
        path: 'feedback',
        name: 'feedback',
        redirect: { name: 'progress' },
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '反馈', mark: 'specification', icon: 'trumpet' },
        children: [
          {
            path: 'progress',
            name: 'progress',
            component: () => import('@/guides/ProgressView.vue'),
            meta: { title: '进度条', mark: 'specification' }
          },
          {
            path: 'message',
            name: 'message',
            component: () => import('@/guides/MessageView.vue'),
            meta: { title: '全局提示', mark: 'specification' }
          },
          {
            path: 'alert',
            name: 'alert',
            component: () => import('@/guides/AlertView.vue'),
            meta: { title: '警告提示', mark: 'specification' }
          },
          {
            path: 'modal',
            name: 'modal',
            component: () => import('@/guides/ModalView.vue'),
            meta: { title: '对话框', mark: 'specification' }
          }
        ]
      },
      {
        path: 'other',
        name: 'other',
        redirect: { name: 'other_' },
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '其他', mark: 'specification', icon: 'bookshelf' },
        children: [
          {
            path: 'other',
            name: 'other_',
            component: () => import('@/guides/OtherView.vue'),
            meta: { title: '其他', mark: 'specification' }
          }
        ]
      },
      {
        path: 'chart',
        name: 'chart',
        component: () => import('@/guides/ChartView.vue'),
        meta: { title: '图表', mark: 'specification', icon: 'line-chart' }
      }
    ]
  }
]
