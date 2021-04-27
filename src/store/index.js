import Vue from 'vue'
import Vuex from "vuex"
import loginStore from "./login-store"
import register from "./register-store"
import adminLogin from "./Adminlogin-store"

Vue.use(Vuex)



const store = new Vuex.Store({
modules:{
  loginStore,
  register,
  adminLogin,
}
})

export default store