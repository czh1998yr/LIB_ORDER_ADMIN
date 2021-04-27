<template>
<div>
  <!--    面包屑导航区-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/admin_home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统功能</el-breadcrumb-item>
    <el-breadcrumb-item>我的桌面</el-breadcrumb-item>
  </el-breadcrumb>
  <!--  卡片区-->
<!--  欢迎词卡片区-->
  <el-card shadow="hover">
    <div class="head">
      <h2>欢迎使用实验室后台管理系统!</h2>
      <p>在这里你可以对实验室进行简单的管理，它包括了用户管理，实验室管理。</p>
      <p>选择用户管理，意味着你可以对实验室预约系统的普通用户进行添加、修改以及删除操作。</p>
      <p>选择实验室管理，意味着你可以对实验室的信息进行基本修改，包括添加实验室、修改实验室、删除实验室以及查看实验室的基本信息。</p>
    </div>
  </el-card>
<!--  个人信息卡片区-->
  <div class="message">
  <div class="card">
  <el-card shadow="hover" class="card_message">
    <p>个人信息 <i class="el-icon-user-solid"></i> </p>
    <el-divider></el-divider>
    <div class="head_portrait">
      <div class="left">
        <img src="~assets/img/head_portrait.png" alt="">
      </div>
      <div class="center">
        <h2>{{ username }}</h2>
        <el-divider><i class="el-icon-s-custom"></i>超级管理员</el-divider>
        <p>命里有时终须有，命里无时莫强求</p>
      </div>
      <div class="right"></div>
    </div>
  </el-card>
  <el-card shadow="hover" class="card_message">
    <p>待办事项<i class="el-icon-document-copy"></i></p>
    <el-divider></el-divider>
    <div class="head_portrait">
      <div class="left">
      </div>
      <div class="center">
        <el-table>
          <el-table-column
              width="180">
          </el-table-column>
          <el-table-column
              width="180">
          </el-table-column>
        </el-table>
        <el-button type="success" style="margin-top: 15px">添加待办事项</el-button>
      </div>
      <div class="right"></div>
    </div>
  </el-card>
  </div>
<!--    无-->
    <div class="message_center"></div>
<!--  日历区-->
  <div class="calendar">
    <el-calendar>
    </el-calendar>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: "AdminWelcome",
  computed: {
    username() {
      return this.$store.getters.getUser
    }
  },
}
</script>

<style scoped>

.head h2 {
  font-size: 35px;
  line-height: 50px;
}
.head p{
  color: darkgrey;
  line-height: 30px;
}
.card_message{
  margin-top: 5px
}
.card_message p{
  font-weight: bold;
}
.head_portrait{
  display: flex;
  text-align: center;
}
.left,.right{
  width: 30%;
}
.center{
  flex: 1;
}
.head_portrait img{
  width: 120px;
  height: 120px;
  border-radius:50%;
}
.message{
  display: flex;
}
.card{
  width: 49.5%;
}
.calendar{
  width: 49.5%;
  height: 1px;
  margin-top: 5px;
}
.message_center{
  flex: 1;
}
</style>