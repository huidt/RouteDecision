import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    map: null,
    markerPos: '',
    wareArr: null,
    wareResNumArr:
        [
            39,     // 淮北仓储站
            666,    // 淮北仓储站
            63,     // 亳州东仓储站
            760,    // 涡阳东仓储站
            600,    // 宿州仓储站
            657,    // 宿州东仓储站
            103,    // 界首仓储站
            640,    // 阜阳南仓储站
            662,    // 淮南东仓储站
            14,     // 安丰仓储站
            473,    // 郑蒲港仓储站
            110,    // 当涂仓储站
            760,    // 林头仓储站
            435,    // 双墩仓储站
            438,    // 肥东仓储站
            227,    // 蜀山仓储站
            205,    // 金寨仓储站
            60,     // 霍山仓储站
            77,     // 长集仓储站
            514,    // 芜湖仓储站
            521,    // 铜陵南仓储站
            266,    // 横埠仓储站
            303,    // 宿松仓储站
            417,    // 怀宁仓储站
            329,    // 宣城北高速仓储站
            212,    // 广德东仓储站
            261,    // 黄山仓储站
            463,    // 谭家桥仓储站
            154,    // 三阳仓储站
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
