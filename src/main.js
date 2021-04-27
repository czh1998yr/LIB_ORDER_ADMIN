import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import ElementUi from "element-ui"
import Axios from "axios"
import VueAxios from "vue-axios"
import store from "./store"
import md5 from "js-md5"
// import VueWechatTitle from 'vue-wechat-title'
import 'font-awesome/css/font-awesome.css'
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUi)
Vue.use(VueAxios,Axios)
Vue.config.productionTip = false
Vue.prototype.$md5 = md5;
// Vue.use(VueWechatTitle)

// Axios.defaults.baseURL = "http://172.21.12.80:8080/api"
Axios.defaults.baseURL = "http://localhost:8080/api/"
// Axios.defaults.headers ['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
let token = window.sessionStorage.getItem('token');

// 添加请求拦截器，在请求头中加token
Axios.interceptors.request.use(config => {
  if (localStorage.getItem('Authorization')) {
    config.headers.Authorization = localStorage.getItem('Authorization');
  }
      return config;
    },
    error => {
      return Promise.reject(error);
    })

Axios.defaults.withCredentials = true //打开跨域请求

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
