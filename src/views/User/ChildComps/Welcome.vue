<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcomehome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统功能</el-breadcrumb-item>
      <el-breadcrumb-item>我的桌面</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片区-->
    <!--  欢迎词卡片区-->

    <!--  个人信息卡片区-->
    <div class="message">
      <div class="card">
            <el-card shadow="hover">
              <div class="head">
                <h2>欢迎使用实验室预约系统!</h2>
                <p>在这里，你可以查看实验室状态，并且预约实验室！</p>
              </div>
            </el-card>
        <el-card shadow="hover" class="card_message">
          <p>个人信息 <i class="el-icon-user-solid"></i> </p>
          <el-divider></el-divider>
          <div class="head_portrait">
            <div class="left">
              <img src="~assets/img/head_portrait.png" alt="">
            </div>
            <div class="center">
              <h2>{{username}}</h2>
              <el-divider><i class="el-icon-s-custom"></i>普通用户</el-divider>
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
        <el-card shadow="hover" style="text-align: center">
          <p style="font-weight: bold">桂林电子科技大学信息科技学院2020-2021学年第二学期教学日历</p>
        <school-calendar></school-calendar>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolCalendar from "../../../components/common/SchoolCalendar";
export default {
  name: "Welcome",
  components: {
    SchoolCalendar
  },
  computed: {
    username() {
      return this.$store.getters.getUser
    }
  }
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
  width: 50%;
}
.message_center{
  flex: 1;
}
</style>