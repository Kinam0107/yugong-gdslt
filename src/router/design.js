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
        component: () => import('@/components/layout/EmptyLayout.vue'),
        meta: { title: '全局', mark: 'specification', icon: 'app-store' },
        children: [
          {
            path: 'layout',
            name: 'layout',
            component: () => import('@/views/design/layout/IndexView.vue'),
            meta: { title: '布局', mark: 'specification' }
          },
          {
            path: 'color',
            name: 'color',
            component: () => import('@/views/design/color/IndexView.vue'),
            meta: { title: '颜色', mark: 'specification' }
          },
          {
            path: 'typeface',
            name: 'typeface',
            component: () => import('@/views/design/typeface/IndexView.vue'),
            meta: { title: '字体', mark: 'specification' }
          },
          {
            path: 'button',
            name: 'button',
            component: () => import('@/views/design/button/IndexView.vue'),
            meta: { title: '按钮', mark: 'specification' }
          },
          {
            path: 'icon',
            name: 'icon',
            component: () => import('@/views/design/icon/IndexView.vue'),
            meta: { title: '图标', mark: 'specification' }
          }
        ]
      },
      {
        path: 'navigation',
        name: 'navigation',
        redirect: { name: 'menu' },
        component: () => import('@/components/layout/EmptyLayout.vue'),
        meta: { title: '导航', mark: 'specification', icon: 'component' },
        children: [
          {
            path: 'menu',
            name: 'menu',
            component: () => import('@/views/design/menu/IndexView.vue'),
            meta: { title: '菜单', mark: 'specification' }
          },
          {
            path: 'pageHeader',
            name: 'pageHeader',
            component: () => import('@/views/design/pageHeader/IndexView.vue'),
            meta: { title: '页头', mark: 'specification' }
          },
          {
            path: 'tabs',
            name: 'tabs',
            component: () => import('@/views/design/tabs/IndexView.vue'),
            meta: { title: '标签页', mark: 'specification' }
          },
          {
            path: 'pagination',
            name: 'pagination',
            component: () => import('@/views/design/pagination/IndexView.vue'),
            meta: { title: '分页', mark: 'specification' }
          },
          {
            path: 'steps',
            name: 'steps',
            component: () => import('@/views/design/steps/IndexView.vue'),
            meta: { title: '步骤条', mark: 'specification' }
          }
        ]
      },
      {
        path: 'dataEntry',
        name: 'dataEntry',
        redirect: { name: 'inputBox' },
        component: () => import('@/components/layout/EmptyLayout.vue'),
        meta: { title: '数据录入', mark: 'specification', icon: 'data-materials' },
        children: [
          {
            path: 'inputBox',
            name: 'inputBox',
            component: () => import('@/views/design/input/IndexView.vue'),
            meta: { title: '输入框', mark: 'specification' }
          },
          {
            path: 'select',
            name: 'select',
            component: () => import('@/views/design/SelectView.vue'),
            meta: { title: '选择器', mark: 'specification' }
          },
          {
            path: 'actionBox',
            name: 'actionBox',
            component: () => import('@/views/design/ActionBoxView.vue'),
            meta: { title: '操作框', mark: 'specification' }
          },
          {
            path: 'upload',
            name: 'upload',
            component: () => import('@/views/design/UploadView.vue'),
            meta: { title: '上传', mark: 'specification' }
          },
          {
            path: 'form',
            name: 'form',
            component: () => import('@/views/design/FormView.vue'),
            meta: { title: '表单', mark: 'specification' }
          }
        ]
      },
      {
        path: 'dataDisplay',
        name: 'dataDisplay',
        redirect: { name: 'list' },
        component: () => import('@/components/layout/EmptyLayout.vue'),
        meta: { title: '数据展示', mark: 'specification', icon: 'data-search' },
        children: [
          {
            path: 'list',
            name: 'list',
            component: () => import('@/views/design/ListView.vue'),
            meta: { title: '列表', mark: 'specification' }
          },
          {
            path: 'table',
            name: 'table',
            component: () => import('@/views/design/TableView.vue'),
            meta: { title: '表格', mark: 'specification' }
          },
          {
            path: 'descriptions',
            name: 'descriptions',
            component: () => import('@/views/design/DescriptionsView.vue'),
            meta: { title: '详情描述', mark: 'specification' }
          }
        ]
      },
      {
        path: 'feedback',
        name: 'feedback',
        redirect: { name: 'progress' },
        component: () => import('@/components/layout/EmptyLayout.vue'),
        meta: { title: '反馈', mark: 'specification', icon: 'trumpet' },
        children: [
          {
            path: 'progress',
            name: 'progress',
            component: () => import('@/views/design/ProgressView.vue'),
            meta: { title: '进度条', mark: 'specification' }
          },
          {
            path: 'message',
            name: 'message',
            component: () => import('@/views/design/MessageView.vue'),
            meta: { title: '全局提示', mark: 'specification' }
          },
          {
            path: 'alert',
            name: 'alert',
            component: () => import('@/views/design/AlertView.vue'),
            meta: { title: '警告提示', mark: 'specification' }
          },
          {
            path: 'modal',
            name: 'modal',
            component: () => import('@/views/design/ModalView.vue'),
            meta: { title: '对话框', mark: 'specification' }
          }
        ]
      },
      {
        path: 'other',
        name: 'other',
        redirect: { name: 'other_' },
        component: () => import('@/components/layout/EmptyLayout.vue'),
        meta: { title: '其他', mark: 'specification', icon: 'bookshelf' },
        children: [
          {
            path: 'other',
            name: 'other_',
            component: () => import('@/views/design/OtherView.vue'),
            meta: { title: '其他', mark: 'specification' }
          }
        ]
      },
      {
        path: 'chart',
        name: 'chart',
        component: () => import('@/views/design/ChartView.vue'),
        meta: { title: '图表', mark: 'specification', icon: 'line-chart' }
      }
    ]
  }
]
