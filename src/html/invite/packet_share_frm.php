<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <meta name="format-detection" content="telephone=no,email=no,date=no,aItemress=no">
    <title></title>
    <!-- api样式 -->
    <link rel="stylesheet" type="text/css" href="css/api.css" />
    <!-- aui样式 -->
    <link rel="stylesheet" type="text/css" href="css/aui.css" />
    <link rel="stylesheet" type="text/css" href="css/aui-skin.css" />
    <!-- 项目通用样式 -->
    <link rel="stylesheet" type="text/css" href="css/tea.css" />
    <style type="text/css">
        /*如页面需要动态滚动到底部请去除height:100%*/
        html,body {
            height: 100%;
            background-color: #ebf6ff;
            overflow-x: hidden;
        }
        .aui-list .aui-list-item.coupon{
            padding: 0rem;
        }
        .aui-list .aui-list-item-media.coupon{
            width: 5rem;
            height: 5rem;
            padding: 0;
        }

        .tea-column{
            flex-direction: column !important;
            align-items: start !important;
            -webkit-align-items: flex-start !important;
        }
        .tea-flex-center{
            display: flex;
            justify-content: center !important;
            -webkit-justify-content: center !important;
            align-items: center !important;
            -webkit-align-items: center !important;
        }
        .tea-font-size-max {
            font-size: 2.2rem !important;
        }
        /*div边框的半圆形状，通用*/
        .tea-content-semicircle:before,.tea-content-semicircle:after{
            content: "";
            width: 0.375rem;
            height: 0.75rem;
            position: absolute;
            margin-top: -0.375rem;
            z-index: 1;
        }
        .tea-content-semicircle.first:before,.tea-content-semicircle.first:after{
            background-image: url('img/1.png');
        }
        .tea-content-semicircle.second:before,.tea-content-semicircle.second:after{
            background-image: url('img/2.png');
        }
        /*右半圆*/
        .tea-content-semicircle:before{
            left: -1px;
            top: 50%;
            border-radius: 0 100% 100% 0/50%;
        }
        /*左半圆*/
        .tea-content-semicircle:after{
            right: -1px;
            top: 50%;
            border-radius: 100% 0 0 100%/50%;
        }
        /*div边框虚线*/
        .tea-content-border-dotted:before{
            content: "";
            width: 2px;
            height: 5rem;
            background-position: left;
            background-image: linear-gradient(0,#ededed 50%,#fff 50%,transparent 50%);
            background-size: 1px 8px;
            position: absolute;
            left: 0;
        }
        /*div边框锯齿状波纹线*/
        .tea-content-border-sawtooth:after{
            content: "";
            width: 3px;
            height: 5rem;
            background-size: 3px 5px;
            background-repeat: repeat-y;
            background-position: 0 100%;
            position: absolute;
            right: 0;
        }
        .tea-content-border-sawtooth-blue:after{
            background-image: -webkit-gradient(radial,0 40%,1,0 50% ,5,from(#3399ff),color-stop(50%, #3399ff),color-stop(50%, #FFF),to(#FFF));
        }
        .tea-content-border-sawtooth-yellow:after{
            background-image: -webkit-gradient(radial,0 40%,1,0 50% ,5,from(#ffcc33),color-stop(50%, #ffcc33),color-stop(50%, #FFF),to(#FFF));
        }
        .tea-content-border-sawtooth-deep-orange:after{
            background-image: -webkit-gradient(radial,0 40%,1,0 50% ,5,from(#FF6633),color-stop(50%, #FF6633),color-stop(50%, #FFF),to(#FFF));
        }
        .tea-content-border-sawtooth-purple:after{
            background-image: -webkit-gradient(radial,0 40%,1,0 50% ,5,from(#5c78cd),color-stop(50%, #5c78cd),color-stop(50%, #FFF),to(#FFF));
        }
        .tea-content-border-sawtooth-cyan:after{
            background-image: -webkit-gradient(radial,0 40%,1,0 50% ,5,from(#4fc9e8),color-stop(50%, #4fc9e8),color-stop(50%, #FFF),to(#FFF));
        }
        .tea-content-border-sawtooth-brown:after{
            background-image: -webkit-gradient(radial,0 40%,1,0 50% ,5,from(#f59f5d),color-stop(50%, #f59f5d),color-stop(50%, #FFF),to(#FFF));
        }
        .tea-bg-deep-orange{
            background-color: #FF6633;
        }
        .tea-bg-purple{
            background-color: #5c78cd;
        }
        .tea-bg-cyan{
            background-color: #4fc9e8;
        }
        .tea-bg-brown{
            background-color: #f59f5d;
        }
        /*￥符号前缀*/
        .tea-text-white-money{
            margin-left: 1.2rem;
        }
        .tea-text-white-money:before {
            content: '￥';
            color: white;
            font-size: 0.8rem;
            margin-left: -1.8rem;
            font-weight: normal;
        }
        .warp{
            margin: 0 0.5rem;
            padding: 0.75rem;
            background: rgba(51, 102, 153, 0.2);
            position: relative;
            border-radius: 10px;
        }
        .bg{
            background-image: none !important;
            background: transparent !important;
        }
        .banner{
            background: url("img/banner.png");
            height: 24rem;
            background-size: cover;
            padding-top: 9.8rem;
        }
        .line{
            margin: 0rem -0.25rem;
            min-height: 0.6rem;
        }
        .line:before,.line:after{
            content: '';
            width: 25%;
            min-height: 0.6rem;
            display: inline-block;
            background-size: 100% 2px;
            background-repeat: no-repeat;
            background-position: center;
            background-image: linear-gradient(0,#dddddd,#dddddd 50%,transparent 50%);
            background-image: -webkit-linear-gradient(90deg,#666,#666 50%,transparent 50%);
        }
        .line.rule:before,.line.rule:after{
            width: 35%;
        }
        .line:before{
            margin-right: 0.5rem;
        }
        .line:after{
            margin-left: 0.5rem;
        }
        .bg-transparent{
            background: transparent !important;
        }
        .image-border{
            border-radius: 5px;
        }
        .text-orange{
            color: #ff9933;
        }
    </style>
</head>
<body>
<div id="app">
    <div class="banner">
        <section class="warp">
            <ul class="aui-list aui-media-list aui-list-noborder bg">
                <li v-for="(val,i) in couponList" class="aui-list-item coupon tea-bg-white aui-margin-b-15">
                    <div class="aui-media-list-item-inner tea-content-semicircle" :class="i == 0 ? 'first' : 'second' ">
                        <div :class="styleClass(val)" class="aui-list-item-media coupon tea-flex-center tea-content-border-sawtooth">
                            <div class="aui-text-white tea-text-white-money tea-font-size-max" style="width:2rem; font-weight:bold; text-align: center;">{{ parseFloat(val.coupon_m) }}</div>
                        </div>
                        <div class="aui-list-item-inner" style="padding: 0.75rem 0.75rem 0rem 0.75rem;">
                            <div class="aui-list-item-text">
                                <div class="aui-list-item-title aui-font-size-14 tea-text-title">{{ val.readme }}</div>
                            </div>
                            <div class="aui-list-item-text tea-column">
                                <p v-for="i in val.content" class="aui-ellipsis aui-font-size-12 tea-text-gray">{{i}}</p>
                            </div>
                            <!--<div class="aui-list-item-text">
                                <p class="aui-ellipsis aui-font-size-12 tea-text-gray">有效期至：2017.08.08</p>
                            </div>-->
                        </div>
                        <div class="aui-list-item-media tea-content-border-dotted tea-flex-center coupon" style="width:2.2rem;">
                            <div class="tea-text-blue aui-font-size-12" style="width:0.6rem;">立即使用</div>
                        </div>
                    </div>
                </li>
                <!--<li class="aui-list-item coupon tea-bg-white aui-margin-b-15">
                    <div class="aui-media-list-item-inner tea-content-semicircle first">
                        <div class="aui-list-item-media coupon tea-bg-yellow tea-flex-center tea-content-border-sawtooth tea-content-border-sawtooth-yellow">
                            <div class="aui-text-white tea-text-white-money tea-font-size-max" style="width:2rem; font-weight:bold; text-align: center;">8</div>
                        </div>
                        <div class="aui-list-item-inner" style="padding: 0.75rem 0.75rem 0rem 0.75rem;">
                            <div class="aui-list-item-text">
                                <div class="aui-list-item-title aui-font-size-14 tea-text-title">审车现金券</div>
                            </div>
                            <div class="aui-list-item-text tea-column">
                                <p class="aui-ellipsis aui-font-size-12 tea-text-gray">仅限小马哥平台使用</p>
                            </div>
                            <div class="aui-list-item-text">
                                <p class="aui-ellipsis aui-font-size-12 tea-text-gray">有效期至：2017.08.08</p>
                            </div>
                        </div>
                        <div class="aui-list-item-media tea-content-border-dotted tea-flex-center coupon" style="width:2.2rem;">
                            <div class="tea-text-blue aui-font-size-12" style="width:0.6rem;">立即使用</div>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item coupon tea-bg-white aui-margin-b-15">
                    <div class="aui-media-list-item-inner tea-content-semicircle second">
                        <div class="aui-list-item-media coupon tea-bg-purple tea-flex-center tea-content-border-sawtooth tea-content-border-sawtooth-purple">
                            <div class="aui-text-white tea-text-white-money tea-font-size-max" style="width:2rem; font-weight:bold; text-align: center;">8</div>
                        </div>
                        <div class="aui-list-item-inner" style="padding: 0.75rem 0.75rem 0rem 0.75rem;">
                            <div class="aui-list-item-text">
                                <div class="aui-list-item-title aui-font-size-14 tea-text-title">审车现金券</div>
                            </div>
                            <div class="aui-list-item-text tea-column">
                                <p class="aui-ellipsis aui-font-size-12 tea-text-gray">仅限小马哥平台使用</p>
                            </div>
                            <div class="aui-list-item-text">
                                <p class="aui-ellipsis aui-font-size-12 tea-text-gray">有效期至：2017.08.08</p>
                            </div>
                        </div>
                        <div class="aui-list-item-media tea-content-border-dotted tea-flex-center coupon" style="width:2.2rem;">
                            <div class="tea-text-blue aui-font-size-12 " style="width:0.6rem;">立即使用</div>
                        </div>
                    </div>
                </li>-->
            </ul>
            <div class="aui-font-size-14 aui-text-center tea-text-title">红包已放入账户：13454370265
                <span class="tea-text-blue" @click="change">修改></span>
            </div>
            <p class="aui-font-size-12 aui-text-center aui-text-default">登录APP即可使用</p>
        </section>
        <div class="aui-font-size-14 tea-text-title aui-text-center aui-margin-t-15 line">看看朋友们手气如何</div>
        <section class="aui-content-padded aui-margin-t-0 aui-margin-b-0">
            <ul class="aui-list aui-media-list aui-list-noborder bg-transparent">
                <li v-for="(val,i) in userList" class="aui-list-item aui-list-item-middle bg-transparent">
                    <div class="aui-media-list-item-inner">
                        <div class="aui-list-item-media aui-padded-0 aui-margin-r-10" style="width: 2rem;">
                            <img :src="website+val.img" class="aui-list-img-sm image-border">
                        </div>
                        <div class="aui-list-item-inner" style="max-width: 60%">
                            <div class="aui-list-item-text">
                                <div class="aui-list-item-title aui-font-size-14 tea-text-blue tea-font-weight-bold">{{val.nickname}}</div>
                            </div>
                            <div class="aui-list-item-text">
                                <p class="aui-ellipsis-1 aui-text-default">{{ intervalTime(val.gettime) }}</p>
                            </div>
                        </div>
                        <div class="aui-list-item-media tea-flex-center aui-padded-0 text-orange tea-font-weight-bold" style="width: 4rem;">
                            {{ parseFloat(val.amount) }}元
                        </div>
                    </div>
                </li>
                <!--<li class="aui-list-item aui-list-item-middle bg-transparent">
                    <div class="aui-media-list-item-inner">
                        <div class="aui-list-item-media aui-padded-0 aui-margin-r-10" style="width: 2rem;">
                            <img src="friend_pic.png" class="aui-list-img-sm image-border">
                        </div>
                        <div class="aui-list-item-inner" style="max-width: 60%">
                            <div class="aui-list-item-text">
                                <div class="aui-list-item-title aui-font-size-14 tea-text-blue tea-font-weight-bold">二十四话</div>
                            </div>
                            <div class="aui-list-item-text">
                                <p class="aui-ellipsis-1 aui-text-default">10分钟前</p>
                            </div>
                        </div>
                        <div class="aui-list-item-media tea-flex-center aui-padded-0 text-orange tea-font-weight-bold" style="width: 4rem;">
                            2元
                        </div>
                    </div>
                </li>
                <li  class="aui-list-item aui-list-item-middle bg-transparent">
                    <div class="aui-media-list-item-inner">
                        <div class="aui-list-item-media aui-padded-0 aui-margin-r-10" style="width: 2rem;">
                            <img src="friend_pic.png" class="aui-list-img-sm image-border">
                        </div>
                        <div class="aui-list-item-inner" style="max-width: 60%">
                            <div class="aui-list-item-text">
                                <div class="aui-list-item-title aui-font-size-14 tea-text-blue tea-font-weight-bold">二十四话</div>
                            </div>
                            <div class="aui-list-item-text">
                                <p class="aui-ellipsis-1 aui-text-default">10分钟前</p>
                            </div>
                        </div>
                        <div class="aui-list-item-media tea-flex-center aui-padded-0 text-orange tea-font-weight-bold" style="width: 4rem;">
                            2元
                        </div>
                    </div>
                </li>-->
            </ul>
        </section>
        <div class="aui-font-size-14 tea-text-title aui-text-center line rule">活动细则</div>
        <ul class="aui-content-padded aui-margin-t-0 aui-padded-5 aui-font-size-12 aui-text-default">
            <li>1.使用现金红包时的下单手机号需为领取现金红包时使用的手机号。</li>
            <li>2.发放至手机号的现金红包需在APP用手机号注册，或将手机号绑定小马哥APP账户后才可使用。</li>
            <li>3.发放至小马哥APP账户的现金红包登录后即可使用。</li>
            <li>4.每张订单仅限使用一张现金红包，现金红包不找零。</li>
            <li>5.小马哥保留法律范围内允许的对活动的解释权。</li>
        </ul>
    </div>
</div>
</body>

<script type="text/javascript" src="js/api.js" ></script>
<!-- ajax相关 -->
<script type="text/javascript" src="js/conn.js"></script>
<!-- 消除300毫秒延迟 -->
<script type="text/javascript" src="js/fastclick.min.js"></script>
<!-- JavaScript模板引擎 -->
<script type="text/javascript" src="js/vue.min.js"></script>
<!-- 项目通用函数库 -->
<script type="text/javascript" src="js/tea.js"></script>
<!-- HTML模板 -->
<script type="text/template" id="template">
</script>

<script type="text/javascript">
    var vm = null;

    vm = new Vue({
        el: '#app',
        data: {
            couponList:[
                {
                    "readme": "话费券",
                    "coupon_type": "tel",
                    "coupon_m": "2.00",
                    "content": [
                        "仅限小马哥平台使用",
                        "充满20元可用",
                        "有效期至：2017-11-09"
                    ]
                },
                {
                    "readme": "VIP特权卡现金券",
                    "coupon_type": "vip",
                    "coupon_m": "20.00",
                    "content": [
                        "仅限小马哥平台使用",
                        "有效期至：2017-11-09"
                    ]
                }
            ],
            userList: [
                {
                    "nickname": "XPAN",
                    "img": "newspicup/logo/20171012110850_6095.png",
                    "amount": "51.00",
                    "gettime": 53778
                },
                {
                    "nickname": "曾经蜡笔没有小新",
                    "img": "newspicup/logo/20170913110939_7297.jpg",
                    "amount": "51.00",
                    "gettime": 51875
                }
            ]
        },
        methods: {
            change: function(){
                alert('点击修改手机号@')
            },
            styleClass: function(val){
                var color = '';
                switch (val.coupon_type){
                    case 'tel':
                        color = 'purple';
                        break;
                    case 'vip':
                        color = 'yellow';
                        break;
                    case 'etc':
                        color = 'cyan';
                        break;
                    default:
                        color = 'blue';
                        break;
                }
                var style = "tea-bg-"+color + " tea-content-border-sawtooth-"+color;
                return style;
            },
            /* 时间间隔处理 */
            intervalTime: function(times){
                var interval;               //3600 =1h 86400 = 1day
                if(times >= 86400){
                    interval = Math.floor(times/86400) + '天前';
                }else if(times >= 3600 && times <86400 ){
                    interval = Math.floor(times/3600) + '小时前';
                }else if(times >= 60 && times< 3600){
                    interval = Math.floor(times/60) + '分钟前';
                }else {
                    interval = '刚刚';
                }
                return interval;
            },
        },
        computed: {

        }
    });
    window.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }
</script>
</html>