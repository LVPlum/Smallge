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
            optionConfig:{
                title: '安装方式',
                way: [
                    {title:'到店安装',id:'1'},
                    {title:'上门安装',id:'2'}
                ],
            },
            store: '',
            tel: '',
            address: '',
            vipCount: '0',
            is_vip: false,
            coupon_type: 'check',
            couponList: [],
            couponFee: 0,
        },
        methods: {
            clear: function(key){
                vm[key] = '';
            },
            checked:function(value){
                  vm.checkedOn = value
            },
            updataMsg: function(type,val){
                switch (type){
                    case 'is_vip':
                        _alert(vm.province+vm.number);
                        if(checkVip(vm.province+vm.number)){
                        }
                        break;
                    case 'prov': //更新车牌省份
                        vm.province = val.value.province + val.value.city;
                        break;
                    case 'pla': //更新车牌号和联系方式
                        vm.province = val.value.car.slice(0,2);
                        vm.number = val.value.car.slice(2);
                        vm.tel = val.value.tel;
                        break;
                    case 'selectAddress': //更新地址选择
                        vm.address = val.value.address;
                        break;
                    case 'saveOk': //更新保存新增地址
                        getData();
                        break;
                    case 'editorOk': //更新修改地址
                        getAddressDetail(val.value.addrid);
                        break;
                    case 'coupon': //更新现金券金额
                        this.couponFee = val
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
                if(this.checkedOn=='1'){
                    rule.add(this.tel, [{
                        condition: 'isPhone',
                        errorMsg: '请输入格式正确的手机号码'
                    }]);
                }
                if(this.checkedOn=='2'){
                    rule.add(this.address, [{
                        condition: 'isNoEmpty',
                        errorMsg: '请输入正确的联系地址'
                    }]);
                }
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
                            couponFee: this.couponFee
                        }
                    });
                },
                immediate: true //立即调用
            }
        },
        components: {
            'input-plate' : h => h(plate),
            'input-option' : h => h(option),
            'site' : h => h(address),
            'coupon': h => h(coupon),
        }
    })

}