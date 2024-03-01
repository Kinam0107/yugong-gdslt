import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'virtual:svg-icons-register'
// import 'default-passive-events'
import '@/utils/prototype'
import '@/styles/index.scss'
import App from '@/App.vue'
import router from '@/router'
import SvgIcon from '@/components/SvgIcon.vue'
import PageHeader from '@/components/PageHeader.vue'
import TabBar from '@/components/TabBar.vue'
import TablePagination from '@/components/TablePagination.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('SvgIcon', SvgIcon)
app.component('PageHeader', PageHeader)
app.component('TabBar', TabBar)
app.component('TablePagination', TablePagination)

app.mount('#app')
