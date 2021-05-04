<template>
  <home>

<!--    头部内容-->
    <div class="title" slot="left">
      欢迎来到管理员后台系统
    </div>
    <div class="right" slot="right">
      <span class="nowdate">{{dateFormat(date)}}</span>
      <el-dropdown class="user">
      <span class="el-dropdown-link">
        <i class="el-icon-user-solid"></i>
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
<!--      侧边栏内容--><!--    主体内容-->
    <div class="main" slot="main">
      <router-view></router-view>
    </div>
    <div class="aside" slot="aside">
      <el-menu :default-openeds="['1', '2']">
        <el-submenu index="1" >
          <template slot="title"><i class="el-icon-s-custom"></i>首页</template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><router-link to="/admin_home">我的桌面</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>系统功能</template>
          <el-menu-item-group>
            <el-menu-item index="2-1">
              <router-link to="/usercontrol">用户管理</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/labcontrol">实验室管理</router-link>
            </el-menu-item>
            <el-menu-item index="2-3">
              <router-link to="/labstate">实验室状态管理</router-link>
            </el-menu-item>
            <el-menu-item index="2-4">
              <router-link to="/userorders">用户预约管理</router-link>
            </el-menu-item>
            <el-menu-item index="2-5">
              <router-link to="/cancelorder">用户申请管理</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>

  </home>
</template>

<script>
import Home from "components/common/Home";

export default {
  name: "AdminHome",
  data() {
    return {
      date:new Date()
    }
  },
  components: {
    Home
  },
  computed: {
    username() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.replace('/logout')
    },
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      * */
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }
  },
  mounted() {
    //显示当前日期时间
    let _this = this// 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>

<style scoped>
.title{
  color: #fff;
  font-weight: bold;
  font-size: 25px;
  letter-spacing:2px;
}
.el-dropdown-link /deep/ {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
/*menux中的样式调整*/
a{
  width:100%;
  display: block;
  text-decoration:none;
  color: #333333;
  font-size: 15px;
}
a:hover{
  cursor: pointer;
}
.aside i{
  color: var(--color-tint);
}
.nowdate{
  padding: 0 20px 0 0px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
</style>