/**
 * axios请求配置
 */
import axios from 'axios'
import { Loading } from 'element-ui';   /*elementUI的loading*/
import router from "../router";


let loading;
function startLoading () {
  loading = Loading.service({    /*在需要调用时：*/
    spinner:"el-icon-loading",
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,0,7)'
  });
}

function endLoading () {
  loading.close();
}

//请求拦截
axios.interceptors.request.use(config => {
  //加载动画
  startLoading();
  /*判断token存在   登录拦截*/
  if(sessionStorage.getItem('token')){
    /*设置统一的header*/
    config.headers.Authorization  = sessionStorage.getItem('token');
  }
  return config;
},error => {
  return Promise.reject(error);
});

//响应拦截
axios.interceptors.response.use(Response => {
  //结束加载动画
  endLoading();
  const status = Response.data.code
  if(status == 401 || status == 403) {
    self.$message.error('检测到非法登录，互联网不是法外之地，请走正规途径！！')
    /*清楚token*/
    sessionStorage.removeItem('token');
    /*跳转登录*/
    router.push('/401')
  }
  if(status == 402){
    self.$message.error('登录超时啦，请重新登陆吧！')
    /*清楚token*/
    sessionStorage.removeItem('token');
    /*跳转登录*/
    router.push('/')
  }

  return Response;
},error => {
  //错误提醒
  self.$message.error('出错咯！')
  return Promise.reject(error);
})





export default axios;