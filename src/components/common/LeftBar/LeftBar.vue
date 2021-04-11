<template>
  <div id="left-bar">
    <div class="title">
      <i class="fa fa-home"></i>
      功能区
    </div>

    <div class="fn">
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
  </div>
</template>
<script>

export default {
  name: "LeftBar",
  data() {
    return {
    }
  },
  methods: {
    show(e) {
      this.toggle.toggle(e)
    },
  }
}
</script>

<style scoped>
#left-bar{
  width: 220px;
  background-color: #fff;
  border-right: 1px solid #e1e1e1;

  float: left;
  position: absolute;
  left: 0;
  bottom: 0px;
  top: 100px;
}
/*title的样式调整*/
.title{
  height: 48px;
  line-height: 48px;
  background-color: rgba(245,245,245,.8);
  border-bottom: 1px solid #e1e1e1;

  font-size: 18px;
  color: #333;
  font-weight: bold;
  text-align: center;
}
i{
   color: var(--color-tint);
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
.fn ul{
  padding: 0px;
}
.fn li{
  padding: 0px !important;
}

</style>