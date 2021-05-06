<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统功能</el-breadcrumb-item>
      <el-breadcrumb-item>用户预约管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区-->
    <el-card class="card">
<!--      搜索区域-->
      <div class="head">
        <div class="left">
        </div>
        <div class="center">
          <el-select v-model="chooseterm"
                     placeholder="请选择学期"
                     @change="chooseTerm($event)">
            <el-option
                v-for="item in term"
                :key="item.title"
                :label="item.title"
                :value="item.state">
            </el-option>
          </el-select>
          <el-divider direction="vertical"></el-divider>
          <span>第</span>
          <el-input-number v-model="chooseWeek1"
                           :max="MaxWeek"
                           :min="1"
                           controls-position="right"
                           label="选择周数">
          </el-input-number>
          <span>周</span>
          ——
          <span>第</span>
          <el-input-number v-model="chooseWeek2"
                           :max="MaxWeek"
                           :min="1"
                           controls-position="right"
                           label="选择周数">
          </el-input-number>
          <span>周</span>
          <el-divider direction="vertical"></el-divider>
          <el-select v-model="labnum" placeholder="请选择实验室编号">
            <el-option v-for="(labnum,index) in lablist" :key="index" :label="labnum.labnum" :value="labnum.labnum">
            </el-option>
          </el-select>
          <el-divider direction="vertical"></el-divider>
          <el-button type="success" @click="checkLab" size="small">查询</el-button>
          <el-button type="success" @click="resting()" size="small">重置</el-button>
          <el-button type="success" @click="toorder()" size="small">去预约</el-button>
        </div>
        <div class="right">
        </div>
      </div>
      <el-divider></el-divider>
      <!--      用户列表去-->
      <el-table :data="orderslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="实验室名称" prop="labname"></el-table-column>
        <el-table-column label="实验室编号" prop="labnum" width="150px"></el-table-column>
        <el-table-column label="日期" prop="date" width="150px"></el-table-column>
        <el-table-column label="周次" prop="week" width="50px"></el-table-column>
        <el-table-column label="星期" prop="day" width="50px"></el-table-column>
        <el-table-column label="第1节" prop="u1" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u1 === username" class="isMe">{{scope.row.u1}}</span>
            <span v-else>{{scope.row.u1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第2节" prop="u2" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u2 === username" class="isMe">{{scope.row.u2}}</span>
            <span v-else>{{scope.row.u2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第3节" prop="u3" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u3 === username" class="isMe">{{scope.row.u3}}</span>
            <span v-else>{{scope.row.u3}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第4节" prop="u4" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u4 === username" class="isMe">{{scope.row.u4}}</span>
            <span v-else>{{scope.row.u4}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第5节" prop="u5" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u5 === username" class="isMe">{{scope.row.u5}}</span>
            <span v-else>{{scope.row.u5}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第6节" prop="u6" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u6 === username" class="isMe">{{scope.row.u6}}</span>
            <span v-else>{{scope.row.u6}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第7节" prop="u7" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u7 === username" class="isMe">{{scope.row.u7}}</span>
            <span v-else>{{scope.row.u7}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第8节" prop="u8" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u8 === username" class="isMe">{{scope.row.u8}}</span>
            <span v-else>{{scope.row.u8}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第9节" prop="u9" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u9 === username" class="isMe">{{scope.row.u9}}</span>
            <span v-else>{{scope.row.u9}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第10节" prop="u10" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u10 === username" class="isMe">{{scope.row.u10}}</span>
            <span v-else>{{scope.row.u10}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第11节" prop="u11" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u11 === username" class="isMe">{{scope.row.u11}}</span>
            <span v-else>{{scope.row.u11}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第12节" prop="u12" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.u12 === username" class="isMe">{{scope.row.u12}}</span>
            <span v-else>{{scope.row.u12}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--        分页区域-->
      <el-pagination
          :current-page="queryinfo.current"
          :page-size="queryinfo.size"
          :page-sizes="[14, 21, 28, 35]"
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
      term: [],
      chooseterm: '',
      termstate: '',
      MaxWeek: 0,
      chooseWeek1: 0,
      chooseWeek2: 0,
      chooseDay: 0,
      labnum:'',
      lablist: [],
      editDialogVisible: false,
      queryinfo: {
        major: '',
        current: 1,
        size: 14,
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
    this.getterm()
    this.getlabs()
  },
  methods: {
    //获取学期
    getterm() {
      self = this
      this.axios.get('/getterm')
          .then(res => {
            self.term = res.data
          })
          .catch(err => {
            console.log(err);
          })
    },
    //选择学期
    chooseTerm(event) {
      this.termstate = event
      this.getweek()
    },
    //获取该学期一共有多少周
    getweek() {
      self = this
      this.axios.post('/getweek', qs.stringify({termstate: self.termstate}))
          .then(res => {
            self.MaxWeek = res.data.length
          })
          .catch(err => {
            console.log(err);
          })
    },
    //获取实验室列表
    getlabs() {
      let self = this
      this.axios.get('/lablist', {params: self.queryinfo})
          .then(function (response) {
            self.lablist = response.data
          })
          .catch(function (error) {
            self.$message.error('请求失败')
          });
    },
    //按学期、周数获取时间列表
    checkorders() {
      self = this
      this.axios.post('/checkorder', qs.stringify({
        current: self.queryinfo.current,
        size: self.queryinfo.size,
        week1: self.chooseWeek1,
        week2: self.chooseWeek2,
        labnum: self.labnum
      }))
          .then(res => {
            self.orderslist = res.data.records
            self.queryinfo.total = res.data.total
          })
          .catch(err => {
            self.$message.error("查询错误，请重试！")
          })
    },
    // 根据实验室编号查询实验室信息
    checkLab() {
      self = this
      this.axios.post('/checkLabByWeek', qs.stringify({
        week: self.chooseWeek,
        size: self.queryinfo.size,
        current: self.queryinfo.current
      }))
          .then(res => {
            if (self.chooseterm === '' || self.chooseterm === null || self.labnum === '' || self.labnum === null) {
              self.$message.error('请选择信息！！！')
            } else {
              self.checkorders();
              self.queryinfo.total = res.data.total
            }
          }).catch(err => {
        console.log(err);
      })
    },
    orderDialogClosed() {this.$refs.OrderFrom.resetFields()},
    handleSizeChange(newSize) {
      this.queryinfo.size = newSize
      this.checkorders()
    },
    handleCurrentChange(newPage) {
      this.queryinfo.current = newPage
      this.checkorders()
    },
    ByName() {
      self = this
      this.axios.post("nameorders",qs.stringify({current:self.queryinfo.current,size:self.queryinfo.size,username:self.userinfo.name}))
      .then( res => {
        self.orderslist = res.data.records
        self.queryinfo.total = res.data.total
      })
      .catch(err => {
        this.$message.error("查询失败，请稍后重试！")
      })
    },
    resting() {
      location.reload();
    },
    toorder() {
      this.$router.push("/checkorder")
    }
  }
}
</script>

<style scoped>
.card label{
  padding: 0 8px 0 8px;
}
.isMe{
  font-weight: 1000;
  color: var(--color-tint);
}
.head {
  display: flex;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.left, .right {
  width: 5%;
}
.center {
  flex: 1;
}
.center span {
  padding: 0 10px 0 10px;
}
</style>