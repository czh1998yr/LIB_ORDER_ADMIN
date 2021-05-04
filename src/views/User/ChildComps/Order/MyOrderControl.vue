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
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="取消预约" placement="top">
            <el-button type="success" icon="el-icon-edit" size="mini" @click="cancel(scope)"></el-button>
          </el-tooltip>
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
<!--    对话框区域-->
    <el-dialog
        title="确定要申请取消预约吗？"
        :visible.sync="dialogVisible"
        width="50%"
        @close="DialogClosed()">
      <el-form ref="form">
      <el-form-item label="预约人姓名："><el-input v-model="username" :disabled="true" style="width: 80%"/></el-form-item>
      <el-form-item label="实验室名称："><el-input v-model="myorderinfo.labname" :disabled="true" style="width: 80%"/></el-form-item>
      <el-form-item label="实验室编号："><el-input v-model="myorderinfo.labnum" :disabled="true" style="width: 80%"/></el-form-item>
      <el-form-item label="使用的日期："><el-input v-model="myorderinfo.date" :disabled="true" style="width: 80%"/></el-form-item>
      <el-form-item label="使用的周次："><el-input v-model="myorderinfo.week" :disabled="true" style="width: 80%"/></el-form-item>
      <el-form-item label="使用的星期："><el-input v-model="myorderinfo.day" :disabled="true" style="width: 80%"/></el-form-item>
      <el-form-item label="使用的节次：">
        <div class="allsession">
        <div class="session">
          <span v-for="(item,index) in myorder" :key="index">{{item}}</span>
        </div>
        </div>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="DialogClosed()">取 消</el-button>
    <el-button type="success" @click="submit()">确 定</el-button>
  </span>
    </el-dialog>
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
      myorder:{
        s1:"",
        s2:"",
        s3:"",
        s4:"",
        s5:"",
        s6:"",
        s7:"",
        s8:"",
        s9:"",
        s10:"",
        s11:"",
        s12:"",
  },
      session:[],
      dialogVisible:false,
      myorderinfo: {
        labname:'',
        labnum:'',
        date:'',
        week:'',
        day:'',
      },
      editDialogVisible: false,
      queryinfo: {
        current: 1,
        size: 10
      },
      orderslist: [],
      total: 0,
      editForm: {},
    }
  },
  created() {
    this.getOrdersList()
  }
  ,
  methods: {
    DialogClosed() {
      this.myorder={}
      this.session=[]
      this.dialogVisible = false
    },
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
    },
    cancel(scope) {
      if (scope.row.u1 === this.username) {this.myorder.s1 = '第1节'}
      if (scope.row.u2 === this.username) {this.myorder.s2 = '第2节'}
      if (scope.row.u3 === this.username) {this.myorder.s3 = '第3节'}
      if (scope.row.u4 === this.username) {this.myorder.s4 = '第4节'}
      if (scope.row.u5 === this.username) {this.myorder.s5 = '第5节'}
      if (scope.row.u6 === this.username) {this.myorder.s6 = '第6节'}
      if (scope.row.u7 === this.username) {this.myorder.s7 = '第7节'}
      if (scope.row.u8 === this.username) {this.myorder.s8 = '第8节'}
      if (scope.row.u9 === this.username) {this.myorder.s9 = '第9节'}
      if (scope.row.u10 === this.username) {this.myorder.s10 = '第10节'}
      if (scope.row.u11 === this.username) {this.myorder.s11 = '第11节'}
      if (scope.row.u12 === this.username) {this.myorder.s12 = '第12节'}
      if(this.myorder.s1!=''){this.session.push(this.myorder.s1)}
      if(this.myorder.s2!=''){this.session.push(this.myorder.s2)}
      if(this.myorder.s3!=''){this.session.push(this.myorder.s3)}
      if(this.myorder.s4!=''){this.session.push(this.myorder.s4)}
      if(this.myorder.s5!=''){this.session.push(this.myorder.s5)}
      if(this.myorder.s6!=''){this.session.push(this.myorder.s6)}
      if(this.myorder.s7!=''){this.session.push(this.myorder.s7)}
      if(this.myorder.s8!=''){this.session.push(this.myorder.s8)}
      if(this.myorder.s9!=''){this.session.push(this.myorder.s9)}
      if(this.myorder.s10!=''){this.session.push(this.myorder.s10)}
      if(this.myorder.s11!=''){this.session.push(this.myorder.s11)}
      if(this.myorder.s12!=''){this.session.push(this.myorder.s12)}
      this.dialogVisible = true
      this.myorderinfo.labname = scope.row.labname
      this.myorderinfo.labnum = scope.row.labnum
      this.myorderinfo.date = scope.row.date
      this.myorderinfo.week = scope.row.week
      this.myorderinfo.day = scope.row.day
    },
    submit() {
      self = this
      self.dialogVisible = false
      const session = self.session.toString()
      self.axios.post('/cancelapply',qs.stringify({username:self.username,labname:self.myorderinfo.labname,
        labnum:self.myorderinfo.labnum,session:session,date:self.myorderinfo.date,week:self.myorderinfo.week,day:self.myorderinfo.day}))
      .then(res => {
        console.log(res);
        self.myorder={}
        self.session=[]
        self.$message.success('申请成功！')
        location.reload();
      })
      .catch(err => {
        self.$message.error('申请失败！请稍后重试')
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
.tab{
  margin: 0 8px 0 0 !important;
}
.session{
  margin-left: 15px;
}
.session span{
  color: #C0C4CC;
  padding: 0 15px 0 0;
  margin-left: 2px;
}
.allsession{
  margin-left: 95px;
  width: 80%;
  border: 1px solid #E4E7ED;
  background-color: #F5F7FA;
  border-radius:5px;
}
</style>