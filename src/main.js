import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import Router from './router'

const app = createApp(App)
app.use(Antd)
app.use(Router)
app.mount('#app')


