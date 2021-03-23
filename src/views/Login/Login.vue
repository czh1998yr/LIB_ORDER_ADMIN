<template>
  <div id="login">
  <login-box></login-box>
  </div>
</template>

<script>
import LoginBox from "@/views/Login/ChildComps/LoginBox";
export default {
  name: "Login",
  components: {
    LoginBox,
  }
}
</script>

<style scoped>
  #login{
    background-image: url("~assets/img/login.jpg");
    background-repeat: no-repeat;
    height: 100%;
    background-size: 100% 100%;
  }
</style>