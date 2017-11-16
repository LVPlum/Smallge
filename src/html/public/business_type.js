
let typeObj = {
    check: {
        title: '网约审车',
        icon: 'tea-icon-check',
        color: '#41a4ec'
    },
    // 网约审车（六年内）
    exempt: {
        title: '网约审车',
        icon: 'tea-icon-check',
        color: '#41a4ec'
    },
    insure: {
        title: '车辆保险',
        icon: 'tea-icon-insure',
        color: '#ff855e'
    },
    tel: {
        title: '话费充值',
        icon: 'tea-icon-tel',
        color: '#ff855e'
    },
    agency: {
        title: '找代办',
        icon: 'tea-icon-agency',
        color: '#00be9b'
    },
    join: {
        title: '加盟申请',
        icon: 'tea-icon-agency',
        color: '#00be9b'
    },
    vip: {
        title: 'VIP订单',
        icon: 'tea-icon-vip',
        color: '#ffc50f'
    },
    etc: {
        title: 'ETC订单',
        icon: 'tea-icon-etc',
        color: '#4fc9e8'
    },
    oil: {
        title: '超值加油',
        icon: 'tea-icon-oil',
        color: '#f5b35e'
    }
}

class BusinessType {
    // 按传入的业务类型，生成新对象
    constructor(typeArr){
        this.typeObj = typeObj
        if (typeArr = 'all') {
            this.result = this.typeObj;
        }
        else {
            let result = {};
            typeArr.forEach(function(item) {
                arr[item]= this.typeObj[item]
            }, this);
            this.result = result;
        }
    }
    addProperty(type, obj){
        Object.assign(this.result[type], obj);
    }
    getResult(){
        return this.result;
    }
}


export default BusinessType