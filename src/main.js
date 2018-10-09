import Vue from 'vue'
import App from './App.vue'
// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 路由相关
import VueRouter from 'vue-router'
// 导入index组件
import index from './components/index.vue'
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
  }
]

// 实例化路由对象
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂在到Vue实例
  router
}).$mount('#app')
