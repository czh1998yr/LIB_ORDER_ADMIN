import Vue from 'vue'
import Router from 'vue-router'

//普通用户登录界面
const Login = () => import('@/views/User/Login/ChildComps/Login')
const Username = () => import('views/User/UserHome')
const Welcome = () => import('@/views/User/ChildComps/Welcome')
const AboutMe = () => import('@/views/User/ChildComps/AboutMe')
const Course = () => import('@/views/User/ChildComps/Course')
const Order = () => import('@/views/User/ChildComps/Order/Order')
const MyOrder = () => import('@/views/User/ChildComps/MyOrder')
//管理员登录界面
const AdminLogin = () => import('@/views/Admin/Login/ChildComps/AdminLogin')
const AdminHome = () => import('@/views/Admin/AdminHome')
const AdminWelcome = () => import('@/views/Admin/ChildComps/AdminWelcome')
const UserControl = () => import('@/views/Admin/ChildComps/UserControl')
const LabControl = () => import('@/views/Admin/ChildComps/LabControl')





Vue.use(Router)

const router = new Router({
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
      meta: {
        isLogin: false
      }
    },
    {
      path:'/admin_login',
      component: AdminLogin,
      meta: {
        isLogin: false
      }
    },
      //普通用户
    {
      path:'/home',
      component: Username,
      meta: {
        isLogin: true
      },
      children: [
        {
          path:'',
          redirect:'welcome'
        },
        {
          path:"welcome",
          component:Welcome
        },
        {
          path:'aboutme',
          component: AboutMe
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
    },
    //管理员
    {
      path:'/admin_home',
      component:AdminHome,
      redirect:'admin_welcome',
      children:[
        {
          path: '/admin_welcome',
          component:AdminWelcome
        },
        {
          path:'/usercontrol',
          component:UserControl
        },
        {
          path:'/labcontrol',
          component:LabControl
        }
      ]
    }
  ],
})

// //挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   let tokenStr = window.sessionStorage.getItem('token')
// //  to,将要访问的路径、from:从哪里跳转出来、next:是一个函数，表示放行
//   if(to.path === '/logout') {window.sessionStorage.clear();next({path: '/login'})}
//   if(to.path === '/login' || to.path === '/admin_login' ){
//     if(tokenStr === null) {
//       next();
//     }else{
//       next({path: '/home'})
//     }
//   }else if(tokenStr === null) return next({path:'/login'})
//   next();
// })

export default router;