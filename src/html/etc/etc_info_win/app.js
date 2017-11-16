
/**********************************声明全局变量**********************************/
// 声明DOM对象
var header, footer;

// 声明全局变量
var headerH, footerH, vm;

/**********************************apiready**********************************/
window.apiready = function(){

    vm = new Vue({
        el: '#footer',
        data: {
            errorMsg: '请选择取卡方式',
            frm: false,
            money: '0.00',
            fee: {
                ETCFee: 350,
                installFee: 0,
                couponFee: 0,
            }
        },
        methods: {
            pay:function(){
                api.execScript({
                    frameName: 'etc_info',
                    script: 'postData('+vm.money+')'
                });
            },
            openWinFee: function(){
                if(vm.errorMsg) return false;
                if (vm.frm) {
                    vm.frm = false;
                    api.closeFrame({
                        name: 'etc_fee_frm'
                    });
                    return false;
                }
                api.openFrame({
                    name: 'etc_fee_frm',
                    url: './etc_fee_frm.html',
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
                vm.frm = true;
            },
            total: function(){
                vm.money = (vm.fee.ETCFee + vm.fee.installFee) - vm.fee.couponFee ;
                vm.money = tea.formatMoney(vm.money) < 0 ? 0.00 : tea.formatMoney(vm.money);
                return vm.money;
            }
        },
        computed: {

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
        name: 'formReady'
    }, function (ret, err) {
        vm.errorMsg = ret.value.errorMsg;
        vm.fee = ret.value.fee;

        //表单完整时计算金额
        if(vm.errorMsg){
            vm.money = '0.00';
            return;
        }
        vm.total()

    });

    api.addEventListener({
        name: 'isDetail'
    }, function (ret, err) {
        vm.frm = false;
    });

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
