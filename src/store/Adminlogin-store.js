import qs from "qs"
import Vue from 'vue'

export default {
  actions: {
    adminlogin: function (context, payload) {
      let self = this;
      return new Promise((resolve, reject) => {
        Vue.axios.post('/login/admin', qs.stringify(payload))
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
}