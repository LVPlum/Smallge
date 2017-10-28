var offline = function(obj){
    var init = function(){
        obj.json = {};
        obj.file = {};
        obj.ajaxDone = false;
        obj.index = 0;
        obj.arr = [];
    };
    var connect = function(){
        if (obj.arr.length > 0) {
            for (var i = 0; i < obj.arr.length; i++) {
                //if (!obj.arr[i].ajaxDone) {
                    (function(e, json, file){
                        offline(obj).ajaxAgain(e, json, file);
                    })(obj.arr[i].index, obj.arr[i].json ,obj.arr[i].file);
                //}
            }
        }
    };
    // 是否完成
    var check = function(){
        if ( typeof obj.compressing != 'undefined') {
            return !obj.compressing;
        }
        if (obj.arr.length > 0) {

                    return obj.check = false;

        }
        return obj.check = true;
    };
    var ajax = function(){

            // obj.index ++;
            // api.ajax({
            //     url: obj.url,
            //     method: 'post',
            //     timeout: 30,
            //     dataType: 'json',
            //     returnAll:false,
            //     data:{
            //         values: obj.json,
            //         files : {
            //             "upfile" : obj.file
            //         }
            //     }
            // },function(ret,err){
            //     if (ret) {
            //         //offline(obj).ajaxSuccess(e);
            //         obj.success(ret, obj.index);
            //     }
            //     else {

            //     }
            // });
        obj.arr.push({
            json: obj.json,
            file: obj.file,
            ajaxDone: obj.ajaxDone,
            index: obj.index
        });
        (function(e){
            obj.index ++;
            api.ajax({
                url: obj.url,
                method: 'post',
                timeout: 30,
                dataType: 'json',
                returnAll:false,
                data:{
                    values: obj.json,
                    files : {
                        "upfile" : obj.file
                    }
                }
            },function(ret,err){
                if (ret) {
                    //_alert(ret)
                    offline(obj).ajaxSuccess(e);
                    obj.success(ret, e);
                }
                else {

                }
            });
        })(obj.index);
    };
    var ajaxAgain = function(i_, json_, file_){
        (function(e){
            api.ajax({
                url: obj.url,
                method: 'post',
                timeout: 30,
                dataType: 'json',
                returnAll:false,
                data:{
                    values: json_,
                    files : {
                        "upfile" : file_
                    }
                }
            },function(ret,err){
                if (ret) {
                    offline(obj).ajaxSuccess(e);
                    //_alert(ret);
                    obj.success(ret, e);
                }
                else {
                }
            });
        })(i_, json_, file_);

    };
    var ajaxSuccess = function(e){
        for (var i = obj.arr.length - 1; i >= 0; i--) {
            if (obj.arr[i].index == e) {
                obj.arr.splice(i, 1);
            }
        }

        //obj.arr[e].ajaxDone = true;
    };
    var compress = function(){
        var arr = obj.json.imgArr;
        if (obj.json.type == 'video') {
            obj.compressing = true;

            if (api.systemType == "ios") {
                var videoTool = api.require('videoTool');
                videoTool.compressVideo({
                    directories: arr[0],
                    format:'mp4',
                    presetName:1
                },function(ret,err){
                    if (ret.state == 0) {
                        obj.file = ret.compressPath;
                        pic.ajax([obj.json.thumbnail]);
                        obj.compressing = false;
                    }
                });
                return;
            }

            var videoKit = api.require('videoKit');
            videoKit.compressVideo({
                path: arr[0],
                quality: 'm'
            }, function(ret, err) {
                if (ret) {
                    if (ret.oper == 'complete') {
                        obj.file = ret.info;
                        pic.ajax([obj.json.thumbnail]);
                        obj.compressing = false;
                    }
                }

            });
            return;
        }
        //pic.ajax(arr)
        for (var i = 0; i < arr.length; i++) {
            (function(e){
                if (obj.json.type == 'picture') {
                    obj.compressing = true;
                    tea.imgCompress(arr[e], 0.8, 0.8, function(url_){
                        values.imageArr[e] = url_;
                        obj.flag ++;
                        if ( obj.flag == arr.length) {
                            obj.file = '';
                            obj.flag = 0;
                            pic.ajax(values.imageArr);
                            obj.compressing = false;
                        }
                    })
                }
            })(i);  //闭包结束
        }
    }
    return {
        init: init,
        connect: connect,
        ajax: ajax,
        ajaxAgain: ajaxAgain,
        ajaxSuccess: ajaxSuccess,
        compress: compress,
        check: check
    }

};