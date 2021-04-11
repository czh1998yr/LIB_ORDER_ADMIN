<template>
  <div class="nav-bar">
    <div class="left">
      欢迎使用实验室排课系统
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <el-dropdown class="user">
      <span class="el-dropdown-link">
        <i class="el-icon-user-solid"></i>
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    username() {
      return this.$store.getters.getUsername
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.nav-bar {
  height: 100px;
  line-height: 100px;
  background-color: var(--color-tint);
  display: flex;
}

.left, .right {
  width: 400px;
}

.center {
  flex: 1;
}

.left {
  line-height: 100px;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  letter-spacing: 3px;
}

.right {
  text-align: center;
}

.el-dropdown-link /deep/ {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
</style>