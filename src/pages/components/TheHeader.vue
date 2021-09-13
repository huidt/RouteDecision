<template>
  <header>
    <div id="header_tltle" @click="header_reload" title="刷新缓存">
      高速公路应急资源调配系统
    </div>
    <div class="headerDisplay">
      事故点坐标：
      {{ indexTest }}
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    header_reload () {
      setTimeout(() => {
        window.open(window.location.href);
        window.close();
      }, 500);
    }
  },
  computed: {
    indexTest: function () {
      return this.$store.state.markerPos;
    }
  },

};
</script>
<style >
header {
  /* background-color: #b3c0d1; */
  background-color: #d9ecff;
  color: #333;
  /* text-align: center; */
  height: 10vh;
  font-family: "Courier New", Courier, monospace;
}
#header_tltle {
  display: inline-block;
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
  color: #000;
  line-height: 10vh;
  text-align: center;
  padding: 0 10px;
  border-radius: 10px;
  background-color: #c6e2ff;
  border-right: 2px solid rgb(91, 148, 148);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#header_tltle:hover {
  color: #000;
  border-radius: 10px;
  background-color: #a0cfff;
  cursor: pointer;
  font-weight: bolder;
  border-right: 2px solid rgb(91, 148, 148);
}
.headerDisplay {
  font-weight: bold;
  display: inline-block;
  position: fixed;
  line-height: 10vh;
  font-size: 1.1em;
  width: 400px;
  height: 10vh;
  margin-left: 33vw;
  border-radius: 2px;
  text-align: center;
  background-color: #df7777;
  transform: translate(-50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>