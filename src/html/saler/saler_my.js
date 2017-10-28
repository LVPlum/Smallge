import card from './card.vue'

let vm;

window.apiready = function(){

    vm = new Vue({
        el: "#app",
        data: {
            card: {
                head: {
                    text: '',
                    icon: 'tea-icon-cross'
                },
                content: {
                    klass: '',
                    list: [{
                        text: '123',
                        icon: 'tea-icon-check',
                        vip: true
                    },{
                        text: '123',
                        icon: 'tea-icon-check',
                        vip: false                        
                    }]
                }
            }
        },
        components: {
            'card': h => h(card)
        },
        methods: {
            closeFrm: function(index){
                api.closeFrame();
            }
        },
        created: function(){
        }
    });
}