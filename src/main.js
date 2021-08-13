/*
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-10 16:55:38
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-12 15:55:09
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入jQuery、bootstrap
import 'bootstrap'

// 引入bootstrap样式
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// 新增代码：引入全部组件及样式
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// 新增代码：注册全部组件

// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'

import axios from 'axios'

// v-viewer 图片插件
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import Video from "video.js";
import "video.js/dist/video-js.css";

// 全局挂载axios
const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$video = Video;

app.use(VueViewer)
app.use(store).use(router).use(ElementPlus).use(dataV).mount("#app");


