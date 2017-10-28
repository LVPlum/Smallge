var MikuCanvasImageUtil = function(){
}
MikuCanvasImageUtil.prototype = {
//---------------------------------------------------------------------------------
    //图像在canvas中心区域按照给定比例缩放
    //noOver表示是，阻止过度缩放？默认true
    //date:2014-1-31
    //author:MIKUScallion
    scaleImgInCenter:function (context,image,scale,noOver){
        //获得原有canvas长宽
        var cw = context.canvas.width;
        var ch = context.canvas.height;
        //获得缩放后的canvas长宽
        var scaledCw = cw*scale;
        var scaledCh = ch*scale;
        //获得相对新canvas的缩放对象
        var scaleObj = this.getScaleObj(image,scaledCw,scaledCh,noOver);
        //获取原有canvas中心坐标
        var canvasCenterX = context.canvas.width/2;
        var canvasCenterY = context.canvas.height/2;
        //相对于canvas中心点计算，图像顶点
        var imageStartPointX = canvasCenterX - scaleObj.width/2;
        var imageStartPointY = canvasCenterY - scaleObj.height/2;
        //绘制图像
        context.drawImage(image,imageStartPointX,imageStartPointY,scaleObj.width,scaleObj.height);
    },
    //将image缩放后绘制到canvas中心
    //date:2014-1-31
    //author:MIKUScallion
    drawScaleImageInCenter:function(context,image){
        //获取canvas中心坐标
        var canvasCenterX = context.canvas.width/2;
        var canvasCenterY = context.canvas.height/2;
        //相对原本的canvas获取缩放对象
        var scaleObj = this.getScaleObj(image,context.canvas.width,context.canvas.height);
        //计算图像顶点
        var imageStartPointX = canvasCenterX - scaleObj.width/2;
        var imageStartPointY = canvasCenterY - scaleObj.height/2;
        //绘制图像
        context.drawImage(image,imageStartPointX,imageStartPointY,scaleObj.width,scaleObj.height);
    },
    //获得图像相对与一个矩形的缩放对象
    //该对象包含：width，height
    //date:2014-1-31
    //author:MIKUScallion
    getScaleObj:function(image,width,height,noOver){
        //默认不能过度缩放
        noOver = noOver===undefined? true:noOver;
        var scaleW,scaleH;
        var widthLonger = image.width - width;
        var heightLonger = image.height - height;
        if(noOver){
            //图像无需缩放
            if(widthLonger <=0 && heightLonger<=0 ){
                scaleW = image.width;
                scaleH = image.height;
                return {
                    width:scaleW,
                    height:scaleH
                };
            }
        }
        //固定宽度缩放
        if(widthLonger >= heightLonger){
            scaleW = width;
            var percent = width/image.width;
            scaleH = image.height*percent;
        }
        //固定长度缩放
        else{
            scaleH = height;
            var percent = height/image.height;
            scaleW = image.width*percent;
        }
        //----------------
        return {
            width:scaleW,
            height:scaleH
        };
    }
}