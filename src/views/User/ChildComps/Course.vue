<template>
  <div id="course">
    <div class="head">课程表信息</div>
    <div class="query">
      <div class="left">
        学期查询：
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="center"></div>
      <div class="right">
        <el-button type="success">查询</el-button>
        <el-button type="success">清空</el-button>
      </div>
    </div>
    <div class="course-table">
    <class-table>
      <p slot="title">课程表信息</p>
    </class-table>
    </div>
  </div>
</template>

<script>
import ClassTable from "@/views/User/ChildComps/ClassTable";

export default {
  name: "Course",
  components: {
    ClassTable
  },
  data() {
    return {
          options: [{
            value: '选项1',
            label: '2020-2021学年上学期'
          },
            {
              value: '选项2',
              label: '2020-2021学年下学期'
            }],
          value: ''
    }
  },
  methods:{
  }
}
</script>

<style scoped>
  #course{
    height: 90%;
  }
  .head{
    margin-top: 10px;
    background-color: var(--color-tint);
    height: 30px;
    line-height: 30px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    padding-left: 20px;
  }
  .query{
    background-color: #fff;
    text-align: center;
    line-height: 40px;
    display: flex;
  }
  .left,.right{
    width:300px;
  }
  .center{
    flex: 1;
  }
  .el-select/deep/{
    width: 200px;
  }
  button{
    border:none;
    color: #fff;
    padding: 8px;
    margin:0px 20px 0px 20px;
  }
  .course-table{
    background-color: #FFF;
    height: 99%;
    margin-top: 10px;
    line-height: 50px;
  }
</style>