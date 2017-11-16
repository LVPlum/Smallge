import Profile from './profile.vue'
import DetailList from './detail-list.vue'
import Bill from './bill.vue'
import Coupon from 'public/coupon.vue'
import SimpleList from 'public/simple-list.vue'
import BusinessType from 'public/business_type.js'
import OrderPay from '../order_pay.js'

window.apiready = function(){

    let businessObj = initTypeObj('all');

    vm = new Vue({
        el: '#app',
        data: {
            couponId: '',
            couponFee: 0,
            info: '',
            type: api.pageParam.type,
            businessObj: businessObj,
        },
        methods: {
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
            setBill: function(status){
                this.info.send_bill = status;
            },
            openWinComment: function(orderid, type){
                api.openWin({
                    name: 'comment_win',
                    url: '../unit/win.html',
                    bounces: false,
                    pageParam: {
                        orderId: orderid,
                        orderType: type,
                        folder: 'order_new',
                        title: '评论'
                    }
                });         
            },
            updateCoupon: function(type, obj) {
                vm.couponId = obj.id;
                vm.couponFee = obj.fee;
            }
        },
        computed: {
            typeObj: function(){
                return this.businessObj[this.type];
            },
            fee: function(){
                var info = this.info;
                return {
                    orderFee: info.money, //订单价格
                    needpay: info.needpay, //发票价格
                    sendBill: info.send_bill, //是否邮寄
                    postFee: info.send_bill == 1 ? info.send_bill_fee : 0, //邮寄费用
                    travelFee: info.a11, 
                    couponFee: this.couponFee
                }
            }
        },
        components: {
            'profile': h => h(Profile),
            'detail': h => h(DetailList),
            'bill': h => h(Bill),
            'coupon': h => h(Coupon),
            'simple-list': h => h(SimpleList)
        },
        watch: {
            fee: {
                handler: function(val){
                    api.sendEvent({
                        name: 'updateOrderFee',
                        extra: val
                    });                    
                },
                deep: true,
                immediate: true
            }
        },
        created: function(){
            api.addEventListener({
                name: 'orderPay'
            }, (ret, err) => {
                // 原价和最终价格
                vm.info.originalPrice = ret.value.originalPrice;
                vm.info.orderPrice = ret.value.orderPrice;
                // 优惠券ID和金额
                vm.info.couponId = vm.couponId;
                vm.info.couponFee = vm.couponFee;
                // 实例化订单模块，检查是否支付过后打开支付页面
                let orderPay = new OrderPay(vm.type, vm.info);
                orderPay.isBuyed(orderPay.openWin);
            });
        }
    })

    // 初始化模块
    initModule();

    // 初始化监听
    initEventListener();

    getData(api.pageParam.id, api.pageParam.type);
    
};

function initEventListener(){
    
}


function initTypeObj(typeArr){
    let businessType = new BusinessType('all');
    businessType.addProperty('check', {
        profile: function(){
            var info = vm.info;
            return ['车牌：' + info.carnum, '手机号码：' + info.tel, '预约时间：' + info.booktime];
        },
        detailConfig1: function(){
            var content = [];
            vm.info.business.forEach(function(item, index){
                var arr = {
                    left: item.name,
                    right: '¥' + tea.formatMoney(item.fee)
                };
                content.push(arr);
            });
            return {
                title: '代办业务',
                content: content
            };
        },
        detailConfig2: function(){
            var info = vm.info;
            var content = [{
                left: info.checkstation,
                leftClass: 'aui-font-size-16 tea-text-title'
            },{
                left: info.address,
                leftClass: ''
            }];
            return {
                title: '监测站',
                content: content
            }
        }        
    });
    businessType.addProperty('exempt', {
        carnum: function(item){
            return item.carnum;
        },
        desc: function(item){
            return item.checkstation
        },
        price: function(item){
            return '¥' + tea.formatMoney(item.money)
        }
    });
    businessType.addProperty('insure', {
        profile: function(){
            var info = vm.info;
            return [info.insurer, '车牌：' + info.carnum];
        },
        detailConfig1: function(){
            var info = vm.info;
            // 有上传图片和手动输入资料两种方式
            if (info.img != '') {
                var content = [{
                    type: 'img',
                    left: '行驶证照片',
                    right: 'carrexsz_img/' + info.img
                }]
            }
            else {
                var content = [{
                    left: '车架号',
                    right: info.cjh
                },{
                    left: '姓名',
                    right: info.xm
                },{
                    left: '身份证',
                    right: info.sfz
                }]
            }
            content.push({
                left: '手机号码',
                right: info.tel
            })
            return {
                title: '保险资料',
                content: content
            };
        },
        detailConfig2: function(){
            var content = [];
            vm.info.insurance_item.forEach(function(item){
                content.push({
                    left: item.item,
                    right: item.fee == 0? '审核中' : '¥' + tea.formatMoney(item.fee)
                })
            });
            return {
                title: '投保明细',
                content: content
            }
        }
    });
    businessType.addProperty('agency', {
        profile: function(){
            var info = vm.info;
            var carType = info.car_type == 1 ? '轿车' : '货车';
            return [info.agancy_name, '车辆类型：' + carType, '手机号码：' + info.tel];
        },
        detailConfig1: function(){
            var content = [];
            vm.info.business.forEach(function(item, index){
                var arr = {
                    left: item.name,
                    right: '¥' + tea.formatMoney(item.money)
                };
                content.push(arr);
            })
            return {
                title: '代办业务',
                content: content
            };
        },
        detailConfig2: function(){
            var info = vm.info;
            var content = [{
                left: '时间',
                right: info.booktime
            }];
            return {
                title: '代办预约时间',
                content: content
            }
        }
    });
    businessType.addProperty('join',{
        profile: function(){
            var info = vm.info;
            return [info.agancy_name, '地址：' + info.shop_address, '手机号码：' + info.tel];
        },
        detailConfig1: function(){
            var info = vm.info;
            var content = [];
            var business =  (JSON.stringify(info.c_business) == '[]') ? info.v_business : info.c_business;
            business.forEach(function(item, index){
                var arr = {
                    left: item.item
                };
                content.push(arr);
            })
            return {
                title: '加盟业务',
                content: content
            };
        },
        detailConfig2: function(){
            var info = vm.info;
            var content = [{
                left: (JSON.stringify(info.c_business) == '[]') ? '货车' : '轿车',
            }];
            return {
                title: '加盟业务类型',
                content: content
            }
        } 
    });
    businessType.addProperty('vip', {
        profile: function(){
            var info = vm.info;
            return ['车牌：' + info.carnum, '手机号码：' + info.tel, '费用：¥' + tea.formatMoney(info.money)];
        },
        detailConfig1: function(){
            var desc = [
                "1、终身免年审检测费用",
                "2、终身免环保检测费用",
                "3、终身免等级评定检测费用",
                "4、终身免二级维护检测费用",
                "5、环检修理免费、灯光修理免费、刹车修理免费，配件除外。",
                "6、蓝牌特权VIP卡用户购保险享受特殊优惠(除车船使用税)",
                "7、黄牌货车特权VIP卡购买保险同样享受特殊优惠(除车船使用税)特权VIP卡名下的车辆（限一台，可变更）,相对应在红骏马检测中心进行检测不限次数、终身免费(除国家政策或其它因素影响之外)，购买成功则不可退款，确保特权VIP卡车辆享受不少于三次免费检测，检测不足三次可按实际结算退还特权VIP卡购买费用的剩余部份（年检期间不按时来检测，此特权VIP卡车辆责任自负）"
                ];
            var content = [];
            desc.forEach(function(item){
                content.push({
                    left: item,
                    leftClass: 'tea-text-title'
                });
            });
            content.push({
                left: '- 在小马哥购买保险才可享受以上特权 -',
                leftClass: 'aui-text-center width-100'
            });
            return {
                title: '特权卡享受以下特权',
                content: content
            };
        }        
    });
    businessType.addProperty('etc',{
        profile: function(item){
            let info = vm.info;
            let installType = info.install == 1 ? '上门安装' : '到店安装';
            return [installType, info.carnum, '店铺地址：' + '合浦还珠南路小马哥审车处', '手机号码：' + info.tel]
        },
        detailConfig1: function(){
            if (vm.info.status != 1) return false;
            return {
                title: '',
                content: [{
                    left: '商品售价',
                    leftClass: 'aui-font-size-16 tea-text-title',
                    right: '¥350',
                    rightClass: 'aui-font-size-16 tea-text-title',
                },{
                    left: '现金券',
                    leftClass: 'aui-font-size-16 tea-text-title',
                    right: '- ¥200',
                    rightClass: 'aui-font-size-16 tea-text-orange',                    
                }]
            }
        }
    });
    return businessType.getResult();    
}