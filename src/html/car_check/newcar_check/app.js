/**
 * Created by LVPlum on 2017/10/28.
 */

import plate from 'public/input-plate.vue'
//import time from 'public/input-time.vue'

window.apiready = function(){
    vm = new Vue({
        el: '#app',
        data: {
            province: '桂E',
            number: '',
            time: '2017-01-10 10点',
            address: '',
            index: 0,      //地址下标，默认为0
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
                }
            },
            submitOrder: function(){
                if(this.errorMsg){
                    api.toast({
                        msg: this.errorMsg,
                        duration: 2000,
                        location: 'middle'
                    });
                }else {
                    saveOrder();
                }
            },
            updataMsg: function(type,val){
                _alert(val)
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
                rule.add(this.tel, [{
                    condition: 'isNoEmpty',
                    errorMsg: '请选择联系方式和地址'
                }]);
                var errorMsg = rule.start();
                return errorMsg;
            }
        },
        watch: {

        },
        components: {
            'input-plate': h => h(plate),
        }
    })
    //初始化页面数据
    getData();

    // 初始化模块
    initModule();

    // 初始化监听
    initEventListener();
}