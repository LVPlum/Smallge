import tab from './tab.vue'

let vm;
const index = 1;

window.apiready = function(){

    vm = new Vue({
        el: "#app",
        data: {
            list: ['我的', '首页', '更多'],
            index: index
        },
        components: {
            'tab': h => h(tab)
        },
        methods: {
            setTabIndex: function(index){
                if (index > 1) {
                    tea.toast('disable');
                    return false;
                }
                this.index = index;
                api.setFrameGroupIndex({
                    name: 'tabFrms',
                    index: index,
                    scroll: true
                });
            }
        },
        created: function(){
            alert(134)
        }
    });

    // 处理沉浸式效果，计算header和footer的高度
    let header = $api.byId('header');
    $api.fixStatusBar(header);
    let headerH = $api.offset(header).h;
    let footer = $api.byId('footer');
    let footerH = $api.offset(footer).h;

    api.openFrameGroup({
        name: 'tabFrms',
        scrollEnabled: true,
        rect: {
            x:0,
            y: headerH - 1 ,
            w:'auto',
            h: api.winHeight - headerH - footerH + 1
        },
        index: index,
        frames: [{
            name: 'saler_my', 
            url: './saler_my.html'
        },{
            name: 'saler_home', 
            url: './saler_home.html'
        }]
    }, function(ret, err){
        vm.index = ret.index;
    });
}
    