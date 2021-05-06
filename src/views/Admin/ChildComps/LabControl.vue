<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin_home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统功能</el-breadcrumb-item>
      <el-breadcrumb-item>实验室管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区-->
    <el-card class="box-card">
      <!--        搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input v-model="queryinfo.labname" clearable placeholder="按实验室名称搜索实验室" @clear="getLabList">
            <el-button slot="append" icon="el-icon-search" @click="getLabList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success" @click="openDialog">添加实验室</el-button>
        </el-col>
      </el-row>
      <!--      用户列表去-->
      <el-table :data="lablist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="实验室名称" prop="labname"></el-table-column>
        <el-table-column label="实验室号" prop="labnum"></el-table-column>
        <el-table-column align="center" label="操作">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-tooltip :enterable="false" content="编辑实验室" effect="dark" placement="top">
              <el-button circle icon="el-icon-edit" size="mini" type="success"
                         @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="删除实验室" effect="dark" placement="top">
              <el-button circle icon="el-icon-delete" size="mini" type="danger"
                         @click="delUserById(scope.row.id)"></el-button>
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
    <!--    添加实验室对话框-->
    <el-dialog
        :visible.sync="addDialogVisible"
        title="添加新实验室"
        width="50%"
        @close="addDialogClosed"
        :close-on-click-modal="false">
      <!--      内容主体区-->
      <el-form ref="userForm"
               :model="lab"
               :rules="rules"
               label-width="80px">
        <el-form-item label-width="0px" prop="name">
          <el-input v-model.trim="lab.name"
                    autofocus
                    placeholder="请输入实验室名称"
                    prefix-icon="el-icon-s-home"/>
        </el-form-item>
        <el-form-item label-width="0px" prop="labnum">
          <el-input v-model.number="lab.labnum"
                    placeholder="请输入实验室编号"
                    prefix-icon="el-icon-location"/>
        </el-form-item>
      </el-form>
      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="success" @click="addUsers('userForm')">确 定</el-button>
  </span>
    </el-dialog>
    <!--    修改实验室对话框-->
    <el-dialog
        :visible.sync="editDialogVisible"
        title="修改实验室信息"
        width="50%"
        @close="updateDialogClosed"
        :close-on-click-modal="false">
      <!--      内容主体区-->
      <el-form ref="userForm1"
               :model="editForm"
               :rules="rules"
               label-width="80px">
        <el-form-item label="实验室名称：" label-width="110px" prop="labname">
          <el-input v-model.trim="editForm.labname"
                    prefix-icon="el-icon-s-home">
          </el-input>
        </el-form-item>
        <el-form-item label="实验室编号：" label-width="110px" prop="labnum">
          <el-input v-model.number="editForm.labnum"
                    prefix-icon="el-icon-location"/>
        </el-form-item>
      </el-form>
      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="success" @click="labUpdata('userForm1')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "LabControl",
  data() {
    return {
      queryinfo: {
        labname: '',
        current: 1,
        size: 10
      },
      lablist: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      lab: {
        name: '',
        major: '',
        labnum: '',
        state: '空闲'
      },
      editForm: {},
      rules: {
        name: [
          {required: true, message: '请输入实验室名称', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
              if (!reg.test(value)) {
                callback(new Error('请输入正确的实验室名称！！'))
              } else {
                callback()
              }
            }
          }
        ],
        major: [
          {required: true, message: '请输入所属专业', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
              if (!reg.test(value)) {
                callback(new Error('输入内容中不可包含空格！！'))
              } else {
                callback()
              }
            }
          }
        ],
        labnum: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('实验室编号不能为空'));
              }
              setTimeout(() => {
                if (!Number.isInteger(value)) {
                  callback(new Error('请输入数字值'));
                }else {
                  callback();
                }
              }, 100);
            }
          }
        ],
        state: [
          {required: true, message: '请输入实验室状态', trigger: 'blur'},
        ],
      }
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
      self.axios.get('/lablistpage', {params: self.queryinfo})
          .then(function (response) {
            console.log(response);
            self.lablist = response.data.records
            self.total = response.data.total
          })
          .catch(function (error) {
            self.$message.error('请求失败')
          });
    }
    ,
    handleSizeChange(newSize)
    {
      this.queryinfo.size = newSize
      this.getLabList()
    }
    ,
    handleCurrentChange(newPage)
    {
      this.queryinfo.current = newPage
      this.getLabList()
    }
    ,
    openDialog()
    {
      this.addDialogVisible = true
    }
    ,
    addUsers(userForm)
    {
      let self = this;
      self.$refs[userForm].validate((valid) => {
        if (valid) {
          self.axios.post('/addlab', qs.stringify({
            labname: self.lab.name, labnum: self.lab.labnum
          }))
              .then(res => {
                let data = res.data
                console.log(data);
                if (data.code === 200) {
                  self.addDialogVisible = false
                  self.$message.success(data.message)
                  self.getLabList()
                } else {
                  self.$message.error('添加失败，请稍后重试！')
                }
              }).catch(err => {
            self.$message.error('服务器开小差咯，请稍后重试！')
          })
        }
      });
    }
    ,
    addDialogClosed()
    {
      this.$refs.userForm.resetFields()
    }
    ,
    updateDialogClosed()
    {
      this.$refs.userForm1.resetFields()
    }
    ,
    showEditDialog(id)
    {
      this.editDialogVisible = true
      self = this
      self.axios.get('/labid?id=' + id)
          .then(function (response) {
            self.editForm = response.data
          })
          .catch(function (error) {
            self.$message.error('查询信息失败')
          });
    }
    ,
    labUpdata(userForm1)
    {
      this.$refs[userForm1].validate((valid) => {
        if (valid) {
          let self = this
          self.axios.post('/reviselab', qs.stringify({
            labname: self.editForm.labname,
            labnum: self.editForm.labnum,
            id: self.editForm.id
          }))
              .then(function (res) {
                self.$message.success(res.data.message)
                self.editDialogVisible = false
                self.getLabList()
              })
              .catch(function (error) {
                self.$message.error('修改失败，请稍后重试！')
              });
        }
      });
    }
    ,
    delUserById(id)
    {
      // 删除确认提示框
      self = this
      self.$confirm('此操作将永久删除该实验室, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass:'sumbit',
        type: 'warning',
      }).then(() => {
        self.axios.post('/dellab?id=' + id)
            .then(response => {
              self.$message.success({message: '删除成功!'});
              self.getLabList()
            }).catch(err => {
          self.$message.error({message: '删除失败，请稍后重试！'});
        })
      }).catch(() => {
        self.$message.info({message: '已取消删除'});
      });
    }
  }
}
</script>

<style scoped>

</style>