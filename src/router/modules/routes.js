// import sidebar from '@/components/layout/SidebarLayout.vue'
// import endbar from '@/components/layout/EndbarLayout.vue'
import developing from '@/components/layout/DevelopingLayout.vue'
// import placeholder from '@/components/layout/PlaceholderLayout.vue'
// import single from '@/components/layout/SingleProjectLayout.vue'

/**
 * meta: {
 *  title - 功能模块名称&菜单显示名称
 *  icon - 菜单图标，一般用在侧边一级菜单上，取值为'@/assets/icons'文件夹下的文件名(无需.svg后缀)
 *  leaf - 要配合endbar组件使用，标记为侧边菜单的末级，这时此meta属性同级的children里存放最后的标签页菜单
 *  redirectIndex - 指定重定向到子路由的序列号，默认是0，即子路由中的首位
 *  nonMenu - 要配合single组件，标记为单工程菜单
 * }
 * sidebar组件，用于布局侧边菜单栏，一般在有侧边菜单的顶部菜单中配置
 * developing组件，用于待开发模块的先行布局，模块开发后需要替换掉此组件
 * placeholder组件，占位组件，内容为空，仅仅用来识别路由
 */
export default [
  {
    path: 'siquan',
    component: () => import('@/views/siquan/IndexView.vue'),
    meta: { title: '四全管理' }
  },
  {
    path: 'sizhi',
    component: () => import('@/views/sizhi/IndexView.vue'),
    meta: { title: '四制体系' }
  },
  {
    path: 'siyu',
    component: () => import('@/views/siyu/IndexView.vue'),
    meta: { title: '四预措施' }
  },
  {
    path: 'siguan',
    component: developing,
    meta: { title: '四管工作' }
  }
]
