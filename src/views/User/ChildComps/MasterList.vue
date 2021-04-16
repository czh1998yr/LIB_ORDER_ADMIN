<template>
  <div id="masterlist">
    <div class="title">实验室实时状态查询</div>
    <div class="content">
      <table>
        <thead>
        <tr>
          <th v-for="item in thName" :key="item.index">{{item}}</th>
        </tr>
        </thead>
      <tbody>
      <tr v-for="(list,index) in masterinfo" :key="index">
        <td v-for="(td,tdindex) in list" :key="tdindex">{{td}}</td>
      </tr>
      </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "MasterList",
  data() {
    return {
      thName:['序号','实验室名称','实验室号','星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
      masterinfo:{


      }
    }
  }
}
</script>

<style scoped>
  #masterlist{
    background-color: #fff;
    height: 80%;
  }
  .title{
    text-align: center;
    font-size: 35px;
    font-weight: 700;
    color: var(--color-tint);
  }
  .content table{
    width: 80%;
    margin-left: 150px;
  }
  .content th{
    background-color: var(--color-tint);
    color: #fff;
    height: 40px;
    line-height: 40px;
    font-weight: 700;
    text-align: center;
    font-size: 20px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
  .content td{
    height: 20px;
  }
  .content table th,tr,td{
    border: 1px solid var(--color-tint);
  }
  .handle{
    text-align: center;
  }
  button{
    background-color: var(--color-tint);
    border:none;
    color: #fff;
    padding: 1px;
    margin:0px 20px 0px 20px;
  }
</style>