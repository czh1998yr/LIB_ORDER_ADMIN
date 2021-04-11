import Vue from 'vue'
import Vuex from "vuex"
import loginStore from "./login-store"
import register from "./register-store"

Vue.use(Vuex)



const store = new Vuex.Store({
modules:{
  loginStore,
  register,
}
})

export default store