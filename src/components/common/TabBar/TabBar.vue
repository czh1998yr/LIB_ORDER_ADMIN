<template>
  <div id="tab-bar">
    <div class="logo">
      实验室排课系统
    </div>
    <div class="user">

      <ul>
        <li>
          <i class="fa fa-user point"></i>
          admin
        </li>
        <li>退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
  #tab-bar{

    height: 100px;
    background-color: var(--color-tint);
  }
  .logo{
    height: 100px;
    background: url("~assets/img/logo.png") no-repeat;

    line-height: 100px;
    font-size:  35px;
    color: #fff;
    font-weight: bold;
    padding-left: 80px;

    float: left;
    width: 400px;
  }
  .user{
    float: right;
    margin-left: 20px;
  }
  .user li{
    height: 100px;
    line-height: 100px;
    float: left;
    padding: 0 25px;
    list-style: none;

    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
</style>