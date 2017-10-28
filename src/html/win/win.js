window.apiready = function() {
    let header = document.getElementById('header');
    let footer = document.getElementById('footer');
    let headerH = $api.offset(header).h;
    let footerH = $api.offset(footer).h;
    let winH = api.winHeight;
    $api.fixStatusBar(header);

    let data = api.pageParam;
    let url = data.url;
    let title = data.title;

    document.getElementById('title').innerHTML = title;
    let pageload = 0;
    if (api.systemType == "ios") {
        openFrame();
    } else {
        //viewappear事件在ios中首次打开不会调用，在安卓使用以避免切换时加载frame造成卡顿。
        api.addEventListener({
            name: 'viewappear'
        }, function(ret, err) {
            if (pageload < 1) {
                openFrame();
            }
            pageload++;
        });
    }
    openFrame();
    
    function openFrame(){
        let frmName = api.winName.replace('_win', '');
        alert(frmName)
        return
        api.openFrame({
            name: frmName,
            url: '../' + data.folder + '/' + frmName + '.html',
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

function closeWin(){
    api.closeWin();
}