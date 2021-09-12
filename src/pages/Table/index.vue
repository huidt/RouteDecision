<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="cid" label="编号" width="180"> </el-table-column>
    <el-table-column prop="cname" label="名称" width="180"> </el-table-column>
    <el-table-column prop="caddr" label="地址"> </el-table-column>
    <el-table-column prop="cposi" label="坐标"> </el-table-column>
    <el-table-column prop="cres" label="余量"> </el-table-column>
  </el-table>
</template>

<script>
import { $hPost } from '../../../server/global';
export default {
  data () {
    return {
      tableData: undefined
    }
  },
  created () {
    this.getWareHousePoi();
  },
  methods: {
    getWareHousePoi () {
      $hPost('getWareHousePoi', { customerID: '19980914' }).then(res => {
        this.tableData = res.data;
      });
    },
  }
}
</script>

<style scoped>
el-table {
  background-color: #ecf5ff;
}
</style>