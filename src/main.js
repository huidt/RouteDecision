import Vue from 'vue'
import App from './App.vue'
import store from './store/index'


Vue.config.productionTip = false
// 阻止生成提示

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')