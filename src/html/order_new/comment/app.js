import BusinessType from 'public/business_type.js'

/**********************************声明全局变量**********************************/
// 声明DOM对象
var dom = {}, vm = null;

/**********************************apiready**********************************/
window.apiready = function(){
  
    let businessType = new BusinessType('all');
    let typeObj = businessType.getResult();

    vm = new Vue({
        el: '#app',
        data: {
            type: api.pageParam.orderType,
            typeArr: typeObj,
            tab: {
                bad: ['服务态度差', '办事效率低', '乱收费', '操作过于复杂'],
                good: ['服务态度好', '办事效率高', '价格合理', '公司值得信赖']
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
                            msg: '网络不佳，请检查后重试',
                            duration: 2000,
                            location: 'middle'
                        });
                        return false;
                    }
                    if (ret.succ != 1) {
                        api.openWin({
                            name: 'success',
                            url: '../unit/win.html',
                            bounces: false,
                            pageParam: {
                                folder: 'etc',
                                title: '评价成功',
                                closeToWin: 'main_win',
                                config: {
                                    result: '评价成功',
                                    item: [
                                        [
                                            {text:'提交成功'},
                                            {text:'恭喜您获得30积分'}
                                        ],
                                    ],
                                    btnGroup:[
                                        {title:'邀请朋友注册有奖励哦',styleClass:'tea-bg-blue',func:'invite'},
                                        {title:'返回首页',styleClass:'tea-bg-shallow-blue tea-text-blue border-blue',func:'main'}
                                    ]
                                }
                            }
                        });
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
                    errorMsg: '请为我们的服务打星～'
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