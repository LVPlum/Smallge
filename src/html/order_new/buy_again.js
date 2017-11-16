let pageParam = {
    check: {
        name: 'car_check_partOne_win',
        url: '../car_check/car_check_partOne_win.html',
        order: (param) => {
            return {
                carnum: param.carnum,
                plate: param.carnum,
                telphone: param.telphone,
                stationid: param.stationid,
                telphone: param.tel,
                retime: param.booktime,
                business: param.business
            }
        }
    },
    insure: {
        name: 'insure_win',
        url: '../insure/insure_win.html',
        order: (param) => {
            return {
                carnum: param.carnum,
                licenseNum: param.cjh,
                realName: param.xm,
                idNum: param.sfz,
                tel: param.tel,
                img: param.img,
                insurance_item: param.insurance_item             
            }
        }
    },
    // 目前VIP只有支付成功才会生成订单，所以不支持修改
    vip: {
        name: 'vip_join_win',
        url: '../vip/vip_join_win.html',
        order: (param) => {
            return {

            }
        }
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
                business_lisence: param.business_license,
                business_license_image: param.business_license_image,
                legal_person_image: param.legal_person_image,
                shop_image: param.shop_image,
                agency_name: param.agency_name,
                tel: param.tel,
                service_call: param.service_call,
                shop_address: param.shop_address,
                c_business: param.c_business,
                v_business: param.v_business
            }
        }
    }

}

class BuyAgain {
    constructor(param, type){
        this.param = param;
        this.type = type;
    }
    openWin(actionType){
        let obj = pageParam[this.type];
        let order = obj.order(this.param);
        // 如果是直接修改订单则加上订单ID和修改标志able
        if (actionType === 'change') {
            order.ID = this.param.id;
            order.able = this.param.able;
        }
        //_alert(order)
        tea.openWin({
            name: obj.name,
            url: obj.url,
            bounces: false,
            pageParam: {
                order : order
            }
        });
    }
}

export default BuyAgain