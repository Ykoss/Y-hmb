import Vue from "vue";
import App from "./App.vue";
// import "./assets/cavars.js";
// 导入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 导入iview
import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(iView);
// 导入懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  error: require("./assets/img/rulai.png"),
  loading: require("./assets/img/baby.gif")
  // attempt: 1
});

// 导入放大镜
import ProductZoomer from "vue-product-zoomer";
Vue.use(ProductZoomer);

// 导入axios
import axios from "axios";
// 把axios放到Vue原型中，这样所有组件都可以使用axios
Vue.prototype.$axios = axios;
// 抽取基地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";

// 路由相关
import VueRouter from "vue-router";
// 导入index组件
import index from "./components/index.vue";
// 导入detail组件
import detail from "./components/detail.vue";
// 导入shopcart组件
import shopcart from "./components/shopcart.vue";

Vue.use(VueRouter);
// 写路由
const routes = [
  {
    path: "/",
    component: index
  },
  {
    path: "/index",
    component: index
  },
  {
    path: "/detail/:goodId",
    component: detail
  },
  {
    path: "/shopcart",
    component: shopcart
  }
  // {
  //   path: "/shopcart",
  //   component: shopcart
  // }
];

// 实例化路由对象
const router = new VueRouter({
  routes
});

Vue.config.productionTip = false;

// 导入Vuex
import Vuex from "vuex";
Vue.use(Vuex);

// 实例化数据仓库
const store = new Vuex.Store({
  state: {
    // count: 0
    shopCartdata: JSON.parse(window.localStorage.getItem("cartData")) || {}
  },
  mutations: {
    // increment(state) {
    //   state.count++;
    // }
    addCart(state, opt) {
      // console.log(opt);
      // console.log(state);
      // 判断购物车有没有当前商品

      if (state.shopCartdata[opt.id] == undefined) {
        // 如果没有就新增
        // state.shopCartdata[opt.id] = opt.buyCount;
        Vue.set(state.shopCartdata, opt.id, opt.buyCount);
      } else {
        // 如果有就累加
        state.shopCartdata[opt.id] += opt.buyCount;
      }
    },
    updateCart(state, opt) {
      state.shopCartdata[opt.id] = opt.nweCount;
    },
    // 删除id对应的数据即可
    delById(state, id) {
      Vue.delete(state.shopCartdata, id);
    }
  },

  // getters 类似于 Vue的计算属性
  getters: {
    cartGoodCount(state) {
      // 通过state 就可以访问到我们的数据
      // 遍历 累加
      let totalCount = 0;
      for (const key in state.shopCartdata) {
        totalCount += state.shopCartdata[key];
      }
      return totalCount;
    }
  }
});

//导入momment
import moment from "moment";
Vue.filter("beautifyTime", function(value, formatStr) {
  return moment(value).format(formatStr);
});

new Vue({
  render: h => h(App),
  // 挂载到Vue实例
  router,
  // 挂载Vuex
  store
}).$mount("#app");

window.onbeforeunload = function() {
  window.localStorage.setItem(
    "cartData",
    JSON.stringify(store.state.shopCartdata)
  );
};
