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
              <el-button circle icon="el-icon-edit" size="mini" type="success"></el-button>
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
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "Order",
  data() {
    return {
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
    }
  },
  created()
  {
    this.getLabList()
  }
  ,
  methods: {
    getLabList()
    {
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
  }
}
</script>

<style scoped>

</style>