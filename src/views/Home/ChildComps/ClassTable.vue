<template>
  <div id="class-table">
    <div class="title">桂林电子科技大学信息科技学院2020-2021学年下学期学生课程表</div>
    <div class="form">
      <table>
        <thead><tr>
        <th v-for="item in Day" :key="item">{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">
          <td>
            <p class="period">{{ lesson }}</p>
          </td>
          <td v-for="(courses, courseIndex) in classTableData.courses" :key="courseIndex">
            {{classTableData.courses[courseIndex][lessonIndex] || '-'}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassTable",
  data() {
    return {
      Day:['','星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
      classTableData: {
        lessons: [
          '0102',
          '0304',
          '0506',
          '0708',
          '0910',
          '11',
          '12',
        ],
        courses: [
          ['生物', '物理', '化学', '政治', '历史', '英语', '', '语文'],
          ['语文', '数学', '英语', '历史', '', '化学', '物理', '生物'],
          ['生物', '', '化学', '政治', '历史', '英语', '数学', '语文'],
          ['语文', '数学', '英语', '历史', '政治', '', '物理', '生物'],
          ['生物', '物理', '化学', '', '历史', '英语', '数学', '语文'],
          ['语文', '数学', '英语', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ]
      }
    }
  }
}
</script>

<style scoped>
  #class-table{}
  .title{
    text-align: center;
    font-size: 35px;
    font-weight: 700;
    color: var(--color-tint);
  }
  .form table{
    width: 80%;
    margin-left: 150px;
  }
  .form table th{
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
  .form table tr{
    height: 75px;
    font-weight: 700;
    text-align: center;
    font-size: 20px;
  }
  .form table th,tr,td{
    border: 1px solid var(--color-tint);
  }
</style>