/**
 * Created by LVPlum on 2017/10/21.
 */
import plate from './input-plate.vue'
import time from './input-time.vue'
import option from './input-option.vue'
import address from './option-send.vue'

window.apiready = function(){

    vm = new Vue({
        el: '#app',
        data: {
            province: '桂E',
            number: '',
            time: '2017-01-10 10点',
            tel: '',
            address: '',
            checkedOn: '',
            store: '合浦还珠南路小马哥审车处',
            card_brand: api.pageParam.card_brand,
            card_type: api.pageParam.card_type,
            optionConfig:{
                title: '取卡方式',
                way: [
                    {title:'到店自取',id:'1'},
                    {title:'邮寄',id:'2',money:'10'}
                ],
            }
        },
        methods: {
            goto: function(type){
                switch (type){
                    case 'province':
                        openWinPlateProvince();
                        break;
                    case 'plate':
                        openWinPlateNum();
                        break;
                    case 'date':
                        openWinDateSelect();
                        break;
                    case 'address':
                        openWinAddress(vm.address.addrid);
                        break;
                    case 'recharge':
                        openWinRecharge();
                        break;
                }
            },
            checked: function(type){
                vm.checkedOn = type
            },
            updataMsg: function(type,val){
                if(type == 'prov'){
                    vm.province = val.value.province + val.value.city;
                }
                if(type == 'pla'){
                    vm.province = val.value.car.slice(0,2);
                    vm.number = val.value.car.slice(2);
                    vm.tel = val.value.tel;
                }
                if(type == 'time'){
                    vm.time = val.value.strtime
                }
                if(type == 'selectAddress'){
                    vm.address = val.value.address;
                    vm.add = val.value.index
                }
                if(type == 'saveOk'){
                    getData();
                }
                if(type == 'editorOk'){
                    getAddressDetail(val.value.addrid);
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
                rule.add(this.time, [{
                    condition: 'isNoEmpty',
                    errorMsg: '请选择预约时间'
                }]);
                //_alert(this.checkedOn)
                rule.add(this.checkedOn, [{
                    condition: 'isNoEmpty',
                    errorMsg: '请选择取卡方式'
                }]);
                if(this.checkedOn=='1'){
                    rule.add(this.tel, [{
                        condition: 'isPhone',
                        errorMsg: '请输入手机号码'
                    }]);
                }
                if(this.checkedOn == '2'){
                    rule.add(this.address, [{
                        condition: 'isNoEmpty',
                        errorMsg: '请选择地址'
                    }]);
                }
                var errorMsg = rule.start();
                return errorMsg;
            }
        },
        watch: {

        },
        components: {
            'input-plate' : h => h(plate),
            'input-time' : h => h(time),
            'input-option' : h => h(option),
            'site' : h => h(address),
        }
    })

    // 初始化模块
    initModule();

    // 初始化监听
    initEventListener();

    getData();
}