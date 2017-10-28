import card from './card.vue'

let vm;

window.apiready = function(){

    vm = new Vue({
        el: "#app",
        data: {
            card: {
                head: {
                    text: '预约单',
                    icon: 'tea-icon-cross'
                },
                content: {
                    klass: 'aui-border-t',
                    list: [{
                        text: '123',
                        icon: 'tea-icon-check',
                        vip: true
                    },{
                        text: '123',
                        icon: 'tea-icon-check',
                        vip: false                        
                    }]
                },
                foot: {
                    text: '确认抢单',
                    klass: 'tea-bg-yellow',
                    color: 'tea-text-title'
                }
            }
        },
        components: {
            'card': h => h(card)
        },
        methods: {
            closeFrm: function(index){
                api.closeFrame();
            },
            sure: function(){
                //vm.closeFrm();
                api.openWin({
                    name: 'saler_order_detail_win',
                    url: '../unit/win.html',
                    bounces: false,
                    pageParam: {
                        title : '订单详情',
                        folder: 'saler'
                    }
                });
            }
        },
        created: function(){
        }
    });
}