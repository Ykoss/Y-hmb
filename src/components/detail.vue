<template>
    <div>
        <!-- <input type="button" value="addb" @click="addta"> -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box" v-if="images.normal_size.length!=0">
                                <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- element-ui的计数器组件 -->
                                                <el-input-number v-model="buyNum" @change="numChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button class="buy">立即购买</button>
                                                <button @click="addCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click="selectIndex=0" href="javascript:;" :class="{selected:selectIndex==0}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click="selectIndex=1" href="javascript:;" :class="{selected:selectIndex==1}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="selectIndex ==0" v-html="goodsinfo.content">
                                内容
                            </div>
                            <div class="tab-content" v-show="selectIndex ==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="message" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="submitCommtent" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | beautifyTime('YYYY年MM月DD日 HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page @on-page-size-change="sizeChange" @on-change="pageChange" :total="totalcount" :current="pageIndex" placement="top" :page-size=10 show-elevator show-sizer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <!-- </a> -->
                                            <span>{{item.add_time | beautifyTime('YYYY年MM月DD日')}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop :height="100" :bottom="150" :right="390">
            <div class="top">返回顶端</div>
        </BackTop>
    </div>

</template>

<script>
export default {
    name: "Detail",
    data: function () {
        return {
            goodId: "",
            // 商品信息
            goodsinfo: {},
            //   热卖列表
            hotgoodslist: [],
            //   图片列表
            imglist: [],
            //   选择数量
            buyNum: 1,
            // 标记tab栏显示哪个 0 :1
            selectIndex: 0,
            //   页码
            pageIndex: 1,
            //   也容量
            pageSize: 10,
            // 总条数
            totalcount: 0,
            // 评论内容
            comments: [],
            //   发表的评论信息
            message: "",
            //   放大镜图片数据
            images: {
                normal_size: [
                    {
                        id: 1,
                        url:
                            "http://img4.imgtn.bdimg.com/it/u=2131988536,2410504660&fm=11&gp=0.jpg"
                    },
                    {
                        id: 2,
                        url:
                            "http://yoohooworld.com/images/vue-product-zoomer/images/normal_size/2.jpeg"
                    }
                ]
            },
            //   zoomer的选项
            zoomerOptions: {
                //   放大倍数
                zoomFactor: 4,
                // 放大样式
                pane: "container-round",
                // 多久出来
                hoverDelay: 300,
                // 类前缀
                namespace: "inline-zoomer",
                // 点击一点
                move_by_click: true,
                // 滚动的图片张数
                scroll_items: 5,
                // 选中的缩略图边框颜色
                choosed_thumb_border_color: "#bbdefb"
            }
        };
    },
    methods: {
        // 购买数量改变触发
        numChange() {
            //   console.log("11");
        },
        // 根据ID显示商品详情数据
        getGoodInfo() {
            this.images.normal_size = [];
            this.$axios
                .get("site/goods/getgoodsinfo/" + this.goodId)
                .then(response => {
                    //   console.log(response);
                    this.goodsinfo = response.data.message.goodsinfo;
                    this.hotgoodslist = response.data.message.hotgoodslist;
                    this.imglist = response.data.message.imglist;
                    // 处理数据 把 imglist的值 赋值给 images
                    let tem_normal_size = [];
                    this.imglist.forEach(v => {
                        tem_normal_size.push({
                            id: v.id,
                            url: v.thumb_path
                        });
                    });
                    this.images.normal_size = tem_normal_size;
                });
        },
        // 获取评论信息
        getComments() {
            this.$axios
                .get(
                    `site/comment/getbypage/goods/${this.goodId}?pageIndex=${
                    this.pageIndex
                    }&pageSize=${this.pageSize}`
                )
                .then(response => {
                    //   console.log(response);
                    this.totalcount = response.data.totalcount;
                    this.comments = response.data.message;
                    this.pageIndex = response.data.pageIndex;
                    this.pageSize = response.data.pageSize;
                });
        },
        //提交评论
        submitCommtent() {
            // console.log('11');
            if (this.message == "") {
                this.$Message.warning("哥们！写点东西呗！");
                return;
            }
            this.$axios
                .post("site/validate/comment/post/goods/" + this.goodId, {
                    commenttxt: this.message
                })
                .then(response => {
                    // console.log(response);
                    // 发表评论之后回到第一页显示
                    this.pageIndex = 1;

                    // 重新获取评论内容
                    this.getComments();
                    // 清空文本内容
                    this.message = "";
                    // 提示发表成功
                    this.$Message.success("发表成功！！");
                });
        },
        // 页码改变
        pageChange(pageNum) {
            // console.log(pageNum);
            this.pageIndex = pageNum;
            this.getComments();
        },
        // 页容量改变
        sizeChange(pageSize) {
            // console.log(pageSize);
            this.pageSize = pageSize;
            this.pageIndex = 1;
            this.getComments();

        },
        // 加入购物车 提交数据/载荷
        addCart() {
            this.$store.commit('addCart', {
                id: this.goodId,
                buyCount: this.buyNum
            })
        }
    },
    // created中获取id 因为一会就要去调用接口
    created() {
        this.goodId = this.$route.params.goodId;
        this.getGoodInfo();
        this.getComments();
    },
    watch: {
        $route(to, from) {
            // 对路由变化作出响应...
            //   console.log(to);
            this.goodId = to.params.goodId;
            //   重新获取数据
            this.getGoodInfo();
            //   重新获取评论
            this.getComments();
            //   把购买数量更改为1
            this.buyNum = 1;
        }
    }
};
</script>

<style>
/* 把商品详情图片转块 */
.tab-content img {
  display: block;
}
.pic-box {
  width: 250px;
}
.control {
  text-align: center;
  justify-content: center;
}

.thumb-list {
  width: 150px;
  /* height: 50px; */
}
.container-zoomer-zoomer-box {
  height: 319px;
}
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 10px;
}
</style>


