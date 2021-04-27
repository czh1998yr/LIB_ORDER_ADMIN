<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统功能</el-breadcrumb-item>
      <el-breadcrumb-item>实验室预约</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区-->
    <el-card class="box-card">
      <!--        搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input v-model="queryinfo.major" clearable placeholder="请按专业名称搜索实验室" @clear="getLabList">
            <el-button slot="append" icon="el-icon-search" @click="getLabList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--      用户列表去-->
      <el-table :data="lablist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="实验室名称" prop="name"></el-table-column>
        <el-table-column label="所属专业" prop="major"></el-table-column>
        <el-table-column label="实验室号" prop="num"></el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column align="center" label="操作">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-tooltip :enterable="false" content="预约实验室" effect="dark" placement="top">
              <el-button circle icon="el-icon-plus"
                         size="mini" type="success"
                         @click="showEditDialog(scope.row.id)"></el-button>
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
    <!--    预约实验室对话框-->
    <el-dialog
        :close-on-click-modal="false"
        :visible.sync="editDialogVisible"
        title="实验室预约"
        width="28%"
        @close="orderDialogClosed">
      <!--      内容主体区-->
      <el-form ref="OrderFrom" :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="选择实验室名称： " label-width="150px">
          <el-input v-model="editForm.name" :disabled="true" placeholder="请输入内容" style="width: 80%"/>
        </el-form-item>
        <el-form-item label="请选择起止日期： " label-width="150px" prop="dateRange">
          <el-date-picker
              v-model="editForm.dateRange"
              :picker-options="rules.pickerOptions"
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              style="width: 80%"
              type="daterange"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请选择起止时间： " label-width="150px" prop="time">
          <el-time-picker
              v-model="editForm.time"
              end-placeholder="结束时间"
              is-range
              placeholder="请选择时间"
              range-separator="至"
              start-placeholder="开始时间"
              style="width: 80%"
              value-format="HH:mm:ss">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="请选择预约的人： " label-width="150px">
          <el-input v-model="username" :disabled="true" placeholder="请输入内容" style="width: 80%"/>
        </el-form-item>
      </el-form>
      {{ editForm.dateRange }}
      {{ editForm.time }}
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="success" @click="order('OrderFrom')">确 定</el-button>
  </span>
    </el-dialog>
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
      editDialogVisible: false,
      queryinfo: {
        major: '',
        current: 1,
        size: 10
      },
      lablist: [],
      total: 0,
      lab: {
        name: '',
        major: '',
        num: '',
        state: '空闲'
      },
      editForm: {},
      rules: {
        dateRange:{
          type: 'array', required: true,message: '请选择日期区间', fields: {
            //tpye类型试情况而定,所以如果返回的是date就改成date
            0: { type: 'string', required: true, message: '请选择开始日期' },
            1: { type: 'string', required: true, message: '请选择结束日期' }
          }
        },
        time:
          {
            type: 'array',required: true,message: '请选择时间区间', fields: {
              //tpye类型试情况而定,所以如果返回的是date就改成date
              0: { type: 'string', required: true, message: '请选择开始时间' },
              1: { type: 'string', required: true, message: '请选择结束时间' }
            }
          },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      }
    }
  },
  created() {
    this.getLabList()
  }
  ,
  methods: {
    orderDialogClosed() {this.$refs.OrderFrom.resetFields()},
    getLabList() {
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
    handleSizeChange(newSize) {
      this.queryinfo.size = newSize
      this.getLabList()
    },
    handleCurrentChange(newPage) {
      this.queryinfo.current = newPage
      this.getLabList()
    },
    showEditDialog(id) {
      let self = this
      self.editDialogVisible = true
      self.axios.get('/labid?id=' + id)
          .then(function (res) {
            self.editForm = res.data
          })
          .catch(function (error) {
            self.$message.error('查询实验室信息失败')
          });
    },
    order(OrderFrom) {
      this.$refs[OrderFrom].validate((valid) => {
        if (valid) {
          let self = this
          let starttime = self.editForm.dateRange[0] + ' '+self.editForm.time[0]
          let endtime = self.editForm.dateRange[1] + ' '+self.editForm.time[1]
          self.axios.post('/order',qs.stringify({username:self.username,
            labname:self.editForm.name,starttime:starttime,endtime:endtime,lid:self.editForm.id}))
              .then(function (res) {
                self.editDialogVisible=false
                self.getLabList()
                self.$message.success('恭喜你预约成功')
              })
              .catch(function (error) {
                self.$message.error('预约失败，请稍后重试！')
                console.log(starttime);
                console.log(endtime);
              });
        }
      });
    }
  }
}
</script>

<style scoped>

</style>