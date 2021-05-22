<template>
  <div name="mapcontrol">
    <div id="driving_way">
      路径规划策略：
      <el-select
        clearable
        id="driving_way_input"
        v-model="value"
        placeholder="请选择"
      >
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
      <el-button
        id="calcWarePointButton"
        class="calcWareButton"
        type="primary"
        plain
        @click="calcWarePoint"
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
          <svg
            t="1621652305879"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2233"
            width="16"
            height="16"
          >
            <path
              d="M512 295.6L201.9 485.2l8.5 354.7h76.5L280 508.6h464l-7 331.3h76.6l8.5-354.7z"
              fill="#1296db"
              p-id="2234"
            ></path>
            <path
              d="M155.5 462.5L512 244.6l356.4 217.9 27.8-43.6L512 184.1 127.8 418.9z"
              fill="#1296db"
              p-id="2235"
            ></path>
            <path
              d="M676.9 839.6H347c-16 0-29-13-29-29s13-29 29-29h330c16 0 29 13 29 29s-13 29-29.1 29z"
              fill="#1296db"
              p-id="2236"
            ></path>
            <path
              d="M697.5 733.8H326.4c-12 0-21.8-9.7-21.8-21.8s9.7-21.8 21.8-21.8h371.2c12 0 21.8 9.7 21.8 21.8s-9.8 21.8-21.9 21.8z"
              fill="#1296db"
              p-id="2237"
            ></path>
            <path
              d="M676.9 642.4H347c-16 0-29-13-29-29s13-29 29-29h330c16 0 29 13 29 29s-13 29-29.1 29z"
              fill="#1296db"
              p-id="2238"
            ></path>
          </svg>
          {{ item.name }}：
          <svg
            t="1621652015747"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="801"
            id="mx_n_1621652015748"
            width="16"
            height="16"
          >
            <path
              d="M790.272 190.72h-28.586667v-53.504c0-30.378667-23.210667-53.504-53.504-53.504H583.168c-30.378667 0-53.504 23.210667-53.504 53.504v53.504H301.141333L129.792 420.949333v430.165334c0 50.005333 39.253333 89.258667 89.258667 89.258666H790.186667c50.005333 0 89.258667-39.253333 89.258666-89.258666V279.978667c0-48.213333-39.253333-89.258667-89.173333-89.258667z m-189.269333-35.669333h89.258666v35.669333H601.002667v-35.669333zM808.106667 851.114667"
              fill="#3A78E9"
              p-id="802"
            ></path>
            <path
              d="M529.664 395.946667l-25.002667-23.210667-25.002666 25.002667c-19.626667 19.626667-123.136 123.136-123.136 196.352 0 82.090667 66.048 149.930667 148.138666 149.930666S652.8 676.181333 652.8 594.090667c0-74.922667-103.509333-178.432-123.136-198.144z m-25.002667 274.944"
              fill="#BDE0FF"
              p-id="803"
            ></path></svg
          >存量 {{ item.wareResNum }}
          <br />
          <svg
            t="1621652346827"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2821"
            width="16"
            height="16"
          >
            <path
              d="M171.240049 718.68079l137.569214 137.58343 56.835973-56.835974-137.583429-137.583429 74.86199-74.86199 136.275548 136.275548 56.835973-56.835974-136.275548-136.275548 73.411948-73.397731 188.44864 188.44864 56.835973-56.835973-188.44864-188.44864 74.193833-74.193834 135.792201 135.777985 56.835973-56.835974-135.7922-135.777984 72.075634-72.075634L874.453721 378.148297l56.835974-56.835973L749.949105 139.971734l83.135761-83.135761L776.248893 0 7.925477 768.323416l56.835973 56.835974 106.478599-106.4786zM860.138107 868.063584v35.11377H163.861893v-35.11377H7.925477v155.936416h155.936416V988.872013h696.276214v35.127987h155.936416V868.063584H860.138107z"
              p-id="2822"
              fill="#1296db"
            ></path>
          </svg>
          直线距离：{{ item.lineDistance }}米
          <br />
          <svg
            t="1621652388821"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4902"
            width="16"
            height="16"
          >
            <path
              d="M256.948148 786.962963m-66.37037 0a66.37037 66.37037 0 1 0 132.740741 0 66.37037 66.37037 0 1 0-132.740741 0Z"
              p-id="4903"
              fill="#1296db"
            ></path>
            <path
              d="M786.488889 786.962963m-66.37037 0a66.37037 66.37037 0 1 0 132.74074 0 66.37037 66.37037 0 1 0-132.74074 0Z"
              p-id="4904"
              fill="#1296db"
            ></path>
            <path
              d="M594.962963 170.666667H199.111111c-62.862222 0-113.777778 50.915556-113.777778 113.777777v471.703704c0 11.757037 9.576296 21.333333 21.333334 21.333333h55.94074c4.740741-47.881481 45.226667-85.333333 94.340741-85.333333s89.6 37.451852 94.340741 85.333333h243.674074c11.757037 0 21.333333-9.576296 21.333333-21.333333v-564.148148c0-11.757037-9.576296-21.333333-21.333333-21.333333zM748.562963 360.296296H656.118519c-11.757037 0-21.333333 9.576296-21.333334 21.333334v374.518518c0 11.757037 9.576296 21.333333 21.333334 21.333333h36.029629c4.740741-47.881481 45.226667-85.333333 94.340741-85.333333s89.6 37.451852 94.340741 85.333333h36.029629c11.757037 0 21.333333-9.576296 21.333334-21.333333V549.925926c0-104.296296-85.333333-189.62963-189.62963-189.62963zM872.296296 545.185185H701.62963V412.444444h37.925926c73.007407 0 132.740741 59.733333 132.74074 132.740741z"
              p-id="4905"
              fill="#1296db"
            ></path>
          </svg>

          行车距离：{{ item.distance }}
          <br />
          <svg
            t="1621652417648"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6202"
            width="16"
            height="16"
          >
            <path
              d="M512 512m-477.866667 0a477.866667 477.866667 0 1 0 955.733334 0 477.866667 477.866667 0 1 0-955.733334 0Z"
              fill="#35A4EF"
              p-id="6203"
            ></path>
            <path
              d="M512.375467 204.8c26.589867 0 48.128 21.538133 48.128 48.128v279.210667a48.128 48.128 0 0 1-96.256 0V252.928c0-26.589867 21.572267-48.128 48.128-48.128z"
              fill="#38D8FF"
              p-id="6204"
            ></path>
            <path
              d="M731.477333 761.4464a31.1296 31.1296 0 0 1-45.056 0l-202.752-212.6848a34.235733 34.235733 0 0 1 0-47.274667 31.1296 31.1296 0 0 1 45.056 0l202.752 212.6848c12.629333 13.243733 12.629333 34.030933 0 47.274667z"
              fill="#38D8FF"
              p-id="6205"
            ></path>
            <path
              d="M448.273067 512a68.266667 63.726933 90 1 0 127.453866 0 68.266667 63.726933 90 1 0-127.453866 0Z"
              fill="#5FE3FF"
              p-id="6206"
            ></path>
          </svg>

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
      let btn = document.getElementById('calcWarePointButton');
      btn.addEventListener('click', () => {
        let tempInput = document.getElementById('driving_way_input');
        if (tempInput.value == "") {
          this.$message(
            {
              showClose: true,
              duration: 2000,
              message: '请先选择路径规划策略！'
            }
          )
        }
      })
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
        this.$confirm('此操作将开始计算优选仓库，请确认输入合法？', '提示', {
          confirmButtonText: '开始计算',
          cancelButtonText: '放弃计算',
          type: 'warning'
        }).then(() => {
          // clicked 为 true 显示列表
          this.clicked = true;
          this.$message({
            type: 'success',
            message: '计算成功！'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消计算！'
          });
        });
      }
      await mytemp.call(this);
    },
    /**
     * 计算优选仓库
     */
    calcWarePoint: function () {
      let tempInput = document.getElementById('driving_way_input');
      if (tempInput.value !== "") {
        // let btn = document.getElementById('calcWarePointButton');
        // btn.removeEventListener('mouseover', this);
        document.getElementById('calcWarePointButton').disabled = false;
        // this.$message('请先选择路径规划策略！');
      } else {
        return undefined;
      }
      this.element_UI_open2();
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
  /* overflow: scroll; */
  overflow-x: hidden;
  background-color: #c6e2ff;
  height: 87vh;
  padding-top: 15px;
  /* text-align: center; */
}
#driving_way {
  position: relative;
  left: 50%;
  display: inline-block;
  transform: translate(-50%);
  /* text-align: center; */
}
.huihuihui {
  margin-left: 2px;
  position: relative;
  left: 50%;
  display: inline-block;
  transform: translate(-50%);
  /* text-align: center; */
  margin-right: 2px;
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
.calcWareButton {
}
#calcWarePointButton > span {
}
</style>