<template>
  <portal-template>
    <div class="login">
      <div class="title">实验室管理系统</div>
      <el-form ref="userForm"
               :model="user"
               :rules="rules"
               label-width="80px">
        <el-form-item prop="username">
          <el-input v-model="user.username"
                    autofocus
                    class="username"
                    name="username"
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-user-solid"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password"
                    class="password"
                    name="password"
                    placeholder="请输入密码"
                    show-password
                    prefix-icon="el-icon-lock"/>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button type="success"
                   @click="login('userForm')">确认
        </el-button>
      </el-row>
      <div class="register-link">
        <router-link to="/register">
          <el-link icon="el-icon-edit" type="success">注册新用户</el-link>
        </router-link>
      </div>
    </div>
  </portal-template>
</template>

<script>
import PortalTemplate from "@/views/Login/PortalTemplate";

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
        // action:'login'
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
          self.$store.dispatch('login', {username:self.user.username, password: self.user.password})
              .then(response => {
                console.log(response);
                self.$message.success(response.data.message)
                console.log(response);
                self.$router.replace('/home')
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
.login {
  background-color: rgba(255, 255, 255, .8);
  position: fixed;
  top: 30%;
  bottom: 30%;
  left: 38%;
  right: 38%;
  border-radius: 5px;
}

.title {
  font-size: 35px;
  font-weight: bold;
  box-sizing: border-box;
  text-align: center;
  margin-top: 20px;
}

.el-form-item /deep/ {
  text-align: center;
  margin-top: 20px;
}

.el-input /deep/ {
  width: 70%;
  line-height: 60px;
  margin-left: -80px;
}

.el-row /deep/ {
  text-align: center;
  margin-top: 30px;
}

.el-button /deep/ {
  width: 60%;
  font-size: 15px;
}

/deep/ .el-input__inner:focus {
  border-color: black;
}

a {
  text-decoration: none;
}

.register-link {
  text-align: center;
  margin-top: 20px;
}
</style>