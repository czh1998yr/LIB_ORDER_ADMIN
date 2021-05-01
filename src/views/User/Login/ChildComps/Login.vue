<template>
  <portal-template>
    <div class="login">
      <el-form ref="userForm"
               :model="user"
               :rules="rules"
               class="login_from"
               label-width="80px">
        <div class="title">实验室管理系统</div>
        <el-form-item label-width="0px" prop="username">
          <el-input v-model="user.username"
                    autofocus
                    class="username"
                    name="username"
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-user-solid"/>
        </el-form-item>
        <el-form-item label-width="0px" prop="password">
          <el-input v-model="user.password"
                    class="password"
                    name="password"
                    placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                    show-password/>
        </el-form-item>
      </el-form>
      <div class="register-link">
        <div>
          <el-button type="success" @click="login('userForm')">确认
          </el-button>
        </div>
        <!--      <router-link to="/register">-->
        <!--        <el-link icon="el-icon-edit" type="success">注册新用户</el-link>-->
        <!--      </router-link>-->
        <router-link to="/admin_login">
          <el-link icon="el-icon-s-custom" type="success">管理员入口</el-link>
        </router-link>
      </div>
    </div>
  </portal-template>
</template>

<script>
import PortalTemplate from "views/User/Login/PortalTemplate";

import  jwt  from  'jsonwebtoken'
import qs from 'qs'

export default {
  name: "Login",
  components: {
    PortalTemplate
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        token: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    login(userForm) {
      let self = this;
      this.$refs[userForm].validate((valid) => {
        if (valid) {
          self.axios.post('/login/user',qs.stringify({username: self.user.username, password: self.user.password}))
          .then( res => {
            let result = res.data;
            if (result.code === 200) {
              //获取token及用户信息
              const token = result.data
              //解析token中的信息
              let str = jwt.decode(token)
              const user = str.username;
              //保持token在sessionStorage中
              window.sessionStorage.setItem("token", token)
              /*存储至vuex*/
              self.$store.dispatch('setUser',user)
              //登陆成功信息
              self.$message.success(result.message)
              self.$router.replace('/home')
            } else {
              self.$message.error(result.message)
            }
          })
        }
      });
    }
  }
}
</script>

<style scoped>
.login {
  background-color: rgba(255, 255, 255, .8);
  width: 400px;
  height: 350px;
  border-radius: 5px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.title {
  font-size: 35px;
  font-weight: bold;
  box-sizing: border-box;
  text-align: center;
  padding-top: 20px;
}

.login_from {
  padding: 0 60px;
  line-height: 70px;
}

.el-button {
  width: 50%;
  font-size: 15px;
  margin: 0 auto;
}

.el-row /deep/ {
  text-align: center;
}

/deep/ .el-input__inner:focus {
  border-color: black;
}

/deep/ .el-form-item {
  padding-top: 20px;
}

a {
  text-decoration: none;
}

.register-link {
  text-align: center;
}
</style>