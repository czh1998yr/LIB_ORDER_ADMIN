import qs from "qs"
import Vue from 'vue'

const state={
  user: {
    username: '',
    // Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  }
}

export default {
  state,
  mutations: {
    updataUser(state, payload) {
      state.user = payload.username
      // state.Authorization = payload.Authorization;
      // localStorage.setItem('Authorization', payload.Authorization);
    },
  },
  actions: {
    login: function (context, payload) {
      let self = this;
      return new Promise((resolve, reject) => {
        Vue.axios.post('/login', qs.stringify(payload))
            .then(function (response) {
              let result = response.data;
              if (result.code === 200) {
                resolve(response)
                context.commit("updataUser", payload)
              } else {
                reject(response)
              }
            })
            .catch(error => {
              alert('外星人把我们的服务器带走啦，请稍后再试哦！')
              reject(errorDate)
            });
      })
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
}