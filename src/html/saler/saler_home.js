import card from './card.vue'

let vm;

window.apiready = function(){

    vm = new Vue({
        el: "#app",
        data: {
            head: {
                text: '',
                icon: 'aui-icon-right'
            },
            foot: {
                text: '抢单',
                color: 'tea-text-yellow',
                klass: 'aui-border-t'
            },
            list: [],
            content: {
                list: [{

                }]
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
            alert(2)
            $api.post(website + '/exempt_salesman/index.php?action=list', {
                values: {
                    ID: $api.getStorage('ID'),
                    token: $api.getStorage('token')
                }
            }, (ret, err) => {
                _alert(ret)
                if (!ret) {
                    tea.toast('ajax');
                    return false;
                }
                if (ret.succ == 1) {
                    this.list = ret.data;
                    this.list.forEach(function(item, index) {
                        item.content = {
                            list: [{
                                text: item.address,
                                icon: 'tea-icon-location',
                                vip: true
                            }]
                        }
                    }, this);
                }
            });
        }
    });
}