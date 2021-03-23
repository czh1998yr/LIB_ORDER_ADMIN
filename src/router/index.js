import Vue from 'vue'
import Router from 'vue-router'

// import * as path from "path";

const Login = () => import('@/views/Login/Login')
const Home = () => import('@/views/Home/Home')

const AboutMe = () => import('@/views/Home/ChildComps/AboutMe')
const MyQuery = () => import('@/views/Home/ChildComps/MyQuery')
const Course = () => import('@/views/Home/ChildComps/Course')
const Order = () => import('@/views/Home/ChildComps/Order')
const MyOrder = () => import('@/views/Home/ChildComps/MyOrder')

Vue.use(Router)

export default new Router({
  mode:'history',
  routes:[
    {
      path:'',
      redirect:'/login',
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
      component: Home,
      children: [
        {
          path:'',
          redirect:'aboutme'
        },
        {
          path:'aboutme',
          component: AboutMe
        },
        {
          path:'query',
          component: MyQuery
        },
        {
          path:'course',
          component: Course
        },
        {
          path:'order',
          component: Order
        },
        {
          path:'myorder',
          component: MyOrder
        },
      ]
    }
  ]
})