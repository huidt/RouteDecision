<template>
  <el-button plain @click="open"> 刷新缓存 </el-button>
  <!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
</template>

<script>
export default {
  methods: {
    open1 () {
      this.$notify({
        title: '刷新缓存',
        message: '规划路线成功',
        type: 'success'
      });
    },
    open () {
      this.$confirm('此操作将刷新缓存，清空当前数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => {
          window.open(window.location.href);
          window.close();
        }, 500);

        this.$message({
          type: 'success',
          message: '刷新缓存成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刷新'
        });
      });
    }
  }
}
</script>

<style>
</style>