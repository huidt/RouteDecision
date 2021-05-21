import Vue from 'vue';
import Vuex from 'vuex';

// 安装插件 https://cn.vuejs.org/v2/api/#Vue-use
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
// 其中的方法只能进行同步操作，且方法名只能全局唯一
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

// 创建并导出store对象
export default new Vuex.Store({
    state,
    mutations,
    // 操作行为处理模块。负责处理Vue Components接收到的所有交互行为。
    // 包含同步、异步操作，支持多个同名方法，按照注册的顺序依次触发。
    // 向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。
    // 该模块提供了Promise的封装，以支持action的链式触发。
    actions: {},
    modules: {}
})
