/**********************************声明全局变量**********************************/
// 声明DOM对象
var dom = {}, vm = null;

/**********************************apiready**********************************/
apiready = function(){

    vm = new Vue({
        el: '#app',
        data: {
            type: api.pageParam.orderType,
            typeArr: {
                check: {
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
                    title: 'VIP',
                    icon: 'tea-icon-vip',
                    color: '#ffc50f'
                },
                etc: {
                    title: 'ETC',
                    icon: 'tea-icon-etc',
                    color: '#4874dc'
                },
                oil: {
                    title: '超值加油',
                    icon: 'tea-icon-oil',
                    color: '#f5b35e'
                }
            },
            tab: {
                bad: ['销售服务差', '车辆不满意', '时间慢', '价格不合理'],
                good: ['销售服务好', '车辆满意', '时间快', '公司值得信赖']
            },
            tabSetted: {
                bad: [],
                good: []
            },
            star: 0,
            opinion: ''
        },
        methods: {
            setStar: function(index){
                this.star = index;
            },
            setTab: function(item){
                var arr = this.tabSettedNow;
                var index = arr.indexOf(item)
                if (~index) {
                    arr.splice(index, 1);
                }
                else {
                    arr.push(item);
                }
            },
            submit: function(){
                if (this.errorMsg) {
                    api.toast({
                        msg: this.errorMsg,
                        duration: 2000,
                        location: 'middle'
                    });
                    return false;
                }
                var tab = this.tabSettedNow.toString();
                $api.post(website + 'judge_api.php?action=pj',{
                    values: {
                        ID: $api.getStorage('ID'),
                        token: $api.getStorage('token'),
                        orderid: api.pageParam.orderId,
                        order_type: api.pageParam.orderType,
                        star: vm.star,
                        tab: tab,
                        content: vm.opinion
                    }
                }, function(ret){
                    if (!ret) {
                        api.toast({
                            msg: '网络未连接，请检查后重试',
                            duration: 2000,
                            location: 'middle'
                        });
                        return false;
                    }
                    if (ret.succ == 1) {
                        setTimeout(api.closeWin(), 1000); 
                    }
                    api.toast({
                        msg: ret.msg,
                        duration: 2000,
                        location: 'middle'
                    });
                });
            }
        },
        computed: {
            // 3星及以下为差评，0星默认好评
            isGood: function (){
                return this.star > 3 || this.star == 0? 'good' : 'bad';
            },
            // 当前显示的标签
            tabNow: function() {
                return this.tab[this.isGood];
            },
            // 当前已选中标签
            tabSettedNow: function(){
                return this.tabSetted[this.isGood];
            },
            errorMsg: function(){
                var rule = new tea.checkRule();
                rule.add(this.star, [{
                    condition: 'isTrue',
                    errorMsg: '请至少选择一颗星'
                }]);
                var errorMsg = rule.start();
                return errorMsg;
            }
        },
        watch: {

        }
    })

    // 初始化
    init();

};

/**********************************初始化变量**********************************/
function init(){

    dom = {
    };

    // 初始化模块
    initModule();

    // 初始化监听
    initEventListener();

};

/**********************************初始化模块**********************************/
function initModule(){



}

/**********************************初始化监听**********************************/
function initEventListener(){



}

/**********************************DOM响应**********************************/

/**********************************其他函数**********************************/