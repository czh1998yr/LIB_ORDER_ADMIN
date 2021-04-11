<template>
  <div class="option">
    <div class="center">
      <div>
        <span class="demonstration">请选择实验室:</span>
        <el-input
            :placeholder="chooseName"
            :disabled="true"
        style="width: 200px; padding-left: 17px">
        </el-input>
      </div>
      <div>
        <span class="demonstration">请选择起止时间:</span>
        <el-date-picker
            v-model="value1"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span class="demonstration">请选择预约节数:</span>
        <el-select v-model="value2" multiple placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value">
          </el-option>
          <p style="text-align: center; color: darkgrey;">如果预约多节、可直接多选</p>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "OrderOption",
  props: {
    chooseName:String
  },
  data() {
    return {
      value1: '',
      value2: '',
      options: [{
        value: '一、二节',
      }, {
        value: '三、四节',
      }, {
        value: '五、六节',
      }, {
        value: '七、八节',
      }, {
        value: '九、十节',
      }],
    };
  }
}
</script>

<style scoped>
.center{
  line-height: 80px;
}
.demonstration{
  padding: 0 50px 0 0;
}
</style>