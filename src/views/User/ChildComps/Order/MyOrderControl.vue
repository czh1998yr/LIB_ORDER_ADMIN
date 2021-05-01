<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统功能</el-breadcrumb-item>
      <el-breadcrumb-item>我的预约</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区-->
    <el-card class="card">
      <!--        标题区-->
      <div class="title">
        个人历史预约记录
        <el-divider><i class="el-icon-position"></i></el-divider>
      </div>
      <!--      用户列表去-->
      <el-table :data="orderslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="预约人" width="65px">{{username}}</el-table-column>
        <el-table-column label="实验室名称" prop="labname" width="120px"></el-table-column>
        <el-table-column label="实验室编号" prop="labnum" width="95px"></el-table-column>
        <el-table-column label="实验室使用时间" prop="date" width="125px"></el-table-column>
        <el-table-column label="周次" prop="week" width="65px"></el-table-column>
        <el-table-column label="星期" prop="day" width="65px"></el-table-column>
        <el-table-column label="预约情况" prop="createTime">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.u1 === username" class="tab">第1节</el-tag>

            <el-tag type="success" v-if="scope.row.u2 === username" class="tab">第2节</el-tag>

            <el-tag type="success" v-if="scope.row.u3 === username" class="tab">第3节</el-tag>

            <el-tag type="success" v-if="scope.row.u4 === username" class="tab">第4节</el-tag>

            <el-tag type="success" v-if="scope.row.u5 === username" class="tab">第5节</el-tag>

            <el-tag type="success" v-if="scope.row.u6 === username" class="tab">第6节</el-tag>

            <el-tag type="success" v-if="scope.row.u7 === username" class="tab">第7节</el-tag>

            <el-tag type="success" v-if="scope.row.u8 === username" class="tab">第8节</el-tag>

            <el-tag type="success" v-if="scope.row.u9 === username" class="tab">第9节</el-tag>

            <el-tag type="success" v-if="scope.row.u10 === username" class="tab">第10节</el-tag>

            <el-tag type="success" v-if="scope.row.u11 === username" class="tab">第11节</el-tag>

            <el-tag type="success" v-if="scope.row.u12 === username" class="tab">第12节</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!--        分页区域-->
      <el-pagination
          :current-page="queryinfo.current"
          :page-size="queryinfo.size"
          :page-sizes="[10, 15, 20, 25]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "MyOrderControl",
  computed: {
    username() {
      return this.$store.getters.getUser
    }
  },
  data() {
    return {
      editDialogVisible: false,
      queryinfo: {
        current: 1,
        size: 10
      },
      orderslist: [],
      total: 0,
      editForm: {},
      starttime:[]
    }
  },
  created() {
    this.getOrdersList()
  }
  ,
  methods: {
    orderDialogClosed() {this.$refs.OrderFrom.resetFields()},
    getOrdersList() {
      let self = this
      self.axios.post('/myorders', qs.stringify({current:self.queryinfo.current,size:self.queryinfo.size,username:self.username}))
          .then(function (res) {
            console.log(res);
            console.log('这里');
            self.orderslist = res.data.records
            self.total = res.data.total
          })
          .catch(function (error) {
            self.$message.error('请求失败')
          });
    },
    handleSizeChange(newSize) {
      this.queryinfo.size = newSize
      this.getOrdersList()
    },
    handleCurrentChange(newPage) {
      this.queryinfo.current = newPage
      this.getOrdersList()
    }
  }
}
</script>

<style scoped>
.card label{
  padding: 0 8px 0 8px;
}
.title{
  text-align: center;
  padding: 0 5px 15px 5px;
  font-weight: bold;
  font-size: 25px;
}
.tab{
  margin: 0 8px 0 0 !important;
}
</style>