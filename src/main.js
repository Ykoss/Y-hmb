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

import $ from "jquery";
Vue.prototype.$ = $;

// 导入放大镜
import ProductZoomer from "vue-product-zoomer";
Vue.use(ProductZoomer);

// 导入axios
import axios from "axios";
// 把axios放到Vue原型中，这样所有组件都可以使用axios
Vue.prototype.$axios = axios;
// 抽取基地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";
// 跨域是否携带凭证
axios.defaults.withCredentials = true;

// 路由相关
import VueRouter from "vue-router";
// 导入index组件
import index from "./components/index.vue";
// 导入detail组件
import detail from "./components/detail.vue";
// 导入shopcart组件
import shopcart from "./components/shopcart.vue";
// 导入订单详情
import checkOrder from "./components/checkOrder.vue";
// 导入登录页面
import login from "./components/login.vue";

Vue.use(VueRouter);
// 写路由
const routes = [
  {
    path: "/",
    component: index,
    meta: {
      zhName: "首页"
    }
  },
  {
    path: "/index",
    component: index,

    meta: {
      zhName: "首页"
    }
  },
  {
    path: "/detail/:goodId",
    component: detail,

    meta: {
      zhName: "详情页"
    }
  },
  {
    path: "/shopcart",
    component: shopcart,

    meta: {
      zhName: "购物车"
    }
  },
  {
    path: "/checkOrder",
    component: checkOrder,

    meta: {
      zhName: "订单确认页"
    }
  },

  {
    path: "/login",
    component: login,
    meta: {
      zhName: "登录页"
    }
  }
];

// 实例化路由对象
const router = new VueRouter({
  routes
});
// 注册导航守卫
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.zhName;
  // console.log(to);
  // console.log(from);
  // console.log(next);
  // 如果是去订单确认页, 判断有无登录
  if (to.path == "/checkOrder") {
    // if (to.meta.checkLogin == true) {
    axios.get("site/account/islogin").then(response => {
      // console.log(response);

      if (response.data.code === "nologin") {
        Vue.prototype.$message.warning("还没有登录呢!请先登录");
        router.push("/login");
      } else {
        next();
      }
    });
  } else {
    next();
  }

  // ...
});

Vue.config.productionTip = false;

// 导入Vuex
import Vuex from "vuex";
Vue.use(Vuex);

// 实例化数据仓库
const store = new Vuex.Store({
  state: {
    // count: 0
    shopCartdata: JSON.parse(window.localStorage.getItem("cartData")) || {},
    isLogin: false
  },
  // 修改数据的方式
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
      // Vue.delete(state.shopCartdata, id);
      // delete state.shopCartdata[id];
      //使用Vue.delete删除数据同步更新VUEX数据
      Vue.delete(state.shopCartdata, id);
    },
    // 设置登录状态
    changeLoginState(state, loginState) {
      state.isLogin = loginState;
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
  store,
  created() {
    axios.get("site/account/islogin").then(response => {
      // console.log(response);
      // 登录了 修改Vuex中的数据
      if (response.data.code === "logined") {
        store.commit("changeLoginState", true);
      } else {
        store.commit("changeLoginState", false);
      }
    });
  }
}).$mount("#app");

window.onbeforeunload = function() {
  window.localStorage.setItem(
    "cartData",
    JSON.stringify(store.state.shopCartdata)
  );
};
