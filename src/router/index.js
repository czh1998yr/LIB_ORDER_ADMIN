import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/views/Login/ChildComps/Login')
const Register = () => import('@/views/Login/ChildComps/Register')
const Home = () => import('@/views/Home/Home')

const Welcome = () => import('@/views/Home/ChildComps/Welcome')
const AboutMe = () => import('@/views/Home/ChildComps/AboutMe')
const Course = () => import('@/views/Home/ChildComps/Course')
const Order = () => import('@/views/Home/ChildComps/Order/Order')
const MyOrder = () => import('@/views/Home/ChildComps/MyOrder')

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
      path:'/register',
      component: Register,
      meta: {
        isLogin: false
      }
    },
    {
      path:'/home',
      component: Home,
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
    }
  ],

})

//挂载路由导航守卫
// router.beforeEach(((to, from, next) => {
// //  to,将要访问的路径、from:从哪里跳转出来、next:是一个函数，表示放行
//   if(to.path === '/login' || to.path === '/register') return next();
//   {
//   //获取token
//     const tokenStr = window.sessionStorage.getItem('token')
//     if(!tokenStr)return next ('/login')
//           next()
//   }
// }
// ))

export default router;