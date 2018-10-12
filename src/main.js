import Vue from 'vue'
import App from './App.vue'
// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
// 导入懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  error: require('./assets/img/rulai.png'),
  loading: require('./assets/img/baby.gif'),
  // attempt: 1
})

// 导入放大镜
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// 导入axios
import axios from "axios"
// 把axios放到Vue原型中，这样所有组件都可以使用axios
Vue.prototype.$axios = axios;
// 抽取基地址
axios.defaults.baseURL ="http://111.230.232.110:8899/";

// 路由相关
import VueRouter from 'vue-router'
// 导入index组件
import index from './components/index.vue'
// 导入detail组件
import detail from './components/detail.vue'

Vue.use(VueRouter);
// 写路由
const routes = [
  {
    path:'/',
    component:index
  },
  {
    path:'/index',
    component:index
  },
  {
    path:'/detail/:goodId',
    component:detail
  }
]

// 实例化路由对象
const router = new VueRouter({
  routes
})
// 导入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

Vue.config.productionTip = false
//导入momment 
import moment from "moment";
Vue.filter('beautifyTime', function (value, formatStr){
  return moment(value).format(formatStr);
} )




new Vue({
  render: h => h(App),
  // 挂载到Vue实例
  router,
  // 挂载Vuex
  store
}).$mount('#app')
