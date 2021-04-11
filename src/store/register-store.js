import qs from "qs"
import Vue from 'vue'

const state = {
  isRegister:false,
  user: {
    username: ''
  }
}

export default {
  state,
  mutations: {
    register(state,payload) {
      state.isLogin = true
      state.user.username = payload.username
    }
  },
  actions: {
    register: function (context, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post('/api/regist', qs.stringify(payload))
            .then(function (response) {
              let result = response.data;
              if (result.code === 200) {
                resolve(response)
                context.commit("register", payload)
              } else {
                reject(response)
              }
            })
            .catch(function (error) {
              let errorDate = {
                message: '外星人把我们的服务器带走啦，请稍后再试哦！'
              }
              reject(errorDate)
            });
      })
    }
}
}