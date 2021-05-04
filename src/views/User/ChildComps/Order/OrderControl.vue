<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统功能</el-breadcrumb-item>
      <el-breadcrumb-item>实验室预约</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    选择区-->
    <!--    卡片区-->
    <el-card class="card">
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
          <el-input-number v-model="chooseWeek"
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
          <el-button type="success" @click="toorderlist()" size="small">查看预约列表</el-button>
        </div>
        <div class="right">
        </div>
      </div>
      <el-divider></el-divider>
      <el-table :data="ordersMessage" :stripe="true" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="日期" prop="date" width="110"></el-table-column>
        <el-table-column label="星期" prop="day" width="60"></el-table-column>
        <el-table-column label="实验室名称" width="120" prop="labname"></el-table-column>
        <el-table-column label="预约节数" class="checkbox">
          <template slot-scope="scope">
            <label v-if="scope.row.s1 === true"><input type="checkbox" :disabled="true" :checked="true">第1节<i class="el-icon-caret-left" v-show="color[scope.$index].s1 === true"/></label>
            <label v-else @change="u1(scope)"><input type="checkbox">第1节</label>

            <label v-if="scope.row.s2 === true"><input type="checkbox" :disabled="true" :checked="true">第2节<i class="el-icon-caret-left" v-show="color[scope.$index].s2 === true"/></label>
            <label v-else @change="u2(scope)"><input type="checkbox">第2节</label>

            <label v-if="scope.row.s3 === true"><input type="checkbox" :disabled="true" :checked="true">第3节<i class="el-icon-caret-left" v-show="color[scope.$index].s3 === true"/></label>
            <label v-else @change="u3(scope)"><input type="checkbox">第3节</label>

            <label v-if="scope.row.s4 === true"><input type="checkbox" :disabled="true" :checked="true">第4节<i class="el-icon-caret-left" v-show="color[scope.$index].s4 === true"/></label>
            <label v-else @change="u4(scope)"><input type="checkbox">第4节</label>

            <label v-if="scope.row.s5 === true"><input type="checkbox" :disabled="true" :checked="true">第5节<i class="el-icon-caret-left" v-show="color[scope.$index].s5 === true"/></label>
            <label v-else @change="u5(scope)"><input type="checkbox">第5节</label>

            <label v-if="scope.row.s6 === true"><input type="checkbox" :disabled="true" :checked="true">第6节<i class="el-icon-caret-left" v-show="color[scope.$index].s6 === true"/></label>
            <label v-else @change="u6(scope)"><input type="checkbox">第6节</label>

            <label v-if="scope.row.s7 === true"><input type="checkbox" :disabled="true" :checked="true">第7节<i class="el-icon-caret-left" v-show="color[scope.$index].s7 === true"/></label>
            <label v-else @change="u7(scope)"><input type="checkbox">第7节</label>

            <label v-if="scope.row.s8 === true"><input type="checkbox" :disabled="true" :checked="true">第8节<i class="el-icon-caret-left" v-show="color[scope.$index].s8 === true"/></label>
            <label v-else @change="u8(scope)"><input type="checkbox">第8节</label>

            <label v-if="scope.row.s9 === true"><input type="checkbox" :disabled="true" :checked="true">第9节<i class="el-icon-caret-left" v-show="color[scope.$index].s9 === true"/></label>
            <label v-else  @change="u9(scope)"><input type="checkbox">第9节</label>

            <label v-if="scope.row.s10 === true"><input type="checkbox" :disabled="true" :checked="true">第10节<i class="el-icon-caret-left" v-show="color[scope.$index].s10 === true"/></label>
            <label v-else @change="u10(scope)"><input type="checkbox">第10节</label>

            <label v-if="scope.row.s11 === true"><input type="checkbox" :disabled="true" :checked="true">第11节<i class="el-icon-caret-left" v-show="color[scope.$index].s11 === true"/></label>
            <label v-else @change="u11(scope)"><input type="checkbox">第11节</label>

            <label v-if="scope.row.s12 === true"><input type="checkbox" :disabled="true" :checked="true">第12节<i class="el-icon-caret-left" v-show="color[scope.$index].s12 === true"/></label>
            <label v-else  @change="u12(scope)"><input type="checkbox">第12节</label>
          </template>
        </el-table-column>

      </el-table>
      <div style="width: 100%;text-align: center; margin-top: 15px">
        <el-button type="success" @click="resetting()" plain v-show="submitshow">重置</el-button>
      <el-button type="success" @click="submit()" v-show="submitshow">提交</el-button>
      </div>
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
  name: "OrderControl",
  computed: {
    username() {
      return this.$store.getters.getUser
    }
  },
  data() {
    return {
      isTrue:{color:'#F56C6C'},
      checkFlag:[],
      term: [],
      chooseterm: '',
      termstate: '',
      MaxWeek: 0,
      chooseWeek: 0,
      chooseDay: 0,
      queryinfo: {
        major: '',
        current: 1,
        size: 10
      },
      orderinfo: {
        labnum:this.labnum,
        current: 1,
        size: 10
      },
      lablist: [],
      total: 0,
      state: '',
      weeks:[],
      labnum:'',
      checkList: [],
      labname:'',
      labmajor:'',
      labdate:'',
      labday:'',
      ordersMessage:[],
      orders: [
        {id:'',s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false,u1:'',u2:'',u3:'',u4:'',u5:'',u6:'',u7:'',u8:'',u9:'',u10:'',u11:'',u12:''},
        {id:'',s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false,u1:'',u2:'',u3:'',u4:'',u5:'',u6:'',u7:'',u8:'',u9:'',u10:'',u11:'',u12:''},
        {id:'',s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false,u1:'',u2:'',u3:'',u4:'',u5:'',u6:'',u7:'',u8:'',u9:'',u10:'',u11:'',u12:''},
        {id:'',s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false,u1:'',u2:'',u3:'',u4:'',u5:'',u6:'',u7:'',u8:'',u9:'',u10:'',u11:'',u12:''},
        {id:'',s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false,u1:'',u2:'',u3:'',u4:'',u5:'',u6:'',u7:'',u8:'',u9:'',u10:'',u11:'',u12:''},
        {id:'',s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false,u1:'',u2:'',u3:'',u4:'',u5:'',u6:'',u7:'',u8:'',u9:'',u10:'',u11:'',u12:''},
        {id:'',s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false,u1:'',u2:'',u3:'',u4:'',u5:'',u6:'',u7:'',u8:'',u9:'',u10:'',u11:'',u12:''},
      ],
      ordersdate:[
        {state:'',date:'',username:'',labname:'',labnum:''},
        {state:'',date:'',username:'',labname:'',labnum:''},
        {state:'',date:'',username:'',labname:'',labnum:''},
        {state:'',date:'',username:'',labname:'',labnum:''},
        {state:'',date:'',username:'',labname:'',labnum:''},
        {state:'',date:'',username:'',labname:'',labnum:''},
        {state:'',date:'',username:'',labname:'',labnum:''},
      ],
      submitshow:false,
      userorders:[],
      color: [
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
      ],
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
      self.axios.get('/getterm')
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
      self.axios.post('/getweek', qs.stringify({termstate: self.termstate}))
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
      self.axios.get('/lablist', {params: self.queryinfo})
          .then(function (response) {
            self.lablist = response.data.records
          })
          .catch(function (error) {
            self.$message.error('请求失败')
          });
    },
    //按学期、周数获取时间列表
    checkorders() {
      self = this
      self.axios.post('/checkorders', qs.stringify({
        current: self.orderinfo.current,
        size: self.orderinfo.size, week: self.chooseWeek,labnum: self.labnum
      }))
          .then(res => {
            self.ordersMessage = res.data.records
            self.orders = res.data.records
            self.total = res.data.total
            for (let i = 0;i <7; i ++){
              self.ordersdate[i].date = self.orders[i].date
              self.ordersdate[i].username = self.username
              self.ordersdate[i].labname = self.orders[i].labname
              self.ordersdate[i].labnum = self.orders[i].labnum
            }
          })
          .catch(err => {
            self.$message.error("查询错误，请重试！")
          })
    },
    // 根据实验室编号查询实验室信息
    checkLab() {
      self = this
      self.axios.post('/checkLabByWeek', qs.stringify({
        week: self.chooseWeek,
        size: self.queryinfo.size,
        current: self.queryinfo.current
      }))
          .then(res => {
            if (self.chooseterm === '' || self.chooseterm === null || self.labnum === '' || self.labnum === null) {
              self.$message.error('请选择信息！！！')
            } else {
              self.checkorders();
              self.submitshow = true
            }
          }).catch(err => {
        console.log(err);
      })
    },
    // 切换页数
    handleSizeChange(newSize) {
      this.queryinfo.size = newSize
    },
    handleCurrentChange(newPage) {
      this.queryinfo.current = newPage
    },
    //确认预约
    submit() {
      let self = this
      let orders = JSON.stringify(self.orders)
      self.$confirm('此操作将预约该实验室, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass:'sumbit',
          type: 'warning'
        }).then(() => {
          self.axios.post('/order',orders,{headers:{'Content-Type': 'application/json'}})
          .then(res => {
            self.newcolor();
            self.adduserorders();
            self.checkLab();
            self.$message.success("恭喜您，预约成功！")
          })
          .catch(err => {
            self.$message.success("预约失败，请稍后重试！")
          })
        }).catch(() => {
          self.resetting();
          self.$message({
            type: 'info',
            message: '已取消预约'
          });
        });
    },
    //重置操作
    resetting() {
      this.checkLab();
    },
    // 保存我的预约信息
    adduserorders() {
      self = this
      for (let i =0;i<7;i++){
        if (self.ordersdate[i].state === 1 ){
          self.userorders.push(self.ordersdate[i])
          self.ordersdate[i].state = ''
        }
      }
      let userOrders = JSON.stringify(self.userorders)
      self.axios.post('/adduserorder',userOrders,{headers:{'Content-Type': 'application/json'}})
      .then(res => {
        console.log('______________________________');
        console.log(res);
      }).catch(err => {
        return err;
      })
      self.userorders = []
    },
    u1(scope) {
      this.isTrue.color = 'cornflowerblue'
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u1 = this.username
      this.orders[scope.$index].s1 = !this.orders[scope.$index].s1
      this.color[scope.$index].s1 = true
    },
    u2(scope) {
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u2 = this.username
      this.orders[scope.$index].s2 = !this.orders[scope.$index].s2
      this.color[scope.$index].s2 = true
    },
    u3(scope) {
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u3 = this.username
      this.orders[scope.$index].s3 = !this.orders[scope.$index].s3
      this.color[scope.$index].s3 = true
    },
    u4(scope) {
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u4 = this.username
      this.orders[scope.$index].s4 = !this.orders[scope.$index].s4
      this.color[scope.$index].s4 = true
    },
    u5(scope) {
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u5 = this.username
      this.orders[scope.$index].s5 = !this.orders[scope.$index].s5
      this.color[scope.$index].s5 = true
    },
    u6(scope) {
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u6 = this.username
      this.orders[scope.$index].s6 = !this.orders[scope.$index].s6
      this.color[scope.$index].s6 = true
    },
    u7(scope) {
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u7 = this.username
      this.orders[scope.$index].s7 = !this.orders[scope.$index].s7
      this.color[scope.$index].s7 = true
    },
    u8(scope) {
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u8 = this.username
      this.orders[scope.$index].s8 = !this.orders[scope.$index].s8
      this.color[scope.$index].s8 = true
    },
    u9(scope) {
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u9 = this.username
      this.orders[scope.$index].s9 = !this.orders[scope.$index].s9
      this.color[scope.$index].s9 = true
    },
    u10(scope) {
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u10 = this.username
      this.orders[scope.$index].s10 = !this.orders[scope.$index].s10
      this.color[scope.$index].s10 = true
    },
    u11(scope) {
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u11 = this.username
      this.orders[scope.$index].s11 = !this.orders[scope.$index].s11
      this.color[scope.$index].s11 = true
    },
    u12(scope) {
      this.ordersdate[scope.$index].state = 1
      this.orders[scope.$index].u12 = this.username
      this.orders[scope.$index].s12 = !this.orders[scope.$index].s12
      this.color[scope.$index].s12 = true
    },
    newcolor() {
      this.color = [
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
        {s1:false,s2:false,s3:false,s4:false,s5:false,s6:false,s7:false,s8:false,s9:false,s10:false,s11:false,s12:false},
      ]
    },
    resting() {
      location.reload();
    },
    toorderlist() {
      this.$router.push("/home/orderlist")
    }
  }
}
</script>

<style scoped>
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
.card {
  margin-top: 15px;
}
.card label{
  padding: 0 15px 0 15px;
  font-size: 15px;
}
.isTure i{
  color: #F56C6C;
}
</style>