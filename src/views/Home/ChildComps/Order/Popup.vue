<template>

  <el-dialog
      :title="title"
      :visible.sync="showDialog"
      width="30%"
      @close="handleClose">


<!--内容区域-->
      <div class="center">
        <el-form :rules="rules"  ref="ruleForm" :model="center">
        <div>
          <span class="demonstration">请选择实验室:</span>
          <el-input
              v-model="chooseName"
              :placeholder="chooseName"
              :disabled="true"
              style="width: 200px; padding-left: 17px">
          </el-input>
        </div>
        <div>
          <el-form-item label="请选择起止时间:" prop="value1">
            <el-date-picker
                v-model="center.value1"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>

          <el-form-item label="请选择预约节数:" prop="value2">
            <el-select v-model="center.value2" multiple placeholder="请选择">
              <el-option
                  v-for="item in center.options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
              </el-option>
              <p style="text-align: center; color: darkgrey;">如果预约多节、可直接多选</p>
            </el-select>
          </el-form-item>

        </div>

        <div style="margin-top: -20px">
            <span style="  padding: 0 50px 0 10px">预约人:</span>
            <el-input
                v-model="username"
                :placeholder="username"
                :disabled="true"
                style="width: 200px; padding-left: 17px">
            </el-input>
          </div>
        </el-form>
      </div>


    <span slot="footer" class="dialog-footer">
      <el-row>
      <el-button  type="success" @click="showDialog = false" plain>取消</el-button>
      <el-button type="success" @click="sumbit('ruleForm')">确定</el-button>
      </el-row>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: "Popup",
  data() {
    return{
      // 控制弹出框显示隐藏
      showDialog:false,
      title:'实验室预约',

      center: {
        value1: [],
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
      },
      username: this.$store.getters.getUsername,
      starttime:'',
      endtime:'',

      rules: {
        value1: [
          {
            type: 'array',
            required: true,
            message: '请选择日期区间',
            fields: {
              //tpye类型试情况而定,所以如果返回的是date就改成date
              0: { type: 'string', required: true, message: '请选择开始日期' },
              1: { type: 'string', required: true, message: '请选择结束日期' }
            }
          }
        ],
        value2: [
          { required: true,
            type: 'array',
            message: '请至少选择一个预约节数'}
        ],
      }
    }
  },
  props:{
    show: {
      type: Boolean,
      default: false
    },
    chooseName:String
  },
  methods:{
    // 弹出框关闭后触发
    handleClose(){
      // 子组件调用父组件方法，并传递参数
      this.$emit('changeShow','false')
    },
    sumbit(ruleForm) {
      let self = this
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.starttime = this.center.value1[0],
          this.endtime = this.center.value1[1]
        } else {
        self.$message.error('提交失败，请正确输入预约信息！！')
          return false;
        }
      });
    }
  },
  watch:{
    // 监听 addOrUpdateVisible 改变
    show(oldVal,newVal){
      this.showDialog = this.show
    },
  }
}
</script>

<style scoped>
.center{
  line-height: 100px;
}
.demonstration{
  padding: 0 10px 0 10px;
}
</style>