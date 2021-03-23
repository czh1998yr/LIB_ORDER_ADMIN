<template>
  <div id="left-bar">
    <div class="title">
      <i class="fa fa-home"></i>
      系统菜单
    </div>
    <div class="menux"><p>
      <i class="fa fa-info-circle">
      </i><i class="fa fa-angle-right point"></i>首页
    </p>
      <ul>
        <router-link to="/home/aboutme">
          <li>个人信息</li>
        </router-link>
      </ul>
    </div>
    <div class="menux">
      <p>
      <i class="fa fa-info-circle">
      </i><i class="fa fa-angle-right point"></i>系统功能
    </p>
      <ul>
        <router-link to="/home/course">
          <li>课程表信息</li>
        </router-link>
        <router-link to="/home/query">
          <li>实验室查询</li>
        </router-link>
        <router-link to="/home/order">
          <li>实验室预约</li>
        </router-link>
        <router-link to="/home/myorder">
          <li>我的预约</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  name: "LeftBar",
  data() {
    return {
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
  .menux a{
    text-decoration:none
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
    /*display: none;*/
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