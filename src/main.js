import Vue from 'vue'
import App from './App.vue'
import router from "./router";


//font-awesome
import 'font-awesome/css/font-awesome.css'
//导入折叠的JS
import toggle from "@/common/toggle";

Vue.config.productionTip = false
Vue.prototype.toggle = toggle

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
