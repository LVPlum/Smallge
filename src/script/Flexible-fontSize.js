
/*
*   移动端 手机适配 兼容所有手机屏幕适配
*   CODER ：马叔（mqq）
*   默认 ：1rem = 20 px ;  设计稿：iPhone6  的尺寸
* **/

(function (doc, win) {
    console.log("dpr:"+win.devicePixelRatio);
    var docEle = doc.documentElement,
        isIos = navigator.userAgent.match(/iphone|ipod|ipad/gi),
        dpr=Math.min(win.devicePixelRatio, 3);       
    	scale = 1 / dpr;
    	

    resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    docEle.dataset.dpr = dpr;

    var metaEle = doc.createElement('meta');
    metaEle.name = 'viewport';
    metaEle.content = 'initial-scale=' + scale + ',maximum-scale=' + scale;
    docEle.firstElementChild.appendChild(metaEle);

    function recalCulate(){
        var width = docEle.clientWidth;
        if (width / dpr > 640) {
            width = 640 * dpr;
        }
        docEle.style.fontSize = 20 * (width / 750) + 'px';
    }

    recalCulate();
    if (!doc.addEventListener) return;
   
    win.addEventListener(resizeEvent, recalCulate, false);
})(document, window);

/**
 * Created by szjmcf1 on 2017/4/15.
 */
