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
  height: 10vh;
  background: #495961;
  font-family: "Courier New", Courier, monospace;
}
#header_tltle {
  display: inline-block;
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
  color: #232627;
  line-height: 9.5vh;
  text-align: center;
  padding: 0 10px;
  border-radius: 10px;
  background-color: #a2bcc9;
  border-right: 4px solid rgb(91, 148, 148);
}
#header_tltle:hover {
  color: #edf1dc;
  border-radius: 10px;
  background-color: #607480;
  cursor: pointer;
}
.headerDisplay {
  display: inline-block;
  position: fixed;
  line-height: 10vh;
  font-size: 1.1em;
  width: 400px;
  height: 10vh;
  margin-left: 33vw;
  border-radius: 2px;
  text-align: center;
  background-color: #a2bcc9;
  transform: translate(-50%);
}
</style>