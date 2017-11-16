/**
 * Created by LVPlum on 2017/10/25.
 */

/*
window.apiready = function(){

    var data = api.pageParam.postVal;
    _alert(data);
    vm = new Vue({
        el: '#app',
        data: {
            plate: data.plate,
            carType: data.carType,
            install: data.install,
            address: data.address.name+data.address.tel+data.address.region+data.address.detail,
            tel: data.tel,
            is_vip: data.is_vip,
            ETCFee: data.ETCFee ? data.ETCFee : 350,
            installFee: data.installFee,
            store: data.store ? data.store : '合浦还珠南路小马哥审车处',
            couponFee: data.couponFee,
        },
        methods: {
            post: function(){
                var postVal = {
                    ID: $api.getStorage('ID'),
                    carnum: vm.plate,
                    tel: vm.tel,
                    cartype: vm.carType,
                    install: vm.checkedOn == '1' ? 'arrive' : 'on_spot',
                    addrid: data.address.addrid,
                    coupon_id: vm.coupon_id,
                };

            }
        },
        computed: {
            total: function(){
                _alert(ETCFee)
                var money;
                money = (vm.ETCFee + vm.installFee) - vm.couponFee ;
                money = tea.formatMoney(vm.money) < 0 ? 0.00 : tea.formatMoney(vm.money);
                return money;
            }
        },
        watch: {

        },
        components: {

        }
    })

    function saveOrder(postVal){
        tea.showp('提交中','',true);
        api.ajax({
            url: website + 'etc_api.php?action=save',
            method: 'post',
            timeout: 30,
            data: {
                values: postVal,
            }
        }, function (ret, err) {
            api.hideProgress();
            if(!ret){
                tea.toast('ajax');
                return false;
            }
            if(ret.succ == '1'){
                var value = {
                    paymoney: ret.data.money,
                    payid: ret.data.payid,
                    mtype: ret.data.mtype,
                    carnum: vm.plate,
                };
                toPay(value);
                return true;
            }
            //已提交ETC订单的
            if(ret.succ == '13'){
                api.confirm({
                    title: '该车辆已办理过ETC',
                    msg: '是否再次购买?',
                    buttons: ['确定', '取消']
                }, function(ret, err) {
                    if(ret.buttonIndex == '1'){
                        postVal.check = 'unnecessary';
                        saveOrder(postVal)
                    }
                });
                return false;
            }
            api.toast({
                msg: ret.msg,
                duration: 2000,
                location: 'middle'
            });
        });
    }
}*/
