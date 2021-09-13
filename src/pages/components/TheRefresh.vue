<template>
  <el-button plain @click="reLoad">
    <i class="iconfont">&#xe629;</i>
    刷新缓存
  </el-button>
</template>

<script>
export default {
  methods: {
    reLoad () {
      this.$confirm('此操作将刷新缓存，清空当前数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          location.reload()
          this.$notify({
            title: '刷新缓存',
            message: '规划路线成功',
            type: 'success',
          })
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消刷新',
          })
        })
    },
  },
}
</script>

<style scoped>
.el-button {
  text-align: center;
  font-size: 16px;
}
.el-button :hover {
  text-align: center;
}
@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/font_2691722_26tyi08qnda.ttf?t=1630081620741")
    format("truetype");
}
@font-face {
  font-family: "iconfont-hover";
  src: url("//at.alicdn.com/t/font_2691722_a9wrwy7g3vl.ttf?t=1630082551420")
    format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
}

.iconfont:hover {
  font-family: "iconfont-hover" !important;
  font-size: 16px;
  font-style: normal;
}
</style>
