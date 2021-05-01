<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import  jwt  from  'jsonwebtoken'
export default {
  name: 'App',
  created(){   /*在根组件进行判断，否则刷新就没了*/
    this.initData()
  },
  methods: {
    // 有token时初始化数据
    initData(){
      if (sessionStorage.getItem("token")){
        let str = jwt.decode(sessionStorage.getItem("token"))
        const user = str.username;
        /*存储至vuex*/
        this.$store.dispatch('setUser',user)
      }
    }
  }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
