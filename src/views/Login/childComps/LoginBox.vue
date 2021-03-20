<template>
  <div class="login-box">
    <div class="title">实验室管理系统</div>
    <div class="username"><input type="text" name="username" class="uname" placeholder="请在这里输入用户名"></div>
    <div class="password"><input type="text" name="password" class="pwd" placeholder="请在这里输入密码"></div>
    <div class="yes"><button>登录</button></div>
    <div class="tips">推荐使用Chrome内核、Firefox浏览器访问系统</div>
  </div>
</template>

<script>
export default {
  name: "LoginBox"
}
</script>

<style scoped>
  .login-box{
    background-color: rgba(255,255,255,.8);

    position: fixed;
    top: 30%;
    bottom: 30%;
    left: 38%;
    right: 38%;

    border-radius: 5px;
  }
  .title,.username,.password,.yes,.tips{
    position: absolute;
    text-align: center;
    width: 100%;
    padding-top: 20px;
  }
  .title{
    top: 0%;
    bottom: 80%;
    font-size: 35px;
    font-weight: bold;
    box-sizing: border-box;
  }
  .username{
    top: 20%;
    bottom: 60%;
  }
  .password{
    top: 40%;
    bottom: 40%;
  }
  .yes{
    top: 60%;
    bottom: 20%;
  }
  .tips{
    top: 80%;
    bottom: 0%;

    color: #AAA;
    font-size: 13px;
  }
  input{
    height: 30px;
    border: 0;
    border-radius: 5px;
    width: 50%;
    padding-left: 25px;
    box-sizing: border-box;
  }
  button{
    background-color: var(--color-tint);
    width: 50%;
    height: 40px;
    border: 0;

    color: #fff;
    font-size: 15px;
  }
  .uname{
    background: url("~assets/img/用户.png") no-repeat left;
    background-color: #f2f2fa;
  }
  .pwd{
    background: url("~assets/img/密码.png") no-repeat left;
    background-color: #f2f2fa;
  }
</style>