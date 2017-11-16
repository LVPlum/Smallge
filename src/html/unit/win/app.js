window.apiready = function() {
    let header = document.getElementById('header');
    let footer = document.getElementById('footer');
    $api.fixStatusBar(header);
    let headerH = $api.offset(header).h;
    let footerH = $api.offset(footer).h;
    let winH = api.winHeight;

    let data = api.pageParam;

    let vm = new Vue({
        el: "#app",
        data: {
            title: api.pageParam.title,
            folder: api.pageParam.folder
        },
        methods: {
            closeWin: function(){
                if(api.pageParam.closeToWin){
                    api.closeToWin({
                        name: api.pageParam.closeToWin,
                        animation: {
                            type: 'none',
                            subType: 'from_bottom',
                            duration: 500
                        }
                    });
                }else {
                    api.closeWin();
                }
            }
        }
    })

    function initEventListener(){
        api.addEventListener({
                name: 'keyback'
            }, function(ret, err) {
                vm.closeWin()
        });
    } 
    initEventListener();
    openFrame();
    // let pageload = 0;
    // if (api.systemType == "ios") {
    //     openFrame();
    // } else {
    //     //viewappear事件在ios中首次打开不会调用，在安卓使用以避免切换时加载frame造成卡顿。
    //     api.addEventListener({
    //         name: 'viewappear'
    //     }, function(ret, err) {
    //         if (pageload < 1) {
    //             openFrame();
    //         }
    //         pageload++;
    //     });
    // }
    function openFrame(){
        let frmName = api.winName.replace('_win', '');
        api.openFrame({
            name: frmName,
            url: '../' + api.pageParam.folder + '/' + frmName + '.html',
            rect: {
                x: 0,
                y: headerH,
                w: 'auto',
                h: winH - headerH - footerH
            },
            pageParam: data,
            bounces: false,
            vScrollBarEnabled: true,
            hScrollBarEnabled: true
        });
    }
}