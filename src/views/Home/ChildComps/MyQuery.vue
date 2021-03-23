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
        </tbody>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyQuery"
}
</script>

<style scoped>
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
button{
  background-color: var(--color-tint);
  border:none;
  border-radius: 5px;
  color: #fff;
  padding: 5px;
  margin:0px 20px 0px 20px;
  box-shadow: 2px 2px 5px #AAAAAA;
}
.query-query tbody{
  float: right;
  position: absolute;
  top: 40px;
  left: 10%;
}
.query-query tbody td{
  padding: 0px 20px 0px 20px;
}
</style>