import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import "@/style/reset.scss"
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
import Visitor from './components/visitor/visitor.vue'

import pinia from '@/store'
import router from './router'

import '@/permisstion'

const app = createApp(App)
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login', Login)
app.component('Visitor',Visitor)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia)

app.mount('#app')
