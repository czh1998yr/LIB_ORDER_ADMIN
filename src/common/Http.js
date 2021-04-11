import axios from 'axios'
import {getCookie} from "@/common/Cookie";

//axios配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = "http://localhost:8080/Source_war_exploded/";

//http request 拦截器，将cookie传到后台
axios.interceptors.request.use(config => {
  const token = getCookie('session'); //获取cookie
  config.data = JSON.stringify(config.data);
  config.headers = {
    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8' //设置跨域头部
  };
  if(token) {
    config.params = {'token':token} //后台接收的参数
  }
  return config;
},
  err => {
  return Promise.reject(err);
  }
)

// Http response 拦截器
axios.interceptors.response.use(response => {
  if(response.data.errCode == 2) {
    this.$router.push({
      path: '/login',
      query: {rediert: this.$router.currentRoute.fullPath}
    })
  }
  return response;
},
    error => {
  return Promise.reject(error.response.data)
    });

export default axios;