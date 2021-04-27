<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统功能</el-breadcrumb-item>
      <el-breadcrumb-item>实验室预约</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    选择区-->
    <div class="head">
      <div class="left">
      </div>
      <div class="center">
        <el-select v-model="chooseterm"
                   clearable
                   placeholder="请选择"
                   @change="changezhou($event)">
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
        <span>第</span>
        <el-input-number v-model="chooseDay"
                         :max="7"
                         :min="1"
                         controls-position="right"
                         label="现在天数">
        </el-input-number>
        <span>天</span>
                <el-divider direction="vertical"></el-divider>
                <el-input  clearable placeholder="请按专业名称搜索实验室" style="width: 20%" v-model="queryinfo.major">
                  <el-button slot="append" icon="el-icon-search"  type="success" @click="checkLab"></el-button>
                </el-input>
      </div>
      <div class="right">
      </div>
    </div>
    <!--    卡片区-->
    <el-card v-if="tableshow" class="card">
      <el-table :data="lablist" :stripe="true" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column
            label="实验室名称"
            prop="labname"
            width="150">
        </el-table-column>
        <el-table-column
            label="所属专业"
            prop="major"
            width="150">
        </el-table-column>
        <el-table-column
            label="实验室编号"
            prop="labnum"
            width="150">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-for="(s,index) in orders" :key="index">
              <div v-if="s.labnum === scope.row.labnum">
                <el-checkbox v-if="s.s1 === 0 || s.s1 === null" label="第1节"></el-checkbox>
                <el-checkbox v-else disabled label="第1节"></el-checkbox>

                <el-checkbox v-if="s.s2 ===  0 || s.s2 === null " label="第2节"></el-checkbox>
                <el-checkbox v-else disabled label="第2节"></el-checkbox>

                <el-checkbox v-if="s.s3 ===  0 || s.s3 === null " label="第3节"></el-checkbox>
                <el-checkbox v-else disabled label="第3节"></el-checkbox>

                <el-checkbox v-if="s.s4 ===  0 || s.s4 === null " label="第4节"></el-checkbox>
                <el-checkbox v-else disabled label="第4节"></el-checkbox>

                <el-checkbox v-if="s.s5 ===  0 || s.s5 === null " label="第5节"></el-checkbox>
                <el-checkbox v-else disabled label="第5节"></el-checkbox>

                <el-checkbox v-if="s.s6 ===  0 || s.s6 === null " label="第6节"></el-checkbox>
                <el-checkbox v-else disabled label="第6节"></el-checkbox>

                <el-checkbox v-if="s.s7 ===  0 || s.s7 === null " label="第7节"></el-checkbox>
                <el-checkbox v-else disabled label="第7节"></el-checkbox>

                <el-checkbox v-if="s.s8 ===  0 || s.s8 === null " label="第8节"></el-checkbox>
                <el-checkbox v-else disabled label="第8节"></el-checkbox>

                <el-checkbox v-if="s.s9 ===  0 || s.s9 === null " label="第9节"></el-checkbox>
                <el-checkbox v-else disabled label="第9节"></el-checkbox>

                <el-checkbox v-if="s.s10 ===  0 || s.s10 === null " label="第10节"></el-checkbox>
                <el-checkbox v-else disabled label="第10节"></el-checkbox>

                <el-checkbox v-if="s.s11 ===  0 || s.s11 === null " label="第11节"></el-checkbox>
                <el-checkbox v-else disabled label="第11节"></el-checkbox>

                <el-checkbox v-if="s.s12 ===  0 || s.s12 === null " label="第12节"></el-checkbox>
                <el-checkbox v-else disabled label="第12节"></el-checkbox>
              </div>
            </div>
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
    <!--    实验室列表区-->
    <el-card v-else class="card">
      <el-table :data="lablist" :stripe="true" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column
            label="实验室名称"
            prop="labname">
        </el-table-column>
        <el-table-column
            label="所属专业"
            prop="major">
        </el-table-column>
        <el-table-column
            label="实验室编号"
            prop="labnum">
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
  name: "OrderControl",
  data() {
    return {
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
      lablist: [],
      total: 0,
      state: true,
      orders: [],
      tableshow: false,
      rules: [],
      s1:''
    }
  },
  created() {
    this.getterm()
    this.getlabs()
  },
  methods: {
    getterm() {
      self = this
      self.axios.get('/getterm')
          .then(res => {
            self.term = res.data
            console.log(self.term);
          })
          .catch(err => {
            console.log(err);
          })
    },
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
    changezhou(event) {
      this.termstate = event
      this.getweek()
    },
    getlabs() {
      let self = this
      self.axios.get('/lablist', {params: self.queryinfo})
          .then(function (response) {
            self.lablist = response.data.records
            self.total = response.data.total
          })
          .catch(function (error) {
            self.$message.error('请求失败')
          });
    },
    checkLab() {
      self = this
      self.axios.post('/checkorders', qs.stringify({
        week: self.chooseWeek,
        day: self.chooseDay,
        size: self.queryinfo.size,
        current: self.queryinfo.current
      }))
          .then(res => {
            if (self.chooseterm === '' || self.chooseterm === null) {
              self.$message.error('请选择学期！！！')
            } else {
              self.orders = res.data.records
              self.tableshow = true
              console.log(self.orders);
            }
          }).catch(err => {
        err.label
      })
    },
    handleSizeChange(newSize) {
      this.queryinfo.size = newSize
    },
    handleCurrentChange(newPage) {
      this.queryinfo.current = newPage
    },
  }
}
</script>

<style scoped>
.head {
  display: flex;
  height: 50px;
  background-color: #fff;
  box-shadow: 0px 0px 10px #e1e1e1;
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
</style>