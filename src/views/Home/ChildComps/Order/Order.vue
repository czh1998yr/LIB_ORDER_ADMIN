<template>
  <div id="order">
    <div class="head">课程表信息</div>
    <div class="query">
      <div class="left">
        实验室所属专业：
          <el-input style="width: 100px" v-model="getmajor"></el-input>
      </div>
      <div class="center"></div>
      <div class="right">
        <el-button type="success" @click="check">查询</el-button>
        <el-button type="success">清空</el-button>
      </div>
    </div>
    <div class="master-list">
      <el-table
          :data="lablist"
          style="width: 100%">
        <el-table-column
            label="序号"
            type="index"
        width="100px">
        </el-table-column>
        <el-table-column
            label="实验室名称">
          <template slot-scope="scope">
           {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
            label="实验室编号">
          <template slot-scope="scope">
            {{ scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column
            label="实验室状态">
          <template slot-scope="scope">
            {{ scope.row.state }}
          </template>
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="isShow(scope.$index, scope.row)">预约</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 50px;margin-left: 50px">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="item"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </div>
    <popup :show="show" @changeShow="showPopup" ref="showPopup" :chooseName="chooseName"></popup>
  </div>
</template>

<script>

import qs from "qs";
import Popup from "@/views/Home/ChildComps/Order/Popup";

export default {
  name: "Order",
  components:{
    Popup
  },
  data() {
    return {
      getLabList:'getLabList',
      getmajor:'',
      getMajor:'getMajor',
      chooseName:'',

      //分页区数据
      lablist:[],
      //当前页数
      current:'',
      //每页显示多少条
      item:1,
      //一共有多少页
      size:'',
      //一共有多少条
      total:1,

      show:false
    }
  },
  created() {
    let self = this
    self.axios.post('/api/lab_table')
        .then(function (response) {
          self.lablist = response.data.labList;
          self.current = response.data.current;
          self.item = response.data.item;
          self.size = response.data.size;
          self.total = response.data.total;
        })
        .catch(function (error) {
          self.$message.error('请求失败')
        });
  },
  methods: {
    check() {
      let self = this
      self.axios.post('/labServlet', qs.stringify({major:"%"+self.getmajor+"%",action: self.getMajor}))
          .then(function (response) {
            self.lablist = response.data;
          })
          .catch(function (error) {
            self.$message.error('请求失败!')
          });
    },
    isShow(index, row) {
      this.show = true
      this.chooseName = row.name
    },
    showPopup(data){
      if(data === 'false'){
        this.show = false
      }else{
        this.show = true
      }
    },
    handleSizeChange(newitem) {
      let self = this
      self.item = newitem
      self.axios.post('/api/lab_table',qs.stringify({item:newitem}))
          .then(function (response) {
            self.lablist = response.data.labList;
            self.current = response.data.current;
            self.item = response.data.item;
            self.size = response.data.size;
            self.total = response.data.total;
          })
          .catch(function (error) {
            self.$message.error('请求失败')
          });
    },
    handleCurrentChange(newcurrent) {
      let self = this
      self.current = newcurrent
      self.axios.post('/api/lab_table',qs.stringify({pn:newcurrent}))
          .then(function (response) {
            self.lablist = response.data.labList;
            self.current = response.data.current;
            self.item = response.data.item;
            self.size = response.data.size;
            self.total = response.data.total;
          })
          .catch(function (error) {
            self.$message.error('请求失败')
          });
    }
  }
}
</script>

<style scoped>
  #order{
    height: 90%;
  }
  .head{
    margin-top: 10px;
    background-color: var(--color-tint);
    height: 30px;
    line-height: 30px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    padding-left: 20px;
  }
  .query{
    background-color: #fff;
    text-align: center;
    line-height: 40px;
    display: flex;
  }
  .left{
    width:1200px;
    text-align: left;
    padding-left: 8px;
  }
  .right{
    width:300px;
  }
  .center{
    flex: 1;
  }
  .el-select/deep/{
    width: 100px;
  }
  button{
    border:none;
    color: #fff;
    padding: 8px;
    margin:0px 20px 0px 20px;
  }
  .master-list{
    background-color: #FFF;
    height: 99%;
    margin-top: 10px;
    line-height: 50px;
  }
</style>