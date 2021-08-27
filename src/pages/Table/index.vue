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

    async getWareHousePoi () {
      try {
        let url = 'http://yapi.smart-xwork.cn/mock/90376/api/RouteDecision/getWareHousePoi'
        await fetch(url).then(function (res) {
          if (!res.ok) {
            throw new Error('HTTP error, status = ' + res.status);
          }
          return res.json();
        })
      } catch (err) {
        console.log(err);
      }

    }
  }
}
</script>

<style scoped>
el-table {
  background-color: #ecf5ff;
}
</style>