<template>
  <div name="mapcontrol">
    <div id="driving_way">
      路径规划策略：
      <select>
        <option value="0">最短距离</option>
        <option value="1">最少时间</option>
        <option value="2">优先高速</option>
        <option value="3">避开拥堵</option>
      </select>
    </div>
    <hr />
    事故点坐标：
    <input type="text" placeholder="请确保输入合法" v-model="pointStr" />
    <br />
    <hr />
    <button @click="calcWarePoint">计算优选仓库</button>
    <hr />

    <ul v-if="clicked">
      <ol
        class="ulol"
        v-for="item in label_distance"
        v-bind:key="item.distance"
      >
        <blockquote>
          {{ item.name }}
          <br />
          行车距离：{{ item.distance }}米
          <br />
          行车时间：{{}}
        </blockquote>
        <br />
        <input
          type="button"
          class="calcroute"
          value="计算路线"
          v-bind:id="item.calcrouteKey"
          @click="calcroute"
        />
        <br /><br />
      </ol>
    </ul>
  </div>
</template> 

<script>
import BMap from 'BaiduMap'

export default {
  data: function () {
    return {
      map: null,
      pointStr: '',
      label_distance: [],
      clicked: false,
      markerArr: [],
      start: new BMap.Point(117.239861, 31.831977),
      end: new BMap.Point(118.779102, 30.942877),
      routePolicy: [
        /**
         * 默认
         * 优先高速
         * 避开高速
         * 避开拥堵
         */
        'BMAP_DRIVING_POLICY_DEFAULT',
        'BMAP_DRIVING_POLICY_FIRST_HIGHWAYS',
        'BMAP_DRIVING_POLICY_AVOID_HIGHWAYS',
        'BMAP_DRIVING_POLICY_AVOID_CONGESTION'
      ],
      selected: ["A"],
      options: [
        { text: "One", value: "A" },
        { text: "Two", value: "B" },
        { text: "Three", value: "C" },
      ],
    };
  },
  /**
   * mounted 在 $nextTick 后执行，主要是由 VueX 把地图以及各个数据拉下来
   * 确保 DOM 更新完成之后再初始化，因为 TheMapControl 和 TheMapComponent 
   * 是兄弟组件，这样才能在 TheMapComponent 更新 VueX 后访问到其中数据
   */
  mounted () {
    this.$nextTick(() => {
      this.map = this.$store.state.map;
      this.pointStr = this.$store.state.markerPos;
      // let arrPointStr = this.pointStr.split(',');

      // 由于使用字符串转换，两个组件中 point 是深拷贝关系
      // 但二者都同从 VueX 得到更新，只需要关注如何触发 VueX 中的 point 更新即可
      // this.point = new BMap.Point(+arrPointStr[0], +arrPointStr[1]);
    })
  },
  watch: {
    // 由更新后的 pointStr 更新 Vuex
    pointStr: function () {
      console.log('输入事故点坐标');

      // 延时防抖
      clearTimeout(timer);
      let timer = setTimeout(() => {
        // let arr = this.pointStr.split(',');
        // this.point = new BMap.Point(+arr[0], +arr[1]);
        this.$store.commit('updateMarkerPos', {
          markerPos: this.pointStr,
        });
      }, 500);
    },

    /**
     * 由更新后的 Vuex 更新 pointStr 和 point
     * 这是一种在组件中监听 VueX 的写法（字符串）
     */
    '$store.state.markerPos' () {
      this.pointStr = this.$store.state.markerPos;
      // let arr = this.pointStr.split(',');
      // this.point = new BMap.Point(+arr[0], +arr[1]);
    }
  },
  methods: {
    calcroute (e) {
      let temp = null;
      switch (e.target.id) {
        case 'result0':
          temp = this.label_distance[0];
          break;
        case 'result1':
          temp = this.label_distance[1];
          break;
        case 'result2':
          temp = this.label_distance[2];
          break;
        default:
          console.log(`default switch `);
      }
      console.log(temp);
      this.end = new BMap.Point(temp.lng, temp.lat);
      let point = this.pointStr.split(',');
      this.start = new BMap.Point(+point[0], +point[1]);
      this.myDrivingRoute();
    },
    myDrivingRoute () {
      console.log("myDrivingRoute执行");
      // selectedIndex 代表 select 当前选中的 option 的 value
      let i = document.getElementById('driving_way').childNodes[1].selectedIndex;
      mySearch.call(this, this.start, this.end, this.routePolicy[i]);

      function mySearch (start, end, routePolicy) {
        let driving = new BMap.DrivingRoute(this.map, {
          renderOptions: {
            map: this.map,
            autoViewport: true
          },
          policy: routePolicy
        }
        );
        driving.search(end, start);
      }
    },
    /**
     * 计算优选仓库
     * 
     */
    calcWarePoint: function () {
      // clicked 为 true 显示列表
      this.clicked = true;
      this.label_distance = [];
      // 从 VueX 中取得仓库坐标（字符串）
      let arr = this.$store.state.wareArr.split(',');
      for (let i = 0; i < arr.length; i++) {
        arr[i] = +arr[i];
      }
      // 临时存储
      // wareArrDistance 存距离
      let wareArrDistance = [],
        // pointArr 存每个仓库简要信息
        pointArr = [],
        // pointNAme 存仓库名，后续用
        pointNAme = [
          '阜阳市救灾物资储备库',
          '蚌埠市救灾物资储备库',
          '六安市救灾物资储备库',
          '池州市救灾物资储备库',
          '涡阳县救灾物资储备库',
          '杜集区救灾物资储备库',
          '灵璧县救灾物资储备库',
          '泗县救灾物资储备库',
          '砀山县救灾物资储备库',
          '萧县救灾物资储备库',
          '临泉县救灾物资储备库',
          '界首市救灾物资储备库',
          '全椒县救灾物资储备库',
          '天长市救灾物资储备库',
          '金寨县救灾物资储备库',
          '霍邱县救灾物资储备库',
          '含山县救灾物资储备库',
          '无为县救灾物资储备库',
          '枞阳县救灾物资储备库',
          '石台县救灾物资储备库',
          '桐城市救灾物资储备库',
          '望江县救灾物资储备库',
          '休宁县救灾物资储备库',
          '祁门县救灾物资储备库',
          '歙县救灾物资储备库',
          '淮北市救灾物资储备库',
          '蚌埠市救灾物资储备库',
          '寿县救灾物资储备库',
          '阜南县救灾物资储备库',
          '铜陵市救灾物资储备库',
          '宣城市救灾物资储备库',
          '合肥市救灾物资储备库'
        ];

      // *************************************************************************
      // *************************************************************************
      // *************************************************************************
      // *************************************************************************
      // 计算每个仓库的距离，arr 中是每个仓库的信息，
      // 在 TheMapComponent 将仓库信息作为字符串存入 store
      for (let i = 0; arr.length != 0; i++) {
        let lng = +arr.shift();
        let lat = +arr.shift();
        let point = new BMap.Point(lng, lat);
        let pointTemp = this.pointStr.split(',');
        pointTemp = new BMap.Point(+pointTemp[0], +pointTemp[1]);
        let distance = this.map.getDistance(point, pointTemp).toFixed(2);

        /**
         * DrvingRoute demo
         */
        let drving_route_demo = "";
        let transit = new BMap.DrivingRoute(this.map, {
          renderOptions: {
            map: this.map
          },
          onSearchComplete: function (results) {
            if (transit.getStatus() != 'BMAP_STATUS_SUCCESS') {
              return;
            }
            var plan = results.getPlan(0);
            drving_route_demo += plan.getDuration(true) + "\n"; //获取时间
            drving_route_demo += "总路程为：";
            drving_route_demo += plan.getDistance(true) + "\n"; //获取距离
            console.log(drving_route_demo);
          },
        });
        // *************************************************************************
        // *************************************************************************
        // *************************************************************************
        // *************************************************************************
        // *************************************************************************

        wareArrDistance.push(distance);
        let obj = {
          'lng': lng,
          'lat': lat,
          'distance': distance,
          'name': pointNAme.shift()
        };
        pointArr.push(obj);
      }
      wareArrDistance.sort((a, b) => { return a - b });
      // 取最近的三个仓库
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < pointArr.length; j++) {
          if (wareArrDistance[i] === pointArr[j].distance) {
            pointArr[j].calcrouteKey = 'result' + i;
            this.label_distance.push(pointArr[j]);
          }
        }
      }
      // 顺便标出三个点，并计划路线
      this.addOverLayWarePoint();
    },
    addOverLayWarePoint: function () {
      for (let i = 0; this.markerArr.length !== 0; i++) {
        this.map.removeOverlay(this.markerArr.shift())
      }
      // 强制刷新缓存
      // window.location.reload();
      console.log('标记最近仓库');
      // let tempArr = window.overlayMarkerArr;
      for (let i = 0; i < this.label_distance.length; i++) {
        let myIcon = new BMap.Icon("https://ythdong.gitee.io/blog_image/Vue/pointArr.png",
          new BMap.Size(25, 25), {
        });
        let point = new BMap.Point(this.label_distance[i].lng, this.label_distance[i].lat);
        let marker = new BMap.Marker(point, { icon: myIcon });
        this.map.addOverlay(marker);
        this.markerArr.push(marker);
      }
      // this.DrivingRoute();
    },
  },
  computed: {
  }
};

</script>

<style >
div[name="mapcontrol"] {
  border-radius: 8px;
  margin-top: 30px;
}
button {
  font-size: 1em;
}
hr {
  margin: 10px 0;
}
.resource_choose {
  background-color: #fafafa;
}
.submit_label {
  margin: 10px 0;
  background-color: #fafafa;
}
.show_label {
  margin: 10px 0;
  background-color: #fafafa;
}
.test {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: rgb(73, 8, 8);
}
.resource_label {
  background-color: aqua;
}
input,
select {
  border: 1px yellow solid;
  width: inherit;
  font-size: 1em;
  /* display: inline-block; */
}
blockquote {
  border-radius: 2px;
  border: 2px solid #cfe2eb;
  background-color: #a4c2d1;
  margin: 1px;
  display: inline-block;
}
</style>





// let drving_route_demo = "";
//         let transit = new BMap.DrivingRoute(this.map, {
//           renderOptions: {
//             map: this.map
//           },
//           onSearchComplete: function (results) {
//             if (transit.getStatus() != 'BMAP_STATUS_SUCCESS') {
//               console.log('getStatus failed');
//               return;
//             }
//             var plan = results.getPlan(0);
//             drving_route_demo += plan.getDuration(true) + "\n"; //获取时间
//             drving_route_demo += "总路程为：";
//             drving_route_demo += plan.getDistance(true) + "\n"; //获取距离
//             console.log(drving_route_demo);
//           },
//         });
//         transit.search(point, pointTemp);