<template>
  <portal-template>
  <div class="box">
    <div class="title">注册新用户</div>
    <el-form label-width="80px"
             :model="lab"
             :rules="rules"
              ref="userForm">
      <el-form-item prop="name" label-width="0px">
        <el-input name="name"
                  placeholder="请输入实验室名称"
                  autofocus
                  v-model.trim="lab.name"
                  prefix-icon="el-icon-user-solid"/>
      </el-form-item>
      <el-form-item prop="major" label-width="0px">
      <el-input name="major"
                placeholder="请输入实验室所属专业"
                v-model.trim="lab.major"
                show-password
                prefix-icon="el-icon-lock"/>
      </el-form-item>
      <el-form-item prop="num" label-width="0px">
        <el-input name="num"
                  placeholder="请输入实验室编号"
                  v-model.trim="lab.num"
                  show-password
                  prefix-icon="el-icon-lock"/>
      </el-form-item>
      <el-form-item prop="state" label-width="0px">
        <el-input name="state"
                  placeholder="请输入实验室状态（默认空闲）"
                  v-model.trim="lab.state"
                  prefix-icon="el-icon-message"/>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="success" @click="login('userForm')">确认注册</el-button>
    </el-row>
  </div>
  </portal-template>
</template>

<script>
import PortalTemplate from "views/User/Login/PortalTemplate";
export default {
  name: "LoginBox",
  components: {
    PortalTemplate
  },
  data() {
    return {
      lab: {
        name:'',
        major:'',
        num:'',
        state:'空闲'
      },
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
          { required: true, message: '请确认密码！', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.user.password) {
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
        ]
      }
    }
  },
  methods: {
    login(userForm) {
      let self = this;
      this.$refs[userForm].validate((valid) => {
        if (valid) {
          self.$store.dispatch('register',
              {username:self.user.username,
                password:self.user.password,
                repassword:self.user.repassword,
                email:self.user.email})
          .then(response => {
            self.$message.success(response.data.message)
            self.$router.replace('/login')
          })
          .catch(response => {
            self.$message.error(response.data.message)
          })
        }
      });
    }
  }
}
</script>

<style scoped>
  .box{
    background-color: rgba(255, 255, 255, .8);
    width: 400px;
    height: 500px;
    border-radius: 5px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50% , -50%);
}
  .title{
    font-size: 35px;
    font-weight: bold;
    box-sizing: border-box;
    text-align: center;
    padding-top: 20px;
  }
  .el-form-item/deep/{
    text-align: center;
  }
  .el-input/deep/{
    width: 70%;
    line-height:60px;
  }
  .el-row/deep/{
    text-align: center;
  }
  .el-button/deep/{
    width: 60%;
    font-size: 15px;
  }
  /deep/.el-input__inner:focus {
    border-color: black;
  }
</style>