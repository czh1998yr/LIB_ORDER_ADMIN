import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/views/Login/Login')
import Home from "@/views/Home/Home";

Vue.use(Router)

export default new Router({
  mode:'history',
  routes:[
    {
      path:'',
      redirect:'/home',
      meta: {
        title:'欢迎使用实验室管理系统'
      }
    },
    {
      path:'/login',
      component: Login,
    },
    {
      path:'/home',
      component: Home
    }
  ]
})