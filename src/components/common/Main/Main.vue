<template>
  <div id="main">
  <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "Main",
  components:{
  }
}
</script>

<style scoped>
  #main{
    /*background-color: #fff;*/

    float: right;
    position: absolute;
    right: 0px;
    left: 230px;
    bottom: 0px;
    top: 100px;
  }
</style>