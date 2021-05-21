import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
// 完整引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

Vue.use(ElementUI);

Vue.config.productionTip = false
// 阻止生成提示

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')