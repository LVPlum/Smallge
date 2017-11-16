/**
 * Created by LVPlum on 2017/10/25.
 */

import plate from 'public/input-plate.vue'
import option from 'public/input-option.vue'
import address from 'public/option-send.vue'
import coupon from 'public/coupon.vue'

window.apiready = function(){

    vm = new Vue({
        el: '#app',
        data: {
            province: '桂E',
            number: '',
            checkedOn: '1',
            carType: 'sedan',
            optionConfig:{
                title: '安装方式',
                way: [
                    {title:'到店安装',id:'1'},
                    {title:'上门安装',id:'2'}
                ],
            },
            store: '深圳市产业园基地',
            tel: $api.getStorage('tel'), //到店办理，默认为用户手机号
            address: '',
            vipCount: '0',
            is_vip: 0,                   //是否是vip，1是，0否
            coupon_type: 'etc',
            couponList: [],
            couponFee: 0,
            coupon_id: '',
            ETCFee: 350,
            installFee: 0,
        },
        methods: {
            checked:function(value){
                if(value == '2'){
                    api.alert({
                        title: '上门安装',
                        msg: '仅限北海市区与合浦县城',
                        buttons: ["知道了"]
                    }, function(ret, err) {
                    });
                }
                vm.checkedOn = value
            },
            selectCarType:function(type){
                if(type == 'truck'){
                    api.alert({
                        title: 'ETC仅限小车',
                        msg: '货车即将开通，敬请期待',
                        buttons: ["知道了"]
                    }, function(ret, err) {
                    });
                    return false
                }
                vm.carType = type;
            },
            updataMsg: function(type,val){
                switch (type){
                    case 'is_vip':
                        checkVip(vm.province+vm.number);
                        break;
                    case 'prov': //更新车牌省份
                        vm.province = val.value.province + val.value.city;
                        checkVip(vm.province+vm.number);
                        break;
                    case 'pla': //更新车牌号和联系方式,车辆是否加入vip
                        vm.province = val.value.car.slice(0,2);
                        vm.number = val.value.car.slice(2);
                        vm.tel = val.value.tel;
                        vm.is_vip = val.value.is_vip;
                        break;
                }
            }
        },
        computed: {
            errorMsg: function(){
                var rule = new tea.checkRule();
                rule.add(this.number, [{
                    condition: 'isNoEmpty',
                    errorMsg: '请输入车牌号码'
                }]);
                var errorMsg = rule.start();
                return errorMsg;
            }
        },
        watch: {
            errorMsg: {
                handler: function(){
                    api.sendEvent({
                        name: 'formReady',
                        extra: {
                            ready: this.errorMsg,
                        }
                    });
                },
                immediate: true //立即调用
            }
        },
        components: {
            'input-plate' : h => h(plate),
        }
    })

    getData();
}