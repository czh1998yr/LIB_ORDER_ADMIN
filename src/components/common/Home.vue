<template>
  <el-container class="home_container">
<!--    头部区域-->
    <el-header>
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="center">
        <slot name="center"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </el-header>
    <el-container>
<!--      侧边栏-->
      <el-aside width="200px">
        <slot name="aside"></slot>
      </el-aside>
<!--      主体区-->
      <el-main>
        <slot name="main"></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>
.home_container{
  height: 100%;
}
.el-header{
  height: 100px !important;
  background-color: var(--color-tint);
  display: flex;
  line-height: 100px;
}
.left, .right {
  width: 600px;
}

.center {
  flex: 1;
}

.left {
  text-align: center;
}

.right {
  text-align: center;
}

.el-aside{
  width: 220px !important;
  background-color: #fff;
  border-right: 1px solid #e1e1e1;
}
.el-main{
  background-color: #f8f8f8;
}
</style>