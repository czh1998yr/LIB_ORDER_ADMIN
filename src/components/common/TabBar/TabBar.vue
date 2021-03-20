<template>
  <div id="tab-bar">
    <div class="title">
      实验室管理系统
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
  #tab-bar{
    height: 100px;
    background-color: var(--color-tint);
  }
  .title{
    color: #fff;
    font-size: 45px;
    line-height: 100px;
    font-weight: bold;
    margin-left: 100px;
  }
</style>