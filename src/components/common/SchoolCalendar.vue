<template>
  <el-table :data="week" max-height="680px" stripe>
    <el-table-column label="周" prop="week"></el-table-column>
    <el-table-column label="星期一">
      <template slot-scope="scope">
      <div v-for="(item,index) in alldate" :key="index">
        <span v-if="scope.row.week === item.week && item.day === 1 && item.date === dateFormat(date)" class="now">{{item.date | formatDate}} <i class="el-icon-s-promotion"></i> </span>
        <span v-else-if="scope.row.week === item.week && item.day === 1">{{item.date | formatDate}}</span>
      </div>
      </template>
    </el-table-column>
    <el-table-column label="星期二">
      <template slot-scope="scope">
        <div v-for="(item,index) in alldate" :key="index">
          <span v-if="scope.row.week === item.week && item.day === 2 && item.date === dateFormat(date)" class="now">{{item.date | formatDate}} <i class="el-icon-s-promotion"></i> </span>
          <span v-else-if="scope.row.week === item.week && item.day === 2">{{item.date | formatDate}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="星期三">
      <template slot-scope="scope">
        <div v-for="(item,index) in alldate" :key="index">
          <span v-if="scope.row.week === item.week && item.day === 3 && item.date === dateFormat(date)" class="now">{{item.date | formatDate}} <i class="el-icon-s-promotion"></i> </span>
          <span v-else-if="scope.row.week === item.week && item.day === 3">{{item.date | formatDate}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="星期四">
      <template slot-scope="scope">
        <div v-for="(item,index) in alldate" :key="index">
          <span v-if="scope.row.week === item.week && item.day === 4 && item.date === dateFormat(date)" class="now">{{item.date | formatDate}} <i class="el-icon-s-promotion"></i> </span>
          <span v-else-if="scope.row.week === item.week && item.day === 4">{{item.date | formatDate}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="星期五">
      <template slot-scope="scope">
        <div v-for="(item,index) in alldate" :key="index">
          <span v-if="scope.row.week === item.week && item.day === 5 && item.date === dateFormat(date)" class="now">{{item.date | formatDate}} <i class="el-icon-s-promotion"></i> </span>
          <span v-else-if="scope.row.week === item.week && item.day === 5">{{item.date | formatDate}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="星期六">
      <template slot-scope="scope">
        <div v-for="(item,index) in alldate" :key="index">
          <span v-if="scope.row.week === item.week && item.day === 6 && item.date === dateFormat(date)" class="now">{{item.date | formatDate}} <i class="el-icon-s-promotion"></i> </span>
          <span v-else-if="scope.row.week === item.week && item.day === 6">{{item.date | formatDate}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="星期日">
      <template slot-scope="scope">
        <div v-for="(item,index) in alldate" :key="index">
          <span v-if="scope.row.week === item.week && item.day === 7 && item.date === dateFormat(date)" class="now">{{item.date | formatDate}} <i class="el-icon-s-promotion"></i> </span>
          <span v-else-if="scope.row.week === item.week && item.day === 7">{{item.date | formatDate}}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import qs from 'qs'
import {formatDate} from '../../common/PublicMethod'
export default {
  name: "SchoolCalendar",
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'M-d')
    }
  },
  data() {
    return{
      termstate:'1',
      week:[],
      alldate:[],
      date:new Date(),
    }
  },
  created() {
    this.getweek()
    this.getall()
  },
  methods: {
    getweek() {
      self = this
      self.axios.post('/getweek', qs.stringify({termstate: self.termstate}))
          .then(res => {
            self.week = res.data
          })
          .catch(err => {
          })
    },
    getall() {
      self = this
      self.axios.post('getall',qs.stringify({termstate: self.termstate}))
      .then(res =>{
        self.alldate = res.data
      })
      .catch(err => {
        return self.$message.error('发生错误！')
      })
    },
    aaa() {
      console.log(this.week);
    },
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      * */
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ?  "0"+ date.getDate() : date.getDate();
      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      // return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
      return year + "-" + month + "-" + day;
    }
  },
  mounted() {
    //显示当前日期时间
    let _this = this// 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>

<style scoped>
.now{
  font-size: 20px;
  color: var(--color-tint);
  font-weight: bold;
  text-decoration: underline
}
</style>