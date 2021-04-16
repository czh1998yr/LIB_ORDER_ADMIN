<template>
  <div id="lab-list">
    <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="序号"
      prop="labid">
      </el-table-column>
        <el-table-column
            label="实验室名称"
            prop="labname">
      </el-table-column>
      <el-table-column
          label="实验室编号"
          prop="labnum">
      </el-table-column>
      <el-table-column
          label="实验室状态"
          prop="labstate">
      </el-table-column>
      <el-table-column
          label="操作">
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">预约</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "LabList",
  props: {
    lablist: {
      type:Array,
      default() {
        return []
      }
    }
  }, data() {
    return {
      tableData: this.lablist,
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
}
</script>

<style scoped>

</style>