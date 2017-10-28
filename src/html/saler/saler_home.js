import card from './card.vue'

let vm;

window.apiready = function(){

    vm = new Vue({
        el: "#app",
        data: {
            card: {
                head: {
                    text: '1234',
                    icon: 'tea-icon-cross'
                },
                content: {
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
                    text: '抢单',
                    color: 'tea-text-yellow',
                    klass: 'aui-border-t'
                }
            }
        },
        components: {
            'card': h => h(card)
        },
        methods: {
            openFrm: function(index){
                api.openFrame({
                    name: 'saler_mask',
                    url: './saler_mask.html',
                    bounces: false,
                    bgColor: 'rgba(0,0,0,0.4)',
                    rect: {
                        x: 0,
                        y: 0,
                        w: 'auto',
                        h: 'auto'
                    }
                });
            }
        },
        created: function(){
        }
    });
}