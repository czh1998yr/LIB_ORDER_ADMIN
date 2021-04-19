<template>
  <div id="myorder">
    <div class="head">
      <div class="left"></div>
      <div class="center">我的预约</div>
      <div class="right"></div>
    </div>
    <div class="orders-list">
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
            label="预约日期">
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
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "MyOrder",
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
    self.axios.post('/lab_table')
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
    handleSizeChange(newitem) {
      let self = this
      self.item = newitem
      self.axios.post('/lab_table',qs.stringify({item:newitem}))
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
      self.axios.post('/lab_table',qs.stringify({pn:newcurrent}))
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
#myorder{
  background-color: #f8f8f8;
  height: 100%;
}
.head{
  background-color: #fff;
  text-align: center;
  line-height: 100px;
  display: flex;
}
.left,.right{
  width: 200px;
}
.left{
  background: url("~assets/img/aboutbarimg.png") no-repeat;
  background-size: 80% 80%;
}
.right{
  background: url("~assets/img/aboutbarimg.png") no-repeat;
  transform: rotateY(180deg);
  background-size: 80% 80%;
}
.center{
  flex: 1;
  color: var(--color-tint);
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 2px;
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
.orders-list{
  background-color: #FFF;
  height: 99%;
  margin-top: 10px;
  line-height: 50px;
}
</style>