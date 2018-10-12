<template>
    <div>
        <!-- 首页内容 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <!-- <input type="button" value="indexB" @click="add"> -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="i in item.subcates" :key="i.id">
                                                {{i.title}}&nbsp;
                                            </span>
                                          
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="i in item.subcates" :key="i.id" href="/goods/43.html">{{i.title}}</a>
                                                
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                              
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">

                                <el-carousel height="341px">
                                    <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                        <a href="#">
                                            <img style="display:block;height:100%" :src="item.img_url" alt="">
                                        </a>
                                </el-carousel-item>

                                </el-carousel>

                            </div>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | beautifyTime('YYYY年MM月DD日')}}</span>
                                </div>
                            </li>
                         
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in orderlist" :key="item.catetitle">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="it in item.level2catelist" :key="it.subcateid" href="/goods/43.html">{{it.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="it in item.datas" :key="it.artID">
                            <!-- <a href="#/site/goodsinfo/87" class=""> -->
                            <router-link :to="'/detail/'+it.artID">
                                <div class="img-box">
                                    <img v-lazy="it.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{it.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{it.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{it.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{it.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                             </router-link>
                            <!-- </a> -->
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
      
    </div>
</template>

<script>
// 导入 axios
// import axios from "axios";
// moment

export default {
  name: "index",
  data: function() {
    return {
      // 分类列表
      catelist: [],
      // 轮播图
      sliderlist: [],
      // 热卖列表
      toplist: [],
      //商品分类列表
      orderlist: []
    };
  },

  //   创建之前
  beforeCreate() {
    //   console.log('beforeCreate');
  },
  //   创建之后
  created() {
    //   console.log(this.$store);

    //   console.log('created');
    this.$axios.get("site/goods/gettopdata/goods").then(response => {
      //   console.log(response);

      this.catelist = response.data.message.catelist;
      this.sliderlist = response.data.message.sliderlist;
      this.toplist = response.data.message.toplist;
    });
    this.$axios.get("site/goods/getgoodsgroup").then(response => {
      //   console.log(response);
      this.orderlist = response.data.message;
    });
  },
  methods:{
    //   add(){
    //     //   this.$store.commit('increment')
    //   }
  }
};
</script>

<style>
</style>



