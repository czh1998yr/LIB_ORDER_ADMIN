import Vue from 'vue'
import Vuex from "vuex"
import register from "./register-store"
import adminLogin from "./Adminlogin-store"
import UserInfo from "./UserInfo";

Vue.use(Vuex)



const store = new Vuex.Store({
modules:{
  register,
  adminLogin,
  UserInfo
}
})

export default store