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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <!-- element-ui的表单
                            :model  数据
                            :rules  规则 -->
                        <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名:" prop="accept_name">
                                        <el-input v-model="ruleForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="省市区域:" prop="accept_name">
                                        <v-distpicker @selected="areaChange" :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="所属区域:" prop="address">
                                        <el-input v-model="ruleForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码:" prop="mobile">
                                        <el-input v-model="ruleForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱:" prop="email">
                                        <el-input v-model="ruleForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码:" prop="post_code">
                                        <el-input v-model="ruleForm.post_code" style="width:100px"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <!-- <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1"> -->
                                            <!-- <input name="payment_price" type="hidden" value="0.00">在线支付 -->
                                            <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                            <span class="info">手续费：0.00元</span>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                                            <input name="express_price" type="hidden" value="20.00">顺丰快递
                                            <em>费用：20.00元</em>
                                            <span class="Validform_checktip"></span>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr>
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200046589514.jpg" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">小米（Mi）小米Note 16G双网通版</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥2299.00
                                                </span>
                                            </td>
                                            <td align="center">1</td>
                                            <td>
                                                <span class="red">
                                                    ￥2299.00
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">1</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">2299.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">0.00</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">2299.00</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

        <audio controls="controls" style="display: none;"></audio>
    </div>
</template>


<script>
// 引入省市联动插件
import VDistpicker from "v-distpicker";

export default {
  name: "checkOrder",
  components: { VDistpicker },
  data: function() {
    //   手机号码
    var validateMobile = (rule, value, callback) => {
      let res = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      setTimeout(() => {
        if (value === "") {
          callback(new Error("请输入手机号"));
        } else if (res.test(value) == false) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }, 1000);
    };

    // 电子邮箱
    var validateEmail = (rule, value, callback) => {
      let res = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

      setTimeout(() => {
        if (res.test(value) == false) {
          callback(new Error("请输入正确的电子邮箱"));
        } else {
          callback();
        }
      }, 1000);
    };
    //邮政编码
    var validatePostCode = (rule, value, callback) => {
      let res = /^[1-9]\d{5}(?!\d)$/;

      setTimeout(() => {
        if (res.test(value) == false) {
          callback(new Error("请输入正确的邮编"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      
      ruleForm: {
        //   姓名
        accept_name: "莎士比亚",
        // 地址
        address: "深圳市宝安区亚历山大路隔壁村2号",
        // 手机
        mobile: "16874887488",
        // 电子邮箱
        email: "7488@QQ.com",
        // 邮政编码
        post_code: "174895",
        area: {
          province: {
            code: "110000",
            value: "北京市"
          },
          city: {
            code: "110110",
            value: "北京城区"
          },
          area: {
            code: "110105",
            value: "朝阳区"
          }
        },
        payment_id:"6"
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          {
            min: 3,
            message: "最少长度为3个字符",
            trigger: "change"
          }
        ],
        mobile: [{ validator: validateMobile, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  methods: {
    areaChange(data) {
      // console.log(data);
      this.ruleForm.area = data;
    }
  }
};
</script>



<style>
</style>


