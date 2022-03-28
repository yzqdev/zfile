import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/font-icon/iconfont";
import './assets/common.scss'
import MdEditorV3 from 'md-editor-v3'
import 'md-editor-v3/lib/style.css';
const app = createApp(App);

import router from "./router";
import store from "./store/index";
import common from "./common";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "virtual:svg-icons-register";
// @ts-ignore
import contextmenu from "v-contextmenu";
import http from "./utils/http";
console.log('http://localhost:9100/#/home/1?path=/Camera')
app.config.globalProperties.common = common;
app.config.globalProperties.$http = http;
//@ts-ignore
app.use(MdEditorV3)
app.use(router);
app.use(store);
app.use(contextmenu);
app.use(ElementPlus ,{size:'default',locale:zhCn} );
app.mount("#app");
