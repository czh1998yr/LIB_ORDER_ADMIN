<template>
  <div id="myorder">
    <div class="head">
      <div class="left"></div>
      <div class="center">我的预约</div>
      <div class="right"></div>
    </div>
    <div class="content">
    </div>
  </div>
</template>

<script>
export default {
  name: "MyOrder"
}
</script>

<style scoped>
#myorder{
  background-color: #f8f8f8;
  height: 100%;
}
.head{
  background-color: #fff;
  text-align: center;
  line-height: 100px;
  display: flex;
}
.left,.right{
  width: 200px;
}
.left{
  background: url("~assets/img/aboutbarimg.png") no-repeat;
  background-size: 80% 80%;
}
.right{
  background: url("~assets/img/aboutbarimg.png") no-repeat;
  transform: rotateY(180deg);
  background-size: 80% 80%;
}
.center{
  flex: 1;
  color: var(--color-tint);
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 2px;
}
.content{
  background-color: #FFF;
  height: 85%;
  margin-top: 10px;
  display: flex;
  line-height: 50px;
}
</style>