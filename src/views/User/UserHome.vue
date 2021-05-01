<template>
  <home>
    <!--    头部内容-->
    <div class="title" slot="left">
      欢迎使用实验室预约系统(教师端)
    </div>
    <div class="right" slot="right">
      <span class="nowdate">{{dateFormat(date)}}</span>
      <el-dropdown class="user">
        <span class="el-dropdown-link">
        <i class="el-icon-user-solid"></i>
        {{ username }}
         <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="uppwddialogVisible = true">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--      侧边栏内容-->
    <div class="aside" slot="aside">
      <el-menu :default-openeds="['1', '2']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-s-custom"></i>首页</template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><router-link to="/home/welcome">欢迎页</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>系统功能</template>
          <el-menu-item-group>
            <el-menu-item index="2-2">
              <router-link to="/home/order">实验室预约</router-link>
            </el-menu-item>
            <el-menu-item index="2-3  ">
              <router-link to="/home/myorder">我的预约</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <!--    主体内容-->
    <div class="main" slot="main">
      <el-dialog
          title="修改密码"
          :visible.sync="uppwddialogVisible"
          width="30%"
          :close-on-click-modal="false">
        <el-form label-width="80px"
                 :model="user"
                 :rules="rules"
                 ref="userForm">
          <el-form-item prop="username" label-width="0px">
            <el-input name="username"
                      placeholder="请输入用户名"
                      v-model.trim="username"
                      prefix-icon="el-icon-user-solid"
                      :disabled="true"/>
          </el-form-item>
          <el-form-item prop="email" label-width="0px">
            <el-input name="email"
                      placeholder="请输入申请时绑定的电子邮箱"
                      v-model.trim="user.email"
                      prefix-icon="el-icon-message"/>
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
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="uppwddialogVisible = false">取 消</el-button>
    <el-button type="success" @click="uppwd('userForm')">确 定</el-button>
  </span>
      </el-dialog>
      <router-view></router-view>
    </div>
<!--    对话框区域-->
  </home>
</template>

<script>
import Home from "components/common/Home";
import qs from "qs";

export default {
  name: "UserHome",
  data() {
    return {
      date:new Date(),
      uppwddialogVisible:false,
      user: {
        username:'',
        password:'',
        email:'',
      },
      rules:{
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
      }
    }
  },
  components: {
    Home
  },
  computed: {
    username() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.replace('/logout')
    },
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      * */
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    },
    uppwd(userForm) {
      self = this
      self.$refs[userForm].validate((valid) => {
        if (valid) {
          self.axios.post('/uppwd',qs.stringify({username:self.username,password:self.user.password,
            repassword:self.user.repassword,email:self.user.email}))
          .then(res => {
            if (res.data.code === 500203){
              self.$message.error(res.data.message)
            }else {
              self.uppwddialogVisible = false
              self.$message.success('密码修改成功，请牢记！')
            }
          })
          .catch(err => {

          })
        }
      });
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
.title{
  color: #fff;
  font-weight: bold;
  font-size: 25px;
  letter-spacing:2px;
}
.el-dropdown-link /deep/ {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
/*menux中的样式调整*/
a{
  width:100%;
  display: block;
  text-decoration:none;
  color: #333333;
  font-size: 15px;
  padding-left: 40px;
}

a:hover{
  cursor: pointer;
}
.aside ul{
  padding: 0px;
}
.aside li{
  padding: 0px !important;
}
.aside i{
  color: var(--color-tint);
}
.nowdate{
  padding: 0 20px 0 0px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
</style>