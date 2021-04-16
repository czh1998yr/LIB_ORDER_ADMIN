<template>
  <home>
    <!--    头部内容-->
    <div class="title" slot="left">
      欢迎使用实验室预约系统
    </div>
    <div class="right" slot="right">
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
    <!--      侧边栏内容-->
    <div class="aside" slot="aside">
      <el-menu :default-openeds="['1', '2']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-s-custom"></i>首页</template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><router-link to="/home/welcome">欢迎页</router-link></el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="/home/aboutme">我的信息</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>系统功能</template>
          <el-menu-item-group>
            <el-menu-item index="2-1">
              <router-link to="/home/course">课程表信息</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/home/order">实验室预约</router-link>
            </el-menu-item>
            <el-menu-item index="2-3  ">
              <router-link to="/home/myorder">我的预约</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <!--    主体内容-->
    <div class="main" slot="main">
      <router-view></router-view>
    </div>
  </home>
</template>

<script>
import Home from "components/common/Home";
export default {
  name: "UserHome",
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
  padding-left: 40px;
}

a:hover{
  cursor: pointer;
}
.aside ul{
  padding: 0px;
}
.aside li{
  padding: 0px !important;
}
i{
  color: var(--color-tint);
}
</style>