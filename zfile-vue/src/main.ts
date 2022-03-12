import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
import router from './router'
import store from './store/index'
import common from "./common";
import 'virtual:svg-icons-register'


app.config.globalProperties.common=common
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
