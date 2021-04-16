<template>

  <el-dialog
      :title="title"
      :visible.sync="showDialog"
      width="35%"
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
          <el-form-item label="请选择起止日期:" prop="value1">
            <el-date-picker
                v-model="center.value1"
                type="daterange"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>

          <el-form-item label="请选择预约时间:" prop="value2">
            <el-time-picker
                v-model="center.value2"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                range-separator=""
                format="HH:mm"
                value-format="HH:mm:ss"
                :is-range="true">
            </el-time-picker>
          </el-form-item>
          {{center.value1}}
          {{center.value2}}
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
import qs from "qs";
import { publicMethod } from "@/common/PublicMethod";
export default {
  name: "Popup",
  data() {
    return{
      // 控制弹出框显示隐藏
      showDialog:false,
      title:'实验室预约',

      center: {
        value1: '',
        value2: '',
      },
      username: this.$store.getters.getUser,
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
      },
      //限制当天之前的日期不可选
      pickerOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
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
          console.log(self.starttime);
          console.log(self.endtime);
          self.starttime=publicMethod.getTimestamp(self.center.value1[0] + ' '+self.center.value2[0])
          self.endtime=publicMethod.getTimestamp(self.center.value1[1] + ' ' + self.center.value2[1])
          self.axios.post('/order',qs.stringify({username:self.username,
            labname:self.chooseName,
            starttime:self.starttime,endtime:self.endtime}))
          .then(function (response) {
            self.$message.success(response.data.message)
            console.log(response);
            self.showDialog = false
          }).catch(err =>{
            console.log(response+'失败');
          })
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