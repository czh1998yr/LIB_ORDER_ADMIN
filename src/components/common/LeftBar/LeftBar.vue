<template>
  <div id="left-bar">
    <div class="title">
      <i class="fa fa-home"></i>
      系统功能
    </div>
    <div class="menux" @click="show">
      <p>
        <i class="fa fa-info-circle"></i>
        <i class="fa fa-angle-right point"></i>
        功能名称
      </p>
        <ul><li v-for="item in menux" :key="item.index">{{item}}</li></ul>
    </div>
    <div class="menux" @click="show">
      <p>
        <i class="fa fa-info-circle"></i>
        <i class="fa fa-angle-right point"></i>
        功能名称2
      </p>
      <ul><li v-for="item in menux" :key="item.index">{{item}}</li></ul>
    </div>
    <div class="menux" @click="show">
      <p>
        <i class="fa fa-info-circle"></i>
        <i class="fa fa-angle-right point"></i>
        功能名称3
      </p>
      <ul><li v-for="item in menux" :key="item.index">{{item}}</li></ul>
    </div>
    <div class="menux" @click="show">
      <p>
        <i class="fa fa-info-circle"></i>
        <i class="fa fa-angle-right point"></i>
        功能名称4
      </p>
      <ul><li v-for="item in menux" :key="item.index">{{item}}</li></ul>
    </div>
  </div>
</template>
<script>

export default {
  name: "LeftBar",
  data() {
    return {
      menux:['子功能1','子功能2','子功能3','子功能4'],
    }
  },
  methods: {
    show(e) {
      this.toggle.toggle(e)
    }
  }
}
</script>

<style scoped>
  #left-bar{
    width: 220px;
    background-color: #fff;
    border-right: 1px solid #e1e1e1;

    float: left;
    position: absolute;
    left: 0;
    bottom: 0px;
    top: 100px;
  }
  /*title的样式调整*/
  .title{
    height: 48px;
    line-height: 48px;
    background-color: rgba(245,245,245,.8);
    border-bottom: 1px solid #e1e1e1;

    font-size: 18px;
    color: #333;
    font-weight: bold;
    text-align: center;
  }.title i{
    color: var(--color-tint);
     }
  /*menux中的样式调整*/
  .menux{

  }
  .menux p{
    height: 48px;
    line-height: 48px;
    background-color: rgba(245,245,245,.6);
    border-bottom: 1px solid #e1e1e1;

    font-weight: bold;
    font-size: 16px;
    padding-left: 65px;
  }
  .menux p:hover{
    background-color: var(--color-hover);
    color: #fff;
    cursor: pointer;
  }
  .menux p:hover i{
    color: #fff;
  }
  .menux p i{
    color: var(--color-hover);
  }
  .menux p .point{
    float: right;
    margin-top: 15px;
    margin-right: 10px;
    color: #999 !important;
  }
  .menux ul{
    list-style: none;
    display: none;
  }
  .menux ul li{
    list-style: none;

    height: 36px;
    line-height: 36px;
    border-bottom: 1px dotted #e1e1e1;
    color: #666;
    font-size: 16px;

    padding-left: 50px;
    box-sizing: border-box;
  }
  .menux ul li i{
    color: var(--color-tint);
  }
  .menux ul li:hover{
    background-color: var(--color-lihover);
    color: #fff;
    cursor: pointer;
  }
  .menux ul li:hover i{
    color: #fff;
  }
</style>