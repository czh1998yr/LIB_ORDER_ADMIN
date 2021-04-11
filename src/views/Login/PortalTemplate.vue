<template>
  <div id="portal-template">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "portal-template",
}
</script>

<style scoped>
  #portal-template{
    background-image: url("~assets/img/login.jpg");
    background-repeat: no-repeat;
    height: 100%;
    background-size: 100% 100%;
  }
</style>