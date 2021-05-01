<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin_home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统功能</el-breadcrumb-item>
      <el-breadcrumb-item>用户预约管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区-->
    <el-card class="card">
<!--      搜索区域-->
      <el-row :gutter="20">
      <el-col :span="7">
        <el-input clearable placeholder="请按用户名搜索预约记录" v-model="userinfo.name" @clear='getOrdersList()'>
          <el-button slot="append" icon="el-icon-search" @click="ByName()"></el-button>
        </el-input>
      </el-col>
      </el-row>
      <el-divider></el-divider>
      <!--      用户列表去-->
      <el-table :data="orderslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="实验室名称" prop="labname" width="200px"></el-table-column>
        <el-table-column label="实验室编号" prop="labnum" width="150px"></el-table-column>
        <el-table-column label="所属专业" prop="major"></el-table-column>
        <el-table-column label="日期" prop="date" width="150px"></el-table-column>
        <el-table-column label="周次" prop="week" width="50px"></el-table-column>
        <el-table-column label="星期" prop="day" width="50px"></el-table-column>
        <el-table-column label="第1节" prop="u1" width="70px"></el-table-column>
        <el-table-column label="第2节" prop="u2" width="70px"></el-table-column>
        <el-table-column label="第3节" prop="u3" width="70px"></el-table-column>
        <el-table-column label="第4节" prop="u4" width="70px"></el-table-column>
        <el-table-column label="第5节" prop="u5" width="70px"></el-table-column>
        <el-table-column label="第6节" prop="u6" width="70px"></el-table-column>
        <el-table-column label="第7节" prop="u7" width="70px"></el-table-column>
        <el-table-column label="第8节" prop="u8" width="70px"></el-table-column>
        <el-table-column label="第9节" prop="u9" width="70px"></el-table-column>
        <el-table-column label="第10节" prop="u10" width="70px"></el-table-column>
        <el-table-column label="第11节" prop="u11" width="70px"></el-table-column>
        <el-table-column label="第12节" prop="u12" width="70px"></el-table-column>
      </el-table>
      <!--        分页区域-->
      <el-pagination
          :current-page="queryinfo.current"
          :page-size="queryinfo.size"
          :page-sizes="[10, 15, 20, 25]"
          :total="queryinfo.total"
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
  name: "UserOrderControl",
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
        size: 10,
        total: 0,
      },
      orderslist: [],
      editForm: {},
      userinfo: {
        name:''
      }
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
      self.axios.post('/userorders', qs.stringify({current:self.queryinfo.current,size:self.queryinfo.size}))
          .then(function (res) {
            self.orderslist = res.data.records
            self.queryinfo.total = res.data.total
            console.log(res);
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
        confirmButtonClass:'sumbit',
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
    },
    ByName() {
      self = this
      self.axios.post("nameorders",qs.stringify({current:self.queryinfo.current,size:self.queryinfo.size,username:self.userinfo.name}))
      .then( res => {
        self.orderslist = res.data.records
        self.queryinfo.total = res.data.total
      })
      .catch(err => {
        self.$message.error("查询失败，请稍后重试！")
      })
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