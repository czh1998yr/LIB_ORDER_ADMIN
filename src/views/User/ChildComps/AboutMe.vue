<template>
  <div id="aboutme">
    <div class="head">
      <div class="left"></div>
      <div class="center">{{username}}的个人主页</div>
      <div class="right"></div>
    </div>
    <div class="message">
      <div class="m-left">
        <el-table
            :data="tableData"
            stripe>
          <el-table-column
              prop="username"
              label="基本信息"
              width="100">
          </el-table-column>
          <el-table-column
              prop="edgback"
              width="100">
          </el-table-column>
          <el-table-column
              prop="workunit"
              width="300">
          </el-table-column>
        </el-table>

        <el-table
            :data="tableData"
            stripe>
          <el-table-column
              prop="emil"
              label="联系方式"
              width="220">
          </el-table-column>
          <el-table-column
              prop="cell"
              width="220">
          </el-table-column>
        </el-table>
        <el-form label-position="top">
          <el-form-item label="个人简介">
          <el-input v-model="brief" type="textarea" autosize style="font-size: 18px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="m-right">
        <img src="~assets/img/about-img.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutMe",
  data() {
    return {
      tableData: [{
        username: this.$store.getters.getUsername,
        edgback: '研究生',
        workunit:'毕业学校：'+'桂林电子科技大学信息科技学院',
        emil:'邮箱：'+'1553059156@qq.com',
        cell:'手机号：'+'15777725003',
      }],
      brief:'或许外表给人的感觉是这个女孩有点文静，其实不然，生活上我比较乐观积极，热爱体育运动篮球、乒乓球，喜欢文学作品和看电影，喜欢涂鸦，能够和身边的同学朋友打成一片。大家说我看起来每天都充满热情和活力，我一直希望自己能够慢慢成为一个有独立见解的人，所以当有想法时，我就会周密计划，然后在实践中积累经验，也给自己多增添一份经历。'
    }
  },
  computed: {
    username() {
      return this.$store.getters.getUsername
    }
  }
}
</script>

<style scoped>
#aboutme{
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
.message{
  background-color: #FFF;
  height: 85%;
  margin-top: 10px;
  display: flex;
  line-height: 50px;
}
.m-left{
  width: 50%;
  height: 100%;
  padding-left: 200px;
}
.m-right img{
  margin-top: 100px;
  margin-left: 100px;
}

</style>