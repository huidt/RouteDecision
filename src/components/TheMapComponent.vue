<template>
  <div id="container"></div>
</template>

<script>
import BMap from 'BaiduMap'

export default {
  data () {
    return {
      map: null,
      accidentMaker: null,
      // point: null,
      pointStr: '117.234303, 31.828682',
      wareArr: '115.821011,32.896061,117.392351,32.922251,116.538456,31.724767,117.497882,30.670977,116.226781,33.540204,116.884604,33.978942,117.555898,33.560279,117.921896,33.489259,116.352214,34.432629,116.950167,34.190101,115.316232,33.028451,115.361931,33.254885,118.288394,32.10512,118.951639,32.793509,115.941016,31.732725,116.282523,32.317529,118.107749,31.741722,117.908938,31.310016,117.257046,30.712261,117.492681,30.21678,116.943528,31.04123,116.713238,30.133966,118.200112,29.790946,117.72368,29.860845,118.42146,29.867541,116.84533,33.941807,117.37833,32.945961,116.787955,32.52329,115.60269,32.665374,117.79778,30.959037,118.765821,30.945239,117.295821,31.963916',
      // [
      //   115.821011, 32.896061, // 阜阳市救灾物资储备库
      //   117.392351, 32.922251, // 蚌埠市救灾物资储备库
      //   116.538456, 31.724767, // 六安市救灾物资储备库
      //   117.497882, 30.670977, // 池州市救灾物资储备库
      //   116.226781, 33.540204, // 涡阳县救灾物资储备库
      //   116.884604, 33.978942, // 杜集区救灾物资储备库
      //   117.555898, 33.560279, // 灵璧县救灾物资储备库
      //   117.921896, 33.489259, //  泗县救灾物资储备库 
      //   116.352214, 34.432629, // 砀山县救灾物资储备库
      //   116.950167, 34.190101, //  萧县救灾物资储备库 
      //   115.316232, 33.028451, // 临泉县救灾物资储备库
      //   115.361931, 33.254885, // 界首市救灾物资储备库
      //   118.288394, 32.10512, // 全椒县救灾物资储备库
      //   118.951639, 32.793509, // 天长市救灾物资储备库
      //   115.941016, 31.732725, // 金寨县救灾物资储备库
      //   116.282523, 32.317529, // 霍邱县救灾物资储备库
      //   118.107749, 31.741722, // 含山县救灾物资储备库
      //   117.908938, 31.310016, // 无为县救灾物资储备库
      //   117.257046, 30.712261, // 枞阳县救灾物资储备库
      //   117.492681, 30.21678, // 石台县救灾物资储备库
      //   116.943528, 31.04123, // 桐城市救灾物资储备库
      //   116.713238, 30.133966, // 望江县救灾物资储备库
      //   118.200112, 29.790946, // 休宁县救灾物资储备库
      //   117.72368, 29.860845, // 祁门县救灾物资储备库
      //   118.42146, 29.867541, //  歙县救灾物资储备库 
      //   116.84533, 33.941807, // 淮北市救灾物资储备库
      //   117.37833, 32.945961, // 蚌埠市救灾物资储备库
      //   116.787955, 32.52329, //  寿县救灾物资储备库 
      //   115.60269, 32.665374, // 阜南县救灾物资储备库
      //   117.79778, 30.959037, // 铜陵市救灾物资储备库
      //   118.765821, 30.945239, // 宣城市救灾物资储备库
      //   117.295821, 31.963916, // 合肥市救灾物资储备库
      // ],
      overlayMarkerArr: [],
    }
  },
  /**
   * mounted 阶段初始化map
   * 同步 VueX 
   */
  mounted () {
    this.map = new BMap.Map('container');
    // 对地图的一些设置
    this.mapSetConfig();
    // vuex 第一次同步当前地图和事故点
    this.$store.commit('receiveMap', {
      map: this.map
    });
    this.$store.commit('updateMarkerPos', {
      // 非正常 初始化 就一次
      markerPos: this.pointStr
    });
    this.markerSetConfig();
  },
  watch: {
    // 监测 pointStr 拖动
    pointStr: function () {
      this.$store.commit('updateMarkerPos', {
        markerPos: this.pointStr
      });
    },
    // 由更新的 Vuex 更新 pointStr和point
    '$store.state.markerPos' () {
      this.pointStr = this.$store.state.markerPos;
      this.map.removeOverlay(this.accidentMaker);
      let strTemp = this.pointStr.split(',');
      let point = new BMap.Point(+strTemp[0], +strTemp[1]);
      this.accidentMaker = new BMap.Marker(point, {
        icon: new BMap.Icon("https://ythdong.gitee.io/blog_image/Vue/accident.png",
          new BMap.Size(25, 25), {
        })
      });
      this.map.addOverlay(this.accidentMaker);
      this.accidentMaker.enableDragging(); // 标注可拖拽
      this.accidentMaker.addEventListener("dragend", (e) => {
        this.pointStr = e.point.lng + ", " + e.point.lat;
        console.log('拖动事故点');
      });
    }
  },
  methods: {
    mapSetConfig () {
      // 缩放
      this.map.enableScrollWheelZoom(true);
      // 异步加载地图样式
      this.getJSON();
      let top_right_map_type_control = new BMap.MapTypeControl({
        offset: new BMap.Size(10, 5),
        anchor: 'BMAP_ANCHOR_TOP_RIGHT'
      });
      // 添加控件
      this.map.addControl(top_right_map_type_control);
    },
    initWare () {
      this.$store.commit('updateWareArr', {
        wareArr: this.wareArr
      });
      // wareArr 是字符串，否则难以响应式，其他组件从 VueX 取得 wareArr 后还需加工
      // 仓库初始化
      // 为什么打开页面时这里 data 中的 wareArr 还没初始化？
      let arr = this.wareArr.split(',');
      for (let i = 0; arr.length != 0; i++) {
        let myIcon = new BMap.Icon("https://ythdong.gitee.io/blog_image/Vue/warehouse.png",
          new BMap.Size(25, 25), {
        });
        let point = new BMap.Point(+arr.shift(), +arr.shift());
        let marker = new BMap.Marker(point, { icon: myIcon });
        this.map.addOverlay(marker);
        // this.map.removeOverlay(marker);
        this.overlayMarkerArr.push(marker);
      }
      // 把 overlayMarkerArr 传到 TheMapControl 组件中去
      // window.overlayMarkerArr = this.overlayMarkerArr;
    },
    markerSetConfig () {
      let strTemp = this.$store.state.markerPos.split(',');
      // 事故点根据 VueX 初始化，VueX存的只是字符串
      let point = new BMap.Point(+strTemp[0], +strTemp[1]);
      this.map.centerAndZoom(point, 9);
      // 事故点图标
      let marker = new BMap.Marker(point, {
        icon: new BMap.Icon("https://ythdong.gitee.io/blog_image/Vue/accident.png",
          new BMap.Size(25, 25), {
        })
      });
      this.accidentMaker = marker;
      this.map.addOverlay(this.accidentMaker);

      this.accidentMaker.enableDragging(); // 标注可拖拽
      this.accidentMaker.addEventListener("dragend", (e) => {
        // 应不应该选择在这里更新 pointStr ？
        this.pointStr = e.point.lng + ", " + e.point.lat;
        // let x = e.point.lng; // 经度
        // let y = e.point.lat; // 纬度

        // // 拖动事故点，更新 point
        // // point 的变化触发 watch 中的函数，触发 VueX 的 commit
        // this.point = new BMap.Point(x, y);
        console.log('拖动事故点');
      });

      this.initWare();
    },
    async getJSON () {

      let url = window.location.href;
      url = url + '/style_config.json';
      try {
        let response_style_json = await fetch(url);
        this.map.setMapStyle(response_style_json);
      } catch (error) {
        console.log('没找到样式文件', error);
      }
    },
  },

}
</script>

<style>
#container {
  height: 100%;
  width: 100%;
  background-color: rgb(120, 169, 201);
}
</style>
