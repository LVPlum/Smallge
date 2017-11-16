let pageParam = {
    check: {
    },
    insure: {
        url: 'buybx.php?action=checkpay',
        values: (info) => {
            return {
                bxid: info.id
            }
        },
        param: (info) => {
            let values = {
                bxid: info.id,
                carnum: info.carnum,
                paymoney: info.originalPrice,
                mtype: '13',
                coupon_id: info.couponId, //现金券id
                coupon_m: info.couponFee,    //优惠金额
            };
            return {
                title:'支付保险订单',
                money: info.originalPrice,
                result_m: info.orderPrice,
                type: 'insure',
                values: values
            }
        }
    },
    // 目前VIP只有支付成功才会生成订单，所以不支持修改
    vip: {
        url: 'api.php?action=checkcarnum',
        values: (info) => {
            return {
                id: info.userid,
                carnum: info.carnum,
                car_type: info.car_type,
                telphone: info.tel,
                able: 1,
                vip_tmp_order_id: info.id
            }
        },
        // param: (info) => {
        //     var json = {
        //         carid:  values.carid,
        //         carnum: values.carnum,
        //         tel: info.tel,
        //         carcolor: values.carcolor,
        //         paymoney: values.paymoney,
        //         addcar: addcar,
        //         mtype: '8',
        //         coupon_id: values.coupon_id, //现金券id
        //         coupon_m: values.coupon_m,    //优惠金额
        //     };
        //     return {
        //         title:'支付VIP费用',
        //         money: values.paymoney,
        //         result_m: parseFloat(values.paymoney) - parseFloat(values.coupon_m),
        //         type: 'addvip',
        //         values: json
        //     }
        // } 
    },
    agency: {
        name: "agency_win",
        url: "../agency/agency_win.html",
        order: (param) => {
            return {
                car_type: param.car_type,
                area: param.area,
                tel: param.tel,
                booktime: param.booktime,
                business: param.business
            }
        }
    },
    join: {
        name: "agency_join_win",
        url: "../agency/agency_join_win.html",
        order: (param) => {
            return {

            }
        }
    }

}

class OrderPay {
    constructor(type, info){
        this.info = info;
        this.type = type;
        this.item = pageParam[this.type];
    }
    // 验证是否已经购买过相关商品
    isBuyed(callback){
        api.showProgress({
            title: '支付验证中...',
            text: '请稍后',
            modal: true
        });               
        let values = this.item.values(this.info);
        let url = this.item.url;
        $api.post(website + url, {
            values: values
        }, (ret, err) =>{
            api.hideProgress();
            if (!ret) {
                tea.toast('ajax');
                return false;
            }
            if (ret.succ == 0) {
                let param = this.item.param(this.info);
                //_alert(param)
                callback(param);
                return true;
            }
            api.toast({
                msg: ret.msg,
                duration: 2000,
                location: 'middle'
            });
        });
    }
    openWin(param){
        tea.openWin({
            name: 'pay_win',
            url: '../pay/pay_win.html',
            bounces: false,
            pageParam: param
        });
    }
}

export default OrderPay