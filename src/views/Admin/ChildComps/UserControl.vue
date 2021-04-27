<template>
  <div>
<!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin_home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统功能</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片视图区-->
    <el-card class="box-card">
<!--        搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入需要查找的用户名" v-model="queryinfo.username" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success" @click="openDialog">添加用户</el-button>
        </el-col>
      </el-row>
<!--      用户列表去-->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="用户密码" prop="repassword"></el-table-column>
        <el-table-column label="用户邮箱地址" prop="email"></el-table-column>
        <el-table-column label="操作" align="center">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑用户" placement="top" :enterable="false">
              <el-button type="success" icon="el-icon-edit" circle size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="delUserById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
<!--        分页区域-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryinfo.current"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="queryinfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </el-card>
<!--    对话框区域-->
<!--    添加用户对话框-->
    <el-dialog
        title="添加新用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
        :close-on-click-modal="false">
<!--      内容主体区-->
      <el-form label-width="80px"
               :model="user"
               :rules="rules"
               ref="userForm">
        <el-form-item prop="username" label-width="0px">
          <el-input name="username"
                    placeholder="请输入用户名"
                    autofocus
                    v-model.trim="user.username"
                    prefix-icon="el-icon-user-solid"/>
        </el-form-item>
        <el-form-item prop="password" label-width="0px">
          <el-input name="password"
                    placeholder="请输入密码"
                    v-model.trim="user.password"
                    show-password
                    prefix-icon="el-icon-lock"/>
        </el-form-item>
        <el-form-item prop="repassword" label-width="0px">
          <el-input name="repassword"
                    placeholder="请确认密码"
                    v-model.trim="user.repassword"
                    show-password
                    prefix-icon="el-icon-lock"/>
        </el-form-item>
        <el-form-item prop="email" label-width="0px">
          <el-input name="email"
                    placeholder="请输入邮箱"
                    v-model.trim="user.email"
                    prefix-icon="el-icon-message"/>
        </el-form-item>
      </el-form>
<!--      底部区域-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="success" @click="addUsers('userForm')">确 定</el-button>
  </span>
    </el-dialog>
<!--    修改用户信息对话框-->
    <el-dialog
        title="修改用户信息"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="updateDialogClosed"
        :close-on-click-modal="false">
      <!--      内容主体区-->
      <el-form label-width="80px"
               :model="editForm"
               :rules="rules2"
               ref="userForm1">
        <el-form-item label-width="0px">
          <el-input
              v-model="editForm.username"
              :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword" label-width="0px">
          <el-input name="repassword"
                    placeholder="请输入要修改的密码"
                    v-model="editForm.repassword"
                    prefix-icon="el-icon-lock"/>
        </el-form-item>
        <el-form-item prop="email" label-width="0px">
          <el-input name="newemail"
                    placeholder="请输入要修改的邮箱"
                    v-model="editForm.email"
                    prefix-icon="el-icon-message"/>
        </el-form-item>
      </el-form>
<!--      底部区域-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="success" @click="userUpdata('userForm1')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "UserControl",
  data() {
    return {
      queryinfo:{
        username:'',
        current:1,
        size:10
      },
      userlist:[],
      total:0,
      addDialogVisible:false,
      editDialogVisible:false,
      user: {
        username:'',
        password:'',
        email:'',
      },
      editForm:{},
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' ,min: 2},
          {validator:(rule, value, callback) => {
              const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
              if (!reg.test(value)) {
                callback(new Error('请输入正确的用户名！！'))
              } else {
                callback()
              }
            }
          }
        ],
        password:[
          { required: true, message: '请设置一个不少于六位数的密码', trigger: 'blur' ,min: 6 , max: 12},
          {
            validator:(rule, value, callback) => {
              const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
              if (!reg.test(value)) {
                callback(new Error('密码中不允许有空格出现！！'))
              } else {
                callback()
              }
            }
          }
        ],
        repassword:[
          // { required: true, message: '请确认密码！', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value !== this.user.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            }, trigger: 'blur' }
        ],
        email:[
          {required: true, message: '请输入邮箱', trigger: 'blur' },
          {validator: (rule, value, callback) => {
              const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
              if (!value) {
                return callback(new Error('邮箱不能为空'))
              }
              setTimeout(() => {
                if (mailReg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的邮箱格式'))
                }
              }, 100)
            }
          }
        ],
      },
      rules2:{
        repassword:[
          { required: true, message: '请设置一个不少于六位数的密码', trigger: 'blur' ,min: 6 , max: 12},
          {
            validator:(rule, value, callback) => {
              const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
              if (!reg.test(value)) {
                callback(new Error('密码中不允许有空格出现！！'))
              } else {
                callback()
              }
            }
          }
        ],
        email:[
          {required: true, message: '请输入邮箱', trigger: 'blur' },
          {validator: (rule, value, callback) => {
              const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
              if (!value) {
                return callback(new Error('邮箱不能为空'))
              }
              setTimeout(() => {
                if (mailReg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的邮箱格式'))
                }
              }, 100)
            }
          }
        ],
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      let self = this
      self.axios.get('/userslist',{params:self.queryinfo})
          .then(function (response) {
            self.userlist=response.data.records
            self.total=response.data.total
          })
          .catch(function (error) {
            self.$message.error('请求失败')
          });
    },
    handleSizeChange(newSize) {
      this.queryinfo.size = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.queryinfo.current = newPage
      this.getUserList()
    },
    openDialog() {
      this.addDialogVisible = true
    },
    addUsers(userForm) {
      let self = this;
      this.$refs[userForm].validate((valid) => {
        if (valid) {
          self.$store.dispatch('register',
              {username:self.user.username,
                password:self.user.password,
                repassword:self.user.repassword,
                email:self.user.email})
              .then(response => {
                self.addDialogVisible = false
                self.getUserList()
                self.$message.success(response.data.message)
              })
              .catch(response => {
                self.$message.error(response.data.message)
              })
        }
      });
    },
    addDialogClosed() {
      this.$refs.userForm.resetFields()
    },
    updateDialogClosed() {
      this.$refs.userForm1.resetFields()
    },
    showEditDialog(id) {
      this.editDialogVisible = true
      self = this
      self.axios.get('/userid?id='+id)
          .then(function (response) {
            self.editForm=response.data
            console.log(self.editForm);
          })
          .catch(function (error) {
            self.$message.error('查询用户信息失败')
          });
    },
    userUpdata(userForm1) {
      this.$refs[userForm1].validate((valid) => {
        if (valid) {
          let self = this
          self.axios.post('/revise', qs.stringify({password:self.editForm.password, repassword:self.editForm.repassword,email:self.editForm.email,id:self.editForm.id}))
              .then(function (response) {
                console.log(response);
                self.$message.success(response.data.message)
                self.editDialogVisible = false
                self.getUserList()
              })
              .catch(function (error) {
                self.$message.error('修改失败，请稍后重试！')
              });
        }
      });
    },
    delUserById(id) {
      // 删除确认提示框
      self = this
      self.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      confirmButtonClass: 'btnFalses'
      }).then(() => {
        self.axios.post('/delid?id='+id)
        .then(response => {
          self.$message.success({ message: '删除成功!'});
          self.getUserList()
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

.btnFalse{
  background: #000 !important;
}
.btnFalses{
  background: var(--color-tint) !important;
  color:#fff !important;
}
</style>