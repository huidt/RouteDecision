import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    map: null,
    markerPos: '',
    wareArr: null,
    wareResNumArr:
        [
            39,     // 阜阳市救灾物资储备库
            666,    // 蚌埠市救灾物资储备库
            63,     // 六安市救灾物资储备库
            760,    // 池州市救灾物资储备库
            600,    // 涡阳县救灾物资储备库
            657,    // 杜集区救灾物资储备库
            103,    // 灵璧县救灾物资储备库
            640,    // 泗县救灾物资储备库 
            662,    // 砀山县救灾物资储备库
            14,     // 萧县救灾物资储备库 
            473,    // 临泉县救灾物资储备库
            110,    // 界首市救灾物资储备库
            760,    // 全椒县救灾物资储备库
            435,    // 天长市救灾物资储备库
            438,    // 金寨县救灾物资储备库
            227,    // 霍邱县救灾物资储备库
            205,    // 含山县救灾物资储备库
            60,     // 无为县救灾物资储备库
            77,     // 枞阳县救灾物资储备库
            514,    // 石台县救灾物资储备库
            521,    // 桐城市救灾物资储备库
            266,    // 望江县救灾物资储备库
            303,    // 休宁县救灾物资储备库
            417,    // 祁门县救灾物资储备库
            329,    // 歙县救灾物资储备库 
            212,    // 淮北市救灾物资储备库
            261,    // 蚌埠市救灾物资储备库
            463,    // 寿县救灾物资储备库 
            154,    // 阜南县救灾物资储备库
            8,      // 铜陵市救灾物资储备库
            512,    // 宣城市救灾物资储备库
            1000,    // 合肥市救灾物资储备库
        ],
}
const mutations = {
    receiveMap (state, temp) {
        state.map = temp.map;
    },
    updateMarkerPos (state, temp) {
        state.markerPos = temp.markerPos;
    },
    // 仓库坐标不需更改，所以不需要该 mutation
    updateWareArr (state, temp) {
        state.wareArr = temp.wareArr;
    },
}
export default new Vuex.Store({
    state,
    mutations,
    actions: {},
    modules: {}
})
