
/**********************************声明全局变量**********************************/
// 声明DOM对象
var header, footer;

// 声明全局变量
var headerH, footerH, vm;

/**********************************apiready**********************************/
window.apiready = function(){

    var data = api.pageParam;
    data.fee = {};
    data.frm = false;
    vm = new Vue({
        el: '#app',
        data: data,
        methods: {
            openWinPay: function(){
                api.sendEvent({
                    name: 'orderPay',
                    extra: {
                        // 最终支付价格
                        orderPrice: vm.orderPrice,
                        // 优惠前价格
                        originalPrice: vm.fee.orderFee + vm.fee.postFee
                    }
                });
            },
            toPay: function(){
                alert('请到线下门店付款');
            },
            openFrmOrderFee: function(){
                if (this.frm) {
                    return false;
                }
                api.openFrame({
                    name: 'order_fee',
                    url: './order_fee.html',
                    rect: {
                        x: 0,
                        y: 0,
                        w: 'auto',
                        h: api.winHeight - footerH
                    },
                    pageParam: vm.fee,
                    bounces: false,
                    bgColor: 'rgba(0,0,0,0.6)',
                    vScrollBarEnabled: true,
                    hScrollBarEnabled: true
                });
            },
            closeFrm: function(){
                if (this.frm) {
                    api.closeFrame({
                        name: 'order_fee_frm'
                    });
                    this.frm = false;
                }              
            }
        },
        computed: {
            isShow: function(){
                // if (this.status != 2) {
                //     return false;
                // }
                if (this.type == 'insure' && this.insureCheck == 1) {
                    return true;
                }
                if (this.type == 'vip' || this.type == 'etc') {
                    return true;
                }
                return false;
            },
            // 实际支付价格 = 订单价格 + 邮费 - 现金券
            orderPrice: function(){
                var fee = this.fee;
                // 判断是否价格有变动
                return fee.orderFee? parseFloat(fee.orderFee) + parseFloat(fee.postFee) - parseFloat(fee.couponFee) : this.money;
            },
            // 小马哥送礼 = 发票价格 + 交强险 - 订单价格
        },
        watch: {

        }
    })

    // 初始化变量
    init();

    // 打开Frame
    openFrame();

};

/**********************************初始化变量**********************************/
function init(){

    // 处理沉浸式效果，计算header和footer的高度
    header = $api.byId('header');
    $api.fixStatusBar(header);
    headerH = $api.offset(header).h;
    footer = $api.byId('footer');
    footerH = footer ? $api.offset(footer).h : 0;

    // 初始化模块
    initModule();

    // 初始化监听
    initEventListener();

};

/**********************************初始化模块**********************************/
function initModule(){



}

/**********************************初始化监听**********************************/
function initEventListener(){

    api.addEventListener({
        name: 'updateOrderFee'
    }, function(ret, err){    
        vm.fee = ret.value;
        // 小马哥送礼 = 发票价格 + 交强险 - 订单价格
        var fee = vm.fee;
        fee.billBenefit = parseFloat(fee.needpay) + parseFloat(fee.travelFee) - parseFloat(fee.orderFee);
    });

    api.setFrameClient({
        frameName: 'order_fee_frm'
    }, function(ret, err) {
        if (ret.state == 2) {
            vm.frm = true;
        }
    })
}

/**********************************ajax请求数据**********************************/
function getData(){



}


/**********************************DOM响应**********************************/
// 回退关闭窗口
function closeWin(){
    
}

/**********************************打开Frame**********************************/
// 打开Frame,不需要打开Frame请删除
function openFrame(){

    var frameName = api.winName.replace('_win', '');
    api.openFrame({
        name: frameName,
        url: './' + frameName + '.html',
        rect: {
            x: 0,
            y: headerH,
            w: 'auto',
            h: api.winHeight - headerH - footerH
        },
        pageParam: api.pageParam,
        // 页面是否弹动
        bounces: false
    });

}

/**********************************其他函数**********************************/
