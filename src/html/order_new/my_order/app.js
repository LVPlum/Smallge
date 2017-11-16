import Buttons from './buttons.vue';
import BusinessType from 'public/business_type.js'


let vm;

window.apiready = function(){

    class OrderType extends BusinessType {
        constructor(typeArr) {
            super(typeArr);
            if (typeArr === 'all') {
                for (let key in this.typeObj) {
                    if (this.typeObj.hasOwnProperty(key)) {
                        this.typeObj[key].carnum = function(item){
                            return item.carnum || item.tel || '';
                        }
                    }
                }
            }
            else {
                typeArr.forEach((item) => {
                    this.result[item].carnum = function(item){
                        return item.carnum || item.tel || '';
                    }
                })
            }
        }
    }

    let orderType = new OrderType('all');
    orderType.addProperty('check', {
        desc: function(item){
            return item.checkstation
        },
        price: function(item){
            return item.business
        }
    });
    orderType.addProperty('exempt', {
        desc: function(item){
            return item.checkstation
        },
        price: function(item){
            return '¥' + tea.formatMoney(item.money)
        } 
    });
    orderType.addProperty('insure',{
        desc: function(item){
            return item.insurer;
        },
        price: function(item){
            return item.money ? '¥' + tea.formatMoney(item.money) : '审核中';
        }
    });
    orderType.addProperty('tel',{
        desc: function(item){
            return '¥' + tea.formatMoney(item.recharge_money);
        },
        price: function(item){
            return '¥' + tea.formatMoney(item.money);
        }
    });
    orderType.addProperty('agency',{
        desc: function(item){
            return item.agency_name;
        },
        price: function(item){
            return item.business;
        }
    });
    orderType.addProperty('join',{
        desc: function(item){
            return item.agency_name;
        },
        price: function(item){
            return item.shop_address;
        }   
    });
    orderType.addProperty('vip',{
        desc: function(item){
            return '';
        },
        price: function(item){
            return '¥' + tea.formatMoney(item.money);
        } 
    });
    orderType.addProperty('etc',{
        desc: function(item){
            return '';
        },
        price: function(item){
            return '¥' + tea.formatMoney(item.money);
        } 
    });
    orderType.addProperty('oil',{
        desc: function(item){
            return '';
        },
        price: function(item){
            return '¥' + tea.formatMoney(item.money);
        } 
    });
    let typeObj = orderType.getResult();

    vm = new Vue({
        el: '#app',
        data: {
            mask: true,
            list: [],
            statusList: ['全部', '已完成', '未完成'],
            status: 0,
            orderType: 'all',
            type: typeObj,
            nothingImg: '../../image/nothing.png'
        },
        components: {
            'buttons': h => h(Buttons)
        },
        methods: {
            isShow: function(type, status) {
                if (this.orderType != 'all' && this.orderType != type) {
                    return false;
                }
                if (this.status != 0 && this.status != status) {
                    return false;
                }
                return true;
            },
            // 订单状态适配器
            formatStatus: function(status, type){
                switch( status ){
                    case 1:
                        return '已完成';
                        break;
                    case 2:
                        // 不即时生效的订单为‘已提交’
                        var arr = ['check', 'join', 'etc', 'agency']
                        if (~arr.indexOf(type)) {
                            return '已提交';
                        }
                        return '未完成';
                        break;                    
                    default :
                        return '未知状态';
                        break;
                }                
            },       
            delOrder: function(index){
                mySwiper[index].slideTo(0, 100, false);//切换到第一个slide，速度为1秒

                api.confirm({
                    msg: '确认删除订单吗？',
                    buttons: ['确定', '取消']
                },function(ret, err){
                    if (ret.buttonIndex == 1) {
                        api.showProgress({
                            title: '订单删除中...',
                            text: '请稍候...',
                            modal:  true
                        });
                        api.ajax({
                            url: website + 'api.php?action=delorder',
                            method: 'post',
                            timeout: 30,
                            data:{
                                values:{
                                    ID: $api.getStorage('ID'),
                                    token: $api.getStorage('token'),
                                    order_id: vm.list[index].order_id,
                                    order_type: vm.list[index].order_type,
                                }
                            },
                            dataType: 'json',
                            returnAll: false
                        },function(ret,err){
                            api.hideProgress();
                            if (!ret) {
                                tea.toast('ajax');
                                return false;
                            };
                            if (ret.success == 0) {
                                // 删除本地数据
                                vm.list.splice(index, 1);
                                getData();
                                api.closeWin({
                                    name: 'order_detail_win'
                                });
                            }
                            api.toast({
                                msg: ret.message,
                                duration: 2000,
                                location: 'bottom'
                            });            
                        });
                    }
                });
            },
            test: function(index){
                api.prompt({
                    buttons: ['确定', '取消']
                }, function(ret, err) {
                    var text = ret.text;
                    vm.list[index].status = text;
                });
            },
            openWinDetail: function(item, index){
                api.openWin({
                    name: 'order_detail_win',
                    url: './order_detail_win.html',
                    bounces: false,
                    pageParam: {
                        folder: 'order_new',
                        title: '订单详情',
                        id: item.list.id,
                        type: item.item,
                        status: item.list.status,
                        insureCheck: item.list.insure_check,
                        money: item.list.money,
                        index: index
                    }
                });
            },
            action: function(event, item, index){
                // 获取按钮及按钮类型
                var target = event.target;
                var action = $api.attr(target, 'data-action');

                switch (action) {
                    case 'pay':
                        // 保险订单支付跳详情，方便使用优惠券和查看投保价格
                        if (item.item == "insure") {
                            vm.openWinDetail(item, index);
                            break;
                        }
                        api.openWin({
                            name: 'pay_win',
                            url: '../pay/pay_win.html',
                            pageParam: {
                                orderId: item.list.id,
                                deposit: item.list.money
                            }
                        });
                        break;
                    case 'comment':
                        api.openWin({
                            name: 'comment_win',
                            url: '../unit/win.html',
                            bounces: false,
                            pageParam: {
                                orderId: item.list.id,
                                orderType: item.item,
                                folder: 'order_new',
                                title: '评论'
                            }
                        });
                        break;                    
                    default:
                        return false;
                }
            }
        },
        computed: {
            // 计算当前筛选条件下共有几个订单
            orderNum: function(){ 
                var num = 0;
                this.list.forEach(function(item){
                    if (vm.isShow(item.item, item.list.status)) {
                        num ++;
                    }
                },this)
                return num;
            }
        },
        watch: {
            list: {
                handler: function(val, oldVal){
                    if (val.length !== oldVal.lenght) {
                        // 视图更新后触发
                        vm.$nextTick(function(){
                            vm.list.forEach(function(item, index){
                                /*滑动模块*/
                                mySwiper[index] = new Swiper('#' + index , {
                                    slidesPerView: 'auto',
                                    initialSlide: 0,
                                    resistanceRatio: .4,
                                    slideToClickedSlide: true,
                                    freeMode: true,
                                    freeModeSticky: true,
                                    autoplayStopOnLast: true,
                                    shortSwipes: false,
                                    threshold: 35
                                });          
                            });
                        })
                    }
                }
            }
        }
    })

    init();

};

/**********************************声明全局变量**********************************/
// 声明DOM对象
var dom = {}, mySwiper = {};


/**********************************初始化变量**********************************/
function init(){


    getData();

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

    // 刷新定单列表
    api.addEventListener({
        name: 'refreshOrder'
    }, function(ret, err){
        getData();
    });

    // 监听登录
    api.addEventListener({
        name: 'loginOk'
    }, function(ret, err){
        getData();
    });

    // 下拉刷新
    api.setRefreshHeaderInfo({
        visible: true,
        loadingImg: 'widget://image/refresh.png',
        bgColor: '#f4f4f4',
        textColor: '#fff',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        showTime: true,
    }, function(ret, err){
        getData();
    });

    // 监听删除定单
    api.addEventListener({
        name: 'delOrder'
    }, function(ret, err){
        vm.delOrder(ret.value.index);
    });

    api.addEventListener({
        name: 'setOrderType'
    }, function(ret, err){
        vm.orderType = ret.value.type;
        vm.status = 0;
    });

    api.addEventListener({
        name: 'setStatusIndex'
    }, function(ret, err){
        vm.status = ret.value.index;
    });
}

/**********************************DOM响应**********************************/

/**********************************其他函数**********************************/
function getData(){

    api.showProgress({
        title: '数据加载中...',
        text: '请稍候',
        modal: false
    });

    api.ajax({
        url: website + 'order_api.php?action=list',
        method: 'post',
        timeout: 30,
        data:{
            values:{
                ID: $api.getStorage('ID'),
                token: $api.getStorage('token'),
                item: undefined,
                status: 0,
            }
        },
        dataType: 'json',
        returnAll: false
    },function(ret,err){
        api.hideProgress();
        api.refreshHeaderLoadDone();
        if (!ret) {
            tea.toast('ajax');
            return false;
        };
        // 获取订单
        if (ret.succ == 1) {
            vm.list = ret.data;
            return true;
        }
        // 用户无订单
        if (ret.succ == 0) {
            vm.list = [];
            return true;
        }
        // 用户未登录
        if (ret.succ == 201) {
            vm.list = [];
            return false;
        }
        // api.toast({
        //     msg: ret.message,
        //     duration: 2000,
        //     location: 'middle'
        // });
    });
    

}