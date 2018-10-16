<template>

    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-show="goodList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 买了东西的内容 -->
                                <tr v-show="goodList.length!= 0" v-for="(item,index) in goodList" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td><img :src="item.img_url" alt="" style="width: 65px;"></td>
                                    <td>
                                        {{item.title}}
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number size="mini" v-model="item.buycount" :min="1"></el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td><button type="button" @click="delOne(item.id)" class="el-button el-button--danger is-circle"><i class="el-icon-delete"></i></button></td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selectedPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "shopcart",
    data() {
        return {
            // 购买的商品数组，
            goodList: []
        };
    },
    created() {
        let ids = "";
        for (const key in this.$store.state.shopCartdata) {
            ids += key;
            ids += ',';

        }
        ids = ids.slice(1, -1);

        // this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
        //         console.log(response);

        //     })
        // 调用接口${} ES6的模板字符串 占位(挖坑的语法) 类似于 模板引擎的 {{}}
        this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
            // console.log(response);

            response.data.message.forEach(v => {
                // console.log(v);
                v.buycount = this.$store.state.shopCartdata[v.id];
                this.$set(v, "selected", true);
            });
            this.goodList = response.data.message; 

        });

    },
    // 事件
    methods: {
        delOne(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.commit("delOne", id)
                this.goodList.forEach((v, index) => {
                    if (v.id == id) {
                        this.goodList.splice(index, 1)
                    }
                })

                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    // 计算属性
    computed: {
        // 选中个数
        selectedNum() {
            let totalNum = 0;
            this.goodList.forEach(v => {
                // console.log(v);
                if (v.selected == true) {
                    totalNum += v.buycount;
                }
            });
            return totalNum;
        },
        selectedPrice() {
            let totalPrice = 0;
            this.goodList.forEach(v => {
                if (v.selected == true) {
                    totalPrice += v.buycount * v.sell_price;
                }
            });
            return totalPrice;

        }
    }
};
</script>



<style>
</style>

