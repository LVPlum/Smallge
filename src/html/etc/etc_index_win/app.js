
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
            errorMsg: true,
        },
        methods: {
            nextStep: function(){
                if(vm.errorMsg) {
                    api.toast({
                        msg: vm.errorMsg,
                        duration: 2000,
                        location: 'middle'
                    });
                    return;
                }
                api.execScript({
                    frameName: 'etc_index',
                    script: 'sendInfo()'
                });
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
    }, function(ret, err){
        vm.errorMsg = ret.value.ready;
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
