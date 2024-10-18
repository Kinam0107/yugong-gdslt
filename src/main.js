import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import 'default-passive-events'
import '@/utils/prototype'
import '@/styles/index.scss'
import App from '@/App.vue'
import router from '@/router'
import SvgIcon from '@/components/SvgIcon.vue'

const app = createApp(App)

app.use(createPinia()).use(router).use(ElementPlus).component('SvgIcon', SvgIcon).mount('#app')
