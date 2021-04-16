import qs from "qs"
import Vue from 'vue'


export default {
  actions: {
    register: function (context, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post('/regist', qs.stringify(payload))
            .then(function (response) {
              let result = response.data;
              if (result.code === 200) {
                resolve(response)
              } else {
                reject(response)
              }
            })
            .catch(function (error) {
              alert('外星人把我们的服务器带走啦，请稍后再试哦！')
              reject(errorDate)
            });
      })
    }
}
}