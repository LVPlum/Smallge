/**
 * Created by LVPlum on 2017/10/25.
 */

import option from 'public/input-option.vue'
import address from 'public/option-send.vue'
import coupon from 'public/coupon.vue'

window.apiready = function(){

    var data = api.pageParam;

    vm = new Vue({
        el: '#app',
        data: {
            province: '桂E',
            number: '',
            plate: data.plate,
            checkedOn: '1',
            carType: data.carType,
            optionConfig:{
                title: '安装方式',
                way: [
                    {title:'到店安装',id:'1'},
                    {title:'上门安装',id:'2'}
                ],
            },
            store: '合浦还珠南路小马哥审车处',
            tel: $api.getStorage('tel'), //到店办理，默认为用户手机号
            address: data.address,
            vipCount: '0',
            is_vip: data.is_vip,                   //是否是vip，1是，0否
            ETCFee: data.ETCFee,
            installFee: data.installFee,
            couponFee: 0,
            coupon_type: 'etc',
            couponList: [],
            coupon_id: '',
        },
        methods: {
            checked:function(value){
                vm.checkedOn = value
            },
            updataMsg: function(type,val){
                switch (type){
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
                        this.couponFee = val.fee;
                        this.coupon_id = val.feeID;
                        break;
                }
            }
        },
        computed: {
            errorMsg: function(){
                var rule = new tea.checkRule();
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
                            errorMsg: this.errorMsg,
                            fee: {
                                ETCFee: this.ETCFee,
                                installFee: this.installFee,
                                couponFee: this.couponFee,
                            }
                        }
                    });
                },
                immediate: true //立即调用
            },
            couponFee: {
                handler: function(){
                    api.sendEvent({
                        name: 'formReady',
                        extra: {
                            errorMsg: this.errorMsg,
                            fee: {
                                ETCFee: this.ETCFee,
                                installFee: this.installFee,
                                couponFee: this.couponFee,
                            }
                        }
                    });
                }
            }
        },
        components: {
            'input-option' : h => h(option),
            'site' : h => h(address),
            'coupon': h => h(coupon),
        }
    })

    getData();
}