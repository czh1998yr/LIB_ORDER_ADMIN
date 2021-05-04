<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin_home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统功能</el-breadcrumb-item>
      <el-breadcrumb-item>用户申请管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区-->
    <el-card class="card">
<!--      搜索区域-->
      <el-button @click="ByName()" type="success" plain>点击筛选未处理事项</el-button>
      <el-button @click="ByState()" type="success" plain>点击筛选已处理事项</el-button>
      <el-button @click="getOrdersList()" type="success" plain>点击展示全部事项</el-button>
      <!--      用户列表去-->
      <el-table :data="orderslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="申请人" prop="username" width="65px"></el-table-column>
        <el-table-column label="实验室名称" prop="labname" width="200px"></el-table-column>
        <el-table-column label="实验室编号" prop="labnum" width="100px"></el-table-column>
        <el-table-column label="实验室使用日期" prop="date" width="120px"></el-table-column>
        <el-table-column label="周次" prop="week" width="50px"></el-table-column>
        <el-table-column label="星期" prop="day" width="50px"></el-table-column>
        <el-table-column label="节次" prop="session"></el-table-column>
        <el-table-column label="申请时间" prop="createTime" width="170px"></el-table-column>
        <el-table-column label="进度" width="65px">
          <template slot-scope="scope" >
            <span v-if="scope.row.state === '未处理'" style="color: red;font-weight: bold">未处理</span>
            <span v-else>已处理</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="65px">
          <el-link type="success" href="/labstate">去处理</el-link>
        </el-table-column>
        <el-table-column label="确认处理" width="120px">
          <template slot-scope="scope">
          <el-button type="success" round size="mini" @click="upstate(scope.row.id)">确认完成</el-button>
          </template>
        </el-table-column>
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
        state:''
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
      self.axios.post('/handle', qs.stringify({current:self.queryinfo.current,size:self.queryinfo.size,state:self.queryinfo.state}))
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
    ByName() {
      self = this
      self.axios.post("handle",qs.stringify({current:self.queryinfo.current,size:self.queryinfo.size,state:'未处理'}))
      .then( res => {
        self.orderslist = res.data.records
        self.queryinfo.total = res.data.total
      })
      .catch(err => {
        self.$message.error("查询失败，请稍后重试！")
      })
    },
    ByState() {
     self = this
     self.axios.post("handle",qs.stringify({current:self.queryinfo.current,size:self.queryinfo.size,state:'已处理'}))
      .then( res => {
        self.orderslist = res.data.records
        self.queryinfo.total = res.data.total
      })
      .catch(err => {
        self.$message.error("查询失败，请稍后重试！")
      })
    },
    upstate(id) {
      self = this
      self.axios.post("upstate",qs.stringify({id:id}))
      .then(res => {
        this.$confirm('请在确定已经完成用户需求后点击确定, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass:'sumbit',
        }).then(() => {
          self.getOrdersList()
          self.$message.success('处理成功！')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      })
      .catch(err => {
        self.$message.error('外星人把我们的服务器带走啦！请稍后再试！')
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