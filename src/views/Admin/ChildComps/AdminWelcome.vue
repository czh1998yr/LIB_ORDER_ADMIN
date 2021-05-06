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
            <h2>欢迎使用实验室后台管理系统!</h2>
            <p>在这里你可以对实验室进行简单的管理，它包括了用户管理，实验室管理。</p>
            <p>选择用户管理，意味着你可以对实验室预约系统的普通用户进行添加、修改以及删除操作。</p>
            <p>选择实验室管理，意味着你可以对实验室的信息进行基本修改，包括添加实验室、修改实验室、删除实验室以及查看实验室的基本信息。</p>
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
              <el-table :data="orderslist" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="申请人"   prop="username"></el-table-column>
                <el-table-column label="申请时间" prop="createTime"></el-table-column>
                <el-table-column label="处理进度">
                  <template slot-scope="scope" >
                    <span v-if="scope.row.state === '未处理'" style="color: red;font-weight: bold">未处理</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <el-button type="success" size="mini" @click="tocancel()">查看详情</el-button>
                </el-table-column>
              </el-table>
          <!--        分页区域-->
          <el-pagination
              :current-page="queryinfo.current"
              :page-size="queryinfo.size"
              :total="queryinfo.total"
              layout="total,prev, pager, next, jumper"
              @current-change="handleCurrentChange">
          </el-pagination>
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
import qs from "qs";
export default {
  name: "AdminWelcome",
  created() {
    this.noHandle()
  },
  data() {
    return {
      orderslist:[],
      queryinfo: {
        current: 1,
        size: 2,
        total: 0,
        state:''
      },
    }
  },
  components: {
    SchoolCalendar
  },
  computed: {
    username() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    noHandle() {
      this.axios.post("handle",qs.stringify({current:this.queryinfo.current,size:this.queryinfo.size,state:'未处理'}))
          .then( res => {
            this.orderslist = res.data.records
            this.queryinfo.total = res.data.total
          })
          .catch(err => {
            console.log(err);
            this.$message.error("查询失败，请稍后重试！")
          })
    },
    handleCurrentChange(newPage) {
      this.queryinfo.current = newPage
      this.noHandle()
    },
    tocancel() {
      this.$router.replace('/cancelorder')
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