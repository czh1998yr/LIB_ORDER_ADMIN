import Vue from 'vue'
import Router from 'vue-router'
import {Message} from 'element-ui'

//普通用户登录界面
import Login from "../views/User/Login/ChildComps/Login";
import Welcome from "../views/User/ChildComps/Welcome";
import UserHome from "../views/User/UserHome";
import OrderControl from "../views/User/ChildComps/Order/OrderControl";
import MyOrderControl from "../views/User/ChildComps/Order/MyOrderControl";
// const UserHome = () => import('views/User/UserHome')
// const OrderControl = () => import('views/User/ChildComps/Order/OrderControl')
// const MyOrderControl = () => import('views/User/ChildComps/Order/MyOrderControl')
//管理员登录界面
import AdminLogin from "../views/Admin/Login/ChildComps/AdminLogin";
import AdminWelcome from "../views/Admin/ChildComps/AdminWelcome";
import AdminHome from "../views/Admin/AdminHome";
import UserControl from "../views/Admin/ChildComps/UserControl";
import LabControl from "../views/Admin/ChildComps/LabControl";
import LabStateControl from "../views/Admin/ChildComps/LabStateControl";
import UserOrderControl from "../views/Admin/ChildComps/UserOrderControl";
// const AdminHome = () => import('@/views/Admin/AdminHome')
// const UserControl = () => import('@/views/Admin/ChildComps/UserControl')
// const LabControl = () => import('views/Admin/ChildComps/LabControl')
// const LabStateControl = () => import('views/Admin/ChildComps/LabStateControl')
// const UserOrderControl = () => import('views/Admin/ChildComps/UserOrderControl')

//警告页面
import fof from '../components/common/404'
import foo from '../components/common/401'





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
      path:'/404',
      component:fof
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      path:'/401',
      component:foo
    },
    {
      path:'/login',
      component: Login,
    },
    {
      path:'/admin_login',
      component: AdminLogin,
    },
    {
      path:'/logout',
      component:Login,
    },
      //普通用户
    {
      path:'/home',
      component: UserHome,
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
        },
        {
          path: '/userorders',
          component: UserOrderControl
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
  if(to.path === '/login' || to.path === '/admin_login' || to.path === '/404' || to.path === '/401' || to.path === '/logout'){
    if(tokenStr === null) {
      next();
    }else {
        next({path: '/home'})
      }
  }else{
    if (tokenStr === null) {
      Message.error('对不起，请先登录后再尝试访问页面！')
      return  next({path:'/login'})
    } else {
        next();
    }
  }
  next();
})

// 解决重复点击报错
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}



export default router;