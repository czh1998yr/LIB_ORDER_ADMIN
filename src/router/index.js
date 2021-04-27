import Vue from 'vue'
import Router from 'vue-router'

//普通用户登录界面
// const Welcome = () => import('@/views/User/ChildComps/Welcome')
import Welcome from "../views/User/ChildComps/Welcome";
const Login = () => import('@/views/User/Login/ChildComps/Login')
const Username = () => import('views/User/UserHome')
const Course = () => import('@/views/User/ChildComps/Course')
const OrderControl = () => import('views/User/ChildComps/Order/OrderControl')
const MyOrderControl = () => import('views/User/ChildComps/Order/MyOrderControl')
//管理员登录界面
const AdminLogin = () => import('@/views/Admin/Login/ChildComps/AdminLogin')
const AdminHome = () => import('@/views/Admin/AdminHome')
const AdminWelcome = () => import('@/views/Admin/ChildComps/AdminWelcome')
const UserControl = () => import('@/views/Admin/ChildComps/UserControl')
const LabControl = () => import('views/Admin/ChildComps/LabControl')
const LabStateControl = () => import('views/Admin/ChildComps/LabStateControl')





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
    {
      path:'/logout',
      component:Login,
      meta: {
        isLogin: false
      }
    },
      //普通用户
    {
      path:'/home',
      component: Username,
      meta: {
        isLogin: false
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
          path:'course',
          component: Course
        },
        {
          path:'order',
          component: OrderControl
        },
        {
          path:'myorder',
          component: MyOrderControl
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
        },
        {
          path:'/labstate',
          component: LabStateControl
        }
      ]
    }
  ],
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  let tokenStr = window.sessionStorage.getItem('token')
//  to,将要访问的路径、from:从哪里跳转出来、next:是一个函数，表示放行
  if(to.path === '/logout') {window.sessionStorage.clear();next({path: '/login'})}
  if(to.path === '/login' || to.path === '/admin_login' ){
    if(tokenStr === null) {
      next();
    }else{
      next({path: '/home'})
    }
  }else if(tokenStr === null) return next({path:'/login'})
  next();
})

/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = router.history.pending.fullPath;
//   if (isChunkLoadFailed) {
//     router.replace(targetPath);
//   }
// });


export default router;