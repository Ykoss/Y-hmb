<template>
    <div>
        <!-- 头部 -->
        <div class="header">
            <!-- 1.0 导航栏头部 -->
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>黑马买买买</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <span v-show="$store.state.isLogin==false">
                            <!-- 没有登录显示 -->
                            <!-- <a href="" class="">登录</a> -->
                            <router-link to="/login">登录</router-link>
                            <strong>|</strong>
                            <a href="" class="">注册</a>
                            <strong>|</strong>
                        </span>


                        <!-- 登录了显示 -->
                        <span v-show="$store.state.isLogin==true">
                            <a href="" class="">会员中心</a>
                            <strong>|</strong>
                            <a @click="logout">退出</a>
                            <strong>|</strong>
                        </span>
                        <!-- <a href="" class=""> -->
                        <router-link to="/shopcart">
                            <i class="iconfont icon-cart" ref="cart"></i>购物车(
                            <span id="shoppingCartCount">
                                <span>{{$store.getters.cartGoodCount}}</span>
                            </span>)
                        </router-link>
                        <!-- </a> -->
                    </div>
                </div>
            </div>

            <!-- 2.0 导航条 -->
            <div class="head-nav">
                <div class="section">
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <!-- <a href="#" class=""> -->
                                <router-link to="/index">
                                    <span class="out" style="top: 0px;">首页</span>
                                </router-link>
                                <!-- </a> -->
                            </li>
                            <li class="news">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">每日精选</span>
                                </a>
                            </li>
                            <li class="photo">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">秒杀专区</span>
                                </a>
                            </li>
                            <li class="video">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">黑马超市</span>
                                </a>
                            </li>
                            <li class="down">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">会员权益</span>
                                </a>
                            </li>
                            <li class="goods">
                                <a href="" class="router-link-exact-active ">
                                    <span class="out" style="top: 0px;">购物商城</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <router-view></router-view>
        <!-- 底部 -->
        <div class="footer">
            <div class="section">
                <div class="foot-nav">
                    <a href="">关于我们</a>
                    <strong>|</strong>
                    <a href="">联系我们</a>
                    <strong>|</strong>
                    <a href="">联系客服</a>
                    <strong>|</strong>
                    <a href="">合作招商</a>
                    <strong>|</strong>
                    <a href="">商家帮助</a>
                    <strong>|</strong>
                    <a href="">营销中心</a>
                    <strong>|</strong>
                    <a href="">隐私政策</a>
                </div>
                <div class="foot-box">
                    <div class="copyright">
                        <p>版权所有 黑马买买买 </p>
                        <p>公司地址： 联系电话：</p>
                        <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                    </div>
                    <div class="service">
                        <p>周一至周日 9:00-24:00</p>
                        <a href="#">
                            <i class="iconfont icon-phone"></i>在线客服</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "app",
  //   导航条移入滑入滑出效果
  mounted() {
    $("#menu2 li a").wrapInner('<span class="out"></span>');
    $("#menu2 li a").each(function() {
      $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
    });

    $("#menu2 li a").hover(
      function() {
        $(".out", this)
          .stop()
          .animate({ top: "48px" }, 300); // move down - hide
        $(".over", this)
          .stop()
          .animate({ top: "0px" }, 300); // move down - show
      },
      function() {
        $(".out", this)
          .stop()
          .animate({ top: "0px" }, 300); // move up - show
        $(".over", this)
          .stop()
          .animate({ top: "-48px" }, 300); // move up - hide
      }
    );
  },
  //  方法
  methods: {
    add() {
      // 修改 Vuex 仓库中的数据
      // this.$store.commit("increment");
      this.$store.commit("addCart", {
        id: 66,
        buyCount: 98
      });
    },
    logout() {
      this.$confirm("你确定要离开? 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送请求退出
          this.$axios.get("site/account/logout").then(response => {
            // console.log(response);
            if (response.data.status == 0) {
              this.$message({
                type: "success",
                message: "已退出!"
              });
              //   跳转到首页
              this.$router.push("/index");
              // 修改登录状态
              this.$store.commit("changeLoginState", false);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style>
/* 导入样式 */
@import url("./assets/statics/site/css/style.css");
.menuhd ul li a span.over {
  background-color: yellowgreen;
}

/* iView提示框 样式 修改 */
.ivu-notice {
  text-align: left;
}
</style>
