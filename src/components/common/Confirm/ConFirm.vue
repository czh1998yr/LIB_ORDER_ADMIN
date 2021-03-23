<template>
  <div class="ConFirm"  v-show="isShowToast">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "ConFirm",
  data() {
    return {
      message: '',
      isShowToast: false
    }
  },
  methods: {
    show(message,time) {
      this.isShowToast = true;
      this.message = message;
      setTimeout(() => {
        this.isShowToast = false;
        this.message = message;
      },time)
    }
  }
}
</script>

<style scoped>
.ConFirm{
  font-size: 15px;
  color: #fff;
  padding: 10px 10px;
  z-index: 999;
  background-color: rgba(0,0,0,0.9);
  transform: translate(-50%,-50%);
  position: fixed;
  left: 50%;
  top: 50%;
}
</style>
