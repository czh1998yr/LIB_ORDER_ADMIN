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
        <el-table-column label="预约人" prop="username"></el-table-column>
        <el-table-column label="实验室名称" prop="labname"></el-table-column>
        <el-table-column label="实验室编号" prop="labnum"></el-table-column>
        <el-table-column label="实验室使用时间" prop="date"></el-table-column>
        <el-table-column align="center" label="操作" width="150px">
          <template slot-scope="scope">
          <el-tooltip :enterable="false" content="删除该条记录" effect="dark" placement="top">
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="delbyid(scope.row.id)"></el-button>
          </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--        分页区域-->
      <el-pagination
          :current-page="current"
          :page-size="size"
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
      current: 1,
      size: 10,
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
      self.axios.post('/myorders', qs.stringify({current:self.current,size:self.size,username:self.username}))
          .then(function (res) {
            console.log(res);
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
    },
    delbyid(id) {
      let self = this
      self.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.axios.post('/delmyordersbyid',qs.stringify({id:id}))
            .then(res => {
              this.getOrdersList()
              self.$message.success("删除成功！")
            })
            .catch(err => {
              self.$message.success("删除失败，请稍后重试！")
            })
      }).catch(() => {
        self.$message({
          type: 'info',
          message: '已取消预约'
        });
      });
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
</style>