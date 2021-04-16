<template>
  <div class="option">
    <div class="center">
      <div>
        <span class="demonstration">请选择实验室:</span>
        <el-input
            :disabled="true"
            :placeholder="chooseName"
            style="width: 200px; padding-left: 17px">
        </el-input>
      </div>
      <div>
        <span class="demonstration">请选择起止时间:</span>
        <el-date-picker
            v-model="value1"
            end-placeholder="结束日期"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div>
        <span class="demonstration">请选择预约节数:</span>
        <el-time-picker
            v-model="value1"
            :picker-options="{
            selectableRange: '18:30:00 - 20:30:00'}"
            placeholder="任意时间点">
        </el-time-picker>
        <el-time-picker
            arrow-control
            v-model="value2"
            :picker-options="{
            selectableRange: '18:30:00 - 20:30:00'}"
            placeholder="任意时间点">
        </el-time-picker>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "OrderOption",
  props: {
    chooseName: String
  },
  data() {
    return {
      value1: '',
      value2: '',
    };
  }
}
</script>

<style scoped>
.center {
  line-height: 80px;
}

.demonstration {
  padding: 0 50px 0 0;
}
</style>