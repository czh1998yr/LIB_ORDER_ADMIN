<template>
  <div id="course">
    <div class="course-title">
      课程表信息
    </div>
    <div class="course-query">
      学期查询：
      <select class="select">
        <option value="opel">请选择</option>
        <option value ="volvo">2020-2021学年下学期</option>
        <option value ="saab">2020-2021学年上学期</option>
      </select>
      <div class="course-button">
        <button>查询</button>
        <button>清空</button>
      </div>
    </div>
    <div class="class-table">
    <class-table></class-table>
    </div>
  </div>
</template>

<script>
import ClassTable from "@/views/Home/ChildComps/ClassTable";
export default {
  name: "Course",
  components: {
    ClassTable
  }
}
</script>

<style scoped>
  .course-title{
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
  .course-query{
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
    background-color: #fff;
  }
  select{
    width: 200px;
    margin-left: 150px;
  }
  .course-button{
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
  .class-table{
    margin-top: 10px;
    top: 5%;
    height: 730px;
    background-color: #fff;
    border: 2px solid var(--color-tint);
    overflow: hidden;
  }
</style>