<template>
  <div name="mapcontrol">
    <div id="driving_way">
      路径规划策略：
      <el-select clearable v-model="value" placeholder="请选择">
        <el-option
          v-for="item in option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
      <!-- <select>
        <option value="1">最少时间</option>
        <option value="0">最短距离</option>
        <option value="2">优先高速</option>
        <option value="3">避开拥堵</option>
      </select> -->
    </div>
    <hr />
    <div class="huihuihui">
      物资需求量：{{ reourseNum }}
      <el-input
        type="text"
        placeholder="请输入合法内容"
        v-model="reourseNum"
        clearable
      >
      </el-input>
      <!-- <input type="text" placeholder="请输入合法整数" v-model="reourseNum" /> -->
      <br />
      事故点坐标：
      <el-input type="text" placeholder="请确保输入合法" v-model="pointStr">
      </el-input>
      <!-- <input type="text" placeholder="请确保输入合法" v-model="pointStr" /> -->
      <br />
      <el-button type="primary" plain @click="calcWarePoint"
        >计算优选仓库</el-button
      >
    </div>

    <hr />

    <ul v-if="clicked">
      <ol
        class="ulol"
        v-for="item in label_distance"
        v-bind:key="item.distance"
      >
        <blockquote>
          {{ item.name }}：存量 {{ item.wareResNum }}
          <br />
          直线距离：{{ item.lineDistance }}米
          <br />
          行车距离：{{ item.distance }}
          <br />
          行车时间：{{ item.time }}
        </blockquote>
        <el-button
          type="success"
          class="calcroute"
          v-bind:id="item.calcrouteKey"
          @click="calcroute"
          plain
          >计算路线
        </el-button>
        <!-- <input
          type="button"
          class="calcroute"
          value="计算路线"
          v-bind:id="item.calcrouteKey"
          @click="calcroute"
        /> -->
      </ol>
    </ul>

    <TheDemo></TheDemo>
  </div>
</template> 

<script>
import BMap from 'BaiduMap'
import TheDemo from './TheDemo'

export default {
  components: {
    TheDemo
  },
  data: function () {
    return {
      option: [
        {
          selected: 'selected',
          value: '2',
          label: '优先高速'
        },
        {
          value: '1',
          label: '最少时间'
        },
        {
          value: '0',
          label: '最短距离'
        },
        {
          value: '3',
          label: '避开拥堵',
          disabled: true
        }],
      form_staus: 1,
      value: '',
      // **********************************
      // **********************************
      // **********************************
      map: null,
      temp: null,
      reourseNum: 1000,
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
      let result_id = e.srcElement.parentElement.id || e.target.id;
      console.log(result_id);
      switch (result_id) {
        case 'result0':
          this.temp = this.label_distance[0];
          break;
        case 'result1':
          this.temp = this.label_distance[1];
          break;
        case 'result2':
          this.temp = this.label_distance[2];
          break;
        case 'result3':
          this.temp = this.label_distance[3];
          break;
        case 'result4':
          this.temp = this.label_distance[4];
          break;
        case 'result5':
          this.temp = this.label_distance[5];
          break;
        case 'result6':
          this.temp = this.label_distance[6];
          break;
        case 'result7':
          this.temp = this.label_distance[7];
          break;
        case 'result8':
          this.temp = this.label_distance[8];
          break;
        case 'result9':
          this.temp = this.label_distance[9];
          break;
        case 'result10':
          this.temp = this.label_distance[10];
          break;
        case 'result11':
          this.temp = this.label_distance[11];
          break;
        case 'result12':
          this.temp = this.label_distance[12];
          break;
        case 'result13':
          this.temp = this.label_distance[13];
          break;
        case 'result14':
          this.temp = this.label_distance[14];
          break;
        case 'result15':
          this.temp = this.label_distance[15];
          break;
        case 'result16':
          this.temp = this.label_distance[16];
          break;
        case 'result17':
          this.temp = this.label_distance[17];
          break;
        case 'result18':
          this.temp = this.label_distance[18];
          break;
        case 'result19':
          this.temp = this.label_distance[19];
          break;
        case 'result20':
          this.temp = this.label_distance[20];
          break;
        case 'result21':
          this.temp = this.label_distance[21];
          break;
        case 'result22':
          this.temp = this.label_distance[22];
          break;
        case 'result23':
          this.temp = this.label_distance[23];
          break;
        case 'result24':
          this.temp = this.label_distance[24];
          break;
        case 'result25':
          this.temp = this.label_distance[25];
          break;
        case 'result26':
          this.temp = this.label_distance[26];
          break;
        case 'result27':
          this.temp = this.label_distance[27];
          break;
        case 'result28':
          this.temp = this.label_distance[28];
          break;
        default:
          console.log(`default switch `);
      }
      this.end = new BMap.Point(this.temp.lng, this.temp.lat);
      let point = this.pointStr.split(',');
      this.start = new BMap.Point(+point[0], +point[1]);
      this.myDrivingRoute();
      // ***********************************************************
      // ***********************************************************
      // ***********************************************************
      // ***********************************************************
      let transit = new BMap.DrivingRoute(this.map, {
        renderOptions: {
          map: this.map
        },
        onSearchComplete: (results) => {
          let plan = results.getPlan(0);
          // 好的设计不应该在此处动态添加响应式 property 
          // vm.$set 是全局 Vue.set 的别名
          this.$set(this.temp, 'time', plan.getDuration(true));
          this.$set(this.temp, 'distance', plan.getDistance(true));
        },
      });
      transit.search(this.start, this.end);
      // ***********************************************************
      // ***********************************************************
      // ***********************************************************
      // ***********************************************************
      setTimeout(() => {
        this.element_UI_open();
      }, 1000);
    },
    element_UI_open () {
      this.$notify({
        title: '成功',
        message: '规划路线成功',
        type: 'success',
        duration: 700
      });
    },
    myDrivingRoute () {
      console.log("myDrivingRoute执行");
      // selectedIndex 代表 select 当前选中的 option 的 value
      let i = document.getElementById('driving_way').childNodes[1].selectedIndex;
      console.log(i);
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
    async element_UI_open2 () {
      function mytemp () {
        console.log(this);
        this.$confirm('此操作将开始计算优选仓库，请确认输入合法?', '提示', {
          confirmButtonText: '开始计算',
          cancelButtonText: '放弃计算',
          type: 'warning'
        }).then(() => {

          this.clicked = true;
          this.$message({
            type: 'success',
            message: '计算成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消计算'
          });
        });
      }
      await mytemp.call(this);
    },
    /**
     * 计算优选仓库
     * 
     */
    calcWarePoint: function () {

      this.element_UI_open2();

      // clicked 为 true 显示列表
      // this.clicked = true;
      // 每次计算前都初始化
      this.label_distance = [];
      // 从 VueX 中取得仓库坐标（字符串）
      let arr = this.$store.state.wareArr.split(',');
      // 临时存储
      // wareArrDistance 存距离
      let wareArrDistance = [],
        // pointArr 存每个仓库简要信息
        pointArr = [],
        // pointNAme 存仓库名，后续用
        pointNAme = [
          '淮北仓储站（淮北市烈山区京台高速与东外环路交叉路口东侧）',
          '淮北仓储站（安徽省淮北市濉溪县）',
          '亳州东仓储站（安徽省亳州市谯城区）',
          '涡阳东仓储站（安徽省亳州市涡阳县）',
          '宿州仓储站（安徽省宿州市埇桥区宿州(外环南路西)）',
          '宿州东仓储站（安徽省宿州市埇桥区东(宿州大道东)）',
          '界首仓储站（安徽省阜阳市界首市）',
          '阜阳南仓储站（安徽省阜阳市颍州区G105(京珠线)）',
          '淮南东仓储站（安徽省淮南市大通区东(蚌淮高速公路西)）',
          '安丰仓储站（安徽省淮南市寿县瓦埠湖）',
          '郑蒲港仓储站（安徽省马鞍山市和县）',
          '当涂仓储站（马鞍山市当涂县宁芜高速）',
          '林头仓储站（安徽省马鞍山市含山县）',
          '双墩仓储站（安徽省合肥市长丰县）',
          '肥东仓储站（安徽省合肥市肥东县G3(京台高速)）',
          '蜀山仓储站（合肥市蜀山区铁笛路(合肥汽车客运西站东北侧约150米)）',
          '金寨仓储站（安徽省六安市金寨县金寨(红军大道东)）',
          '霍山仓储站（安徽省六安市霍山县迎宾大道）',
          '长集仓储站（六安市霍邱县济广高速）',
          '芜湖仓储站（安徽省芜湖市鸠江区G5011(芜合高速)）',
          '铜陵南仓储站（安徽省铜陵市郊区大通镇京台高速公路(铜陵)）',
          '横埠仓储站（安徽省铜陵市枞阳县）',
          '宿松仓储站（安徽省安庆市宿松县G50(高界高速)）',
          '怀宁仓储站（安徽省安庆市怀宁县金拱镇沪渝高速公路）',
          '宣城北高速仓储站（昭亭北路与S32宣铜高速出口交叉口北200米）',
          '广德东仓储站（安徽省宣城市广德市东(太极大道南)）',
          '黄山仓储站（安徽省黄山市休宁县黄山(京台高速公路)）',
          '谭家桥仓储站（安徽省黄山市黄山区谭家桥(205国道西)）',
          '三阳仓储站（安徽省黄山市歙县三阳(杭徽高速公路北)）'
        ];
      // 计算每个仓库的距离，arr 中是每个仓库的信息，
      // 在 TheMapComponent 将仓库信息作为字符串存入 store
      for (let i = 0; arr.length != 0; i++) {
        let lng = +arr.shift();
        let lat = +arr.shift();
        let point = new BMap.Point(lng, lat);
        let pointTemp = this.pointStr.split(',');
        pointTemp = new BMap.Point(+pointTemp[0], +pointTemp[1]);
        let distance = this.map.getDistance(point, pointTemp).toFixed(2);
        let wareResNum = this.$store.state.wareResNumArr[i];
        wareArrDistance.push(distance);
        let obj = {
          'lng': lng,
          'lat': lat,
          'wareResNum': wareResNum,
          'lineDistance': distance,
          'name': pointNAme.shift()
        };
        pointArr.push(obj);
      }
      wareArrDistance.sort((a, b) => { return a - b });
      let wareResNumSum = 0;
      for (let i = 0; wareResNumSum < this.reourseNum; i++) {
        for (let j = 0; j < pointArr.length; j++) {
          if (wareArrDistance[i] === pointArr[j].lineDistance) {
            pointArr[j].calcrouteKey = 'result' + i;
            this.label_distance.push(pointArr[j]);
            wareResNumSum += pointArr[j].wareResNum;
          }
        }
      }
      // 顺便标点，并计划路线
      this.addOverLayWarePoint();

      // this.$message('这是一条消息提示');
    },
    addOverLayWarePoint: function () {
      for (let i = 0; this.markerArr.length !== 0; i++) {
        // 移除之前的
        this.map.removeOverlay(this.markerArr.shift())
      }
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
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  border-radius: 8px;
  position: relative;
  overflow: scroll;
  overflow-x: hidden;
  background-color: #c6e2ff;
  height: 87vh;
  padding-top: 15px;
}
#driving_way {
  position: relative;
  left: 50%;
  display: inline-block;
  transform: translate(-50%);
}
.huihuihui {
  margin-left: 2px;
  position: relative;
  left: 50%;
  display: inline-block;
  transform: translate(-50%);
}
/* button {
  font-size: 1em;
} */
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
  background-color: #f2f6fc;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  display: block;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.ulol {
  position: relative;
}
.calcroute {
  margin-bottom: 5px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
</style>