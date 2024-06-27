export default [
  {
    path: 'specification',
    component: () => import('@/components/layout/SidebarLayout.vue'),
    meta: { title: '水利厅·桌面端规范' },
    children: [
      {
        path: 'overallSituation',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '全局', icon: 'app-store' },
        children: [
          {
            path: 'layout',
            component: () => import('@/guides/layout/IndexView.vue'),
            meta: { title: '布局' }
          },
          {
            path: 'color',
            component: () => import('@/guides/color/IndexView.vue'),
            meta: { title: '颜色' }
          },
          {
            path: 'typeface',
            component: () => import('@/guides/typeface/IndexView.vue'),
            meta: { title: '字体' }
          },
          {
            path: 'button',
            component: () => import('@/guides/button/IndexView.vue'),
            meta: { title: '按钮' }
          },
          {
            path: 'icon',
            component: () => import('@/guides/icon/IndexView.vue'),
            meta: { title: '图标' }
          }
        ]
      },
      {
        path: 'navigation',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '导航', icon: 'component' },
        children: [
          {
            path: 'menu',
            component: () => import('@/guides/menu/IndexView.vue'),
            meta: { title: '菜单' }
          },
          {
            path: 'pageHeader',
            component: () => import('@/guides/pageHeader/IndexView.vue'),
            meta: { title: '页头' }
          },
          {
            path: 'tabs',
            component: () => import('@/guides/tabs/IndexView.vue'),
            meta: { title: '标签页' }
          },
          {
            path: 'pagination',
            component: () => import('@/guides/pagination/IndexView.vue'),
            meta: { title: '分页' }
          },
          {
            path: 'steps',
            component: () => import('@/guides/steps/IndexView.vue'),
            meta: { title: '步骤条' }
          }
        ]
      },
      {
        path: 'dataEntry',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '数据录入', icon: 'data-materials' },
        children: [
          {
            path: 'inputBox',
            component: () => import('@/guides/input/IndexView.vue'),
            meta: { title: '输入框' }
          },
          {
            path: 'select',
            component: () => import('@/guides/select/IndexView.vue'),
            meta: { title: '选择器' }
          },
          {
            path: 'actionBox',
            component: () => import('@/guides/actionBox/IndexView.vue'),
            meta: { title: '操作框' }
          },
          {
            path: 'upload',
            component: () => import('@/guides/upload/IndexView.vue'),
            meta: { title: '上传' }
          },
          {
            path: 'form',
            component: () => import('@/guides/form/IndexView.vue'),
            meta: { title: '表单' }
          }
        ]
      },
      {
        path: 'dataDisplay',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '数据展示', icon: 'data-search' },
        children: [
          {
            path: 'list',
            component: () => import('@/guides/list/IndexView.vue'),
            meta: { title: '列表' }
          },
          {
            path: 'table',
            component: () => import('@/guides/table/IndexView.vue'),
            meta: { title: '表格' }
          },
          {
            path: 'descriptions',
            component: () => import('@/guides/descriptions/IndexView.vue'),
            meta: { title: '详情描述' }
          }
        ]
      },
      {
        path: 'feedback',
        component: () => import('@/components/layout/PlaceholderLayout.vue'),
        meta: { title: '反馈', icon: 'trumpet' },
        children: [
          {
            path: 'progress',
            component: () => import('@/guides/progress/IndexView.vue'),
            meta: { title: '进度条' }
          },
          {
            path: 'message',
            component: () => import('@/guides/message/IndexView.vue'),
            meta: { title: '全局提示' }
          },
          {
            path: 'alert',
            component: () => import('@/guides/alert/IndexView.vue'),
            meta: { title: '警告提示' }
          },
          {
            path: 'modal',
            component: () => import('@/guides/modal/IndexView.vue'),
            meta: { title: '对话框' }
          }
        ]
      },
      {
        path: 'other',
        component: () => import('@/guides/other/IndexView.vue'),
        meta: { title: '其他', icon: 'bookshelf' }
      },
      {
        path: 'chart',
        component: () => import('@/guides/chart/IndexView.vue'),
        meta: { title: '图表', icon: 'line-chart' }
      },
      {
        path: 'map',
        component: () => import('@/guides/map/IndexView.vue'),
        meta: { title: '地图', icon: 'whole-world' }
      }
    ]
  }
]
