<template>
  <div id="query">
    <div class="query-title">
      实验室查询
    </div>
    <div class="query-query">
      学期查询：
        <tbody>
          <td>编号：<input type="text" placeholder="请输入实验室号进行查询"></td>
          <td>专业：
            <select class="select">
              <option value="opel">请选择</option>
            </select>
          </td>
          <td>
            节数：
            <select class="select">
              <option value="opel">请选择</option>
            </select>
          </td>
        </tbody>
      <div class="query-button">
        <button>查询</button>
        <button>清空</button>
      </div>
    </div>
    <div class="master-list">
      <master-list>
        <button slot="handle">跳转预约</button>
      </master-list>
    </div>
  </div>
</template>

<script>
import MasterList from "@/views/User/ChildComps/MasterList";
export default {
  name: "MyQuery",
  components: {
    MasterList
  }
}
</script>

<style scoped>
  #query{
    height: 90%;
  }
.query-title{
  height: 30px;
  background-color: var(--color-tint);
  margin-top: 10px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;

  color: #fff;
  font-size: 18px;
  padding-left: 20px;
  font-weight: bold;
  line-height: 30px;
}
.query-query{
  height: 40px;
  padding-left: 20px;
  line-height: 40px;
  background-color: #fff;
}
input{
  width: 200px;
}
select{
  width:200px
}
.query-button{
  float: right;
  margin-right: 100px;
  letter-spacing:30px;
}
/*  .query-button button{*/
/*  background-color: var(--color-tint);*/
/*  border:none;*/
/*  border-radius: 5px;*/
/*  color: #fff;*/
/*  padding: 5px;*/
/*  margin:0px 20px 0px 20px;*/
/*  box-shadow: 2px 2px 5px #AAAAAA;*/
/*}*/
.query-query tbody{
  float: right;
  position: absolute;
  top: 40px;
  left: 10%;
}
.query-query tbody td{
  padding: 0px 20px 0px 20px;
}
/*.master-list{*/
/*  width: 1650px;*/
/*  margin-top: 10px;*/
/*  top: 5%;*/
/*  height: 730px;*/
/*  background-color: #fff;*/
/*  !*border: 2px solid var(--color-tint);*!*/
/*  !*overflow: hidden;*!*/
/*}*/

</style>