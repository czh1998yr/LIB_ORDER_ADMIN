<template>
  <div id="aboutme">
    <div class="head">
      Admin的个人主页
    </div>
    <div class="message">
    <table>
      <th>基本信息</th>
      <tr>
        <td>Admin
          教授
          研究生导师</td>
      </tr>
      <tr>
        <td>本科学科：管理学
          研究生学科：管理学
          工作单位：XXXXX大学</td>
      </tr>
      <th>联系方式</th>
      <tr>
        <td>通信地址：广西壮族自治区桂林市灵川县</td>
      </tr>
      <tr>
        <td>电子邮箱：123456789@qq.com</td>
      </tr>
      <tr>
        <td>联系电话：15XXXX12345</td>
      </tr>
      <tr>
        <td>办公地点：桂林电子科技大学信息科技学院11201办公室</td>
      </tr>
      <th>个人简介：</th>
        <tr>
        <td>研究成果申请/授权国家发明专利25/15项，并开展工业生物技术转化。中国化工学会会员、《日用化学工业》杂志编委、四川省科技青年联合会理事。荣获德国BASF-Excellent Scholarship、四川省学术与技术带头人后备人选、西南交通大学青年教师教学竞赛一等奖、唐立新优秀教师奖、唐立新优秀学者奖。指导学生获得全国大学生“挑战杯”科技竞赛省级一等奖/国家级三等奖、四川省“生命之星”科技邀请赛特等奖/一等奖、成都市创新创业大赛三等奖。</td>
        </tr>
    </table>
      <div class="about-img">
        <img src="~assets/img/about-img.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyDate"
}
</script>

<style scoped>
  #aboutme{
    background-color: #f8f8f8;
    height: 100%;
  }
  .head{
    background: url("~assets/img/head.jpg") no-repeat;
    height: 25%;
    text-align: center;

    line-height: 200px;
    color: var(--color-tint);
    font-size: 35px;
    font-weight: 700;
  }
  .message{
    width: 1650px;
    background-color: #fff;
    height: 70%;
  }
  .message table{
    width: 650px;
    line-height:30px;
    position: relative;
    top:10%;
    left: 15%;
    font-size: 20px;
  }
  .message table th{
    text-align:left;
  }
  .about-img{
    position: absolute;
    bottom: 15%;
    left: 65%;
  }
</style>