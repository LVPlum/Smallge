/*
 * 小马哥 JavaScript Library
 * @author winston(iwinston@163.com)
 */
(function(window) {
    var u = {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    var uzStorage = function() {
        var ls = window.localStorage;
        if (isAndroid) {
            ls = os.localStorage();
        }
        return ls;
    };

    function parseArguments(url, data, fnSuc, dataType) {
        if (typeof(data) == 'function') {
            dataType = fnSuc;
            fnSuc = data;
            data = undefined;
        }
        if (typeof(fnSuc) != 'function') {
            dataType = fnSuc;
            fnSuc = undefined;
        }
        return {
            url: url,
            data: data,
            fnSuc: fnSuc,
            dataType: dataType
        };
    }


    u.appleCheck = function() {
        var tel = $api.getStorage('telphone');
        if (api.systemType == 'ios' && tel == '13097793501') {
            return true;
        }
        return false;
    }

    u.formatDate = function(timespan, type) {
        var time = new Date(timespan);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        // 分钟数少于10 自动补0
        if (minute < 10) {
            minute = '0' + minute;
        }
        var second = time.getSeconds();
        if (type == 'day') {
            // 获取今天零点的时间戳
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            // 今天之内只显示小时和分钟
            if (time.getTime() > today.getTime()) {
                return hour + ":" + minute;
            }
        }
        return year + "-" + month + "-" + date + "   " + hour + ":" + minute ;
    }

    /**
     * 用于验证参数是否存在，设置默认值
     * @param  {[any]} param_   需要验证的参数
     * @param  {[any]} default_ 默认值
     * @return {[any]}          返回参数
     */
    u.check = function(param_, default_) {
        default_ = (typeof default_ == "undefined" || default_ == null) ? '' : default_;
        return (typeof param_ == "undefined" || param_ == null) ? default_ : param_;
    }


    u.isElement = function(obj) {
        return !!(obj && obj.nodeType == 1);
    };

    u.token = function() {
        var token = $api.getStorage('token');
        // if 判断是否登陆
        if (typeof token !== "undefined") {
            return true;
        } else {
            if (u.checkPhone($api.getStorage('tel'))) {
                api.openWin({
                    name: 'login_win',
                    url: '../account/login_win.html',
                    pageParam: {
                        name: 'test'
                    }
                });
            }
            else {
                api.openWin({
                    name: 'account_win',
                    url: '../account/account_win.html',
                    pageParam: {}
                });                
            }
            api.toast({
                msg: '请先登陆~',
                duration: 2000,
                location: 'middle'
            });
            return false;
        }
    };
    
    /**
     * 打开需要验证的窗口
     * @param  {obj} obj_ 参数
     * @return {null}
     */
    u.openWin = function(obj_) {
        var name = (typeof obj_.name == "undefined" || obj_.name == null) ? '' : obj_.name;
        var url = (typeof obj_.url == "undefined" || obj_.url == null) ? '' : obj_.url;
        var pageParam = (typeof obj_.pageParam == "undefined" || obj_.pageParam == null) ? {} : obj_.pageParam;
        // if 判断是否登陆
        if (u.token()) {
            api.openWin({
                name: name,
                url: url,
                pageParam: pageParam
            });
        }
    };

    /**
     * 带验证的ajax
     * @param  {obj} params_    ajax参数
     * @param  {func} callback_ 回调函数
     * @param  {obj} pageParam_ 登录页参数，可不填
     * @return {null}            [description]
     */
    u.ajax = function(params_, callback_, pageParam_) {

        var params_ = (typeof params_ == "undefined" || params_ == null) ? {} : params_;
        var callback_ = (typeof callback_ == "undefined" || callback_ == null) ? function() {} : callback_;
        var pageParam_ = (typeof pageParam_ == "undefined" || pageParam_ == null) ? {} : pageParam_;
        // if 判断是否登陆
        if (u.token()) {
            api.ajax(params_, callback_);

        }
    };

    /**
     * doT更新HTML
     *
     * @author winston
     * @param  {Object} data 数据
     * @param  {el/id} template 模板对象或模板对象id
     * @param  {el/id} el DOM对象或DOM对象id，指定插入位置
     * @return {null}
     */
    u.doT = function(data_, template_, el_, type_) {
        var data_ = (typeof data_ == "undefined" || data_ == null) ? {} : data_;
        var template_ = (!u.isElement(template_)) ? $api.byId(template_) : template_;
        var el_ = (!u.isElement(el_)) ? $api.byId(el_) : el_;

        if (!u.isElement(el_)) {
            console.warn('tea.doT Function need el param, el param must be DOM Element');
            return;
        }
        // 编译模板函数
        var tempFn = doT.template(template_.innerHTML);

        // 使用模板函数生成HTML文本
        var resultHTML = tempFn(data_);

        switch (type_) {
            case 'append':
                $api.append(el_, resultHTML);
                break;
            case 'prepend':
                $api.prepend(el_, resultHTML);
                break;
            default:
                $api.html(el_, resultHTML);
                break;
        }

        api.parseTapmode();

    }

    /**
     * 实现对图片的缓存
     *
     * @author winston
     * @param  {el} el img对象
     * @return {null}
     */
    u.loadImage = function(el_, type_) {

        if (!u.isElement(el_)) {
            console.warn('$api.addEvt Function need el param, el param must be DOM Element');
            return;
        }
        var dataUrl = $api.attr(el_, 'data-url');

        //缓存data-url所指定的图片
        if (dataUrl) {
            api.imageCache({
                url: dataUrl
            }, function(ret, err) {
                if (ret) {
                    //$api.attr(el_, 'data-url', ret.url);
                    // if (type_ == 'bg') {
                    //     $api.css(el_, 'background-image:url('+ ret.url +')');
                    //     //el_.src = ret.url;
                    // }
                    // else {
                    el_.src = ret.url;
                    $api.attr(el_, 'data-url', '');
                    //}
                    //result(ret.url);
                }
            });
        }
    }

    /**
     * 对象转数组
     * @param  {[obj]} obj_ 需要转化的对象
     * @return {[arr]}      返回转化后的数组
     */
    u.objToArr = function(obj_) {

        if ($api.isArray(obj_)) {
            return obj_;
        }

        var obj_ = (typeof obj_ == "undefined" || obj_ == null) ? { 0: obj_ } : obj_;

        return Object.keys(obj_).map(function(k) { return obj_[k] });

    }

    /**
     * 计算对象中非空属性的数量
     * @param  {obj} obj_ 对象
     * @return {num}      对象中非空属性的数量
     */
    u.objLength = function(obj_) {

        var count = 0;

        for (var key in obj_) {
            if (obj_[key] !== '' && obj_[key] !== null) {
                count++;
            }
        }

        return count;
    }

    /**
     * 用于提示ajax请求失败
     * @author winston
     * @param  {str} str_ 提示类型,命名请注意简短规范
     * @return {null} [description]
     */
    u.toast = function(type_, msg_) {

        var msg = '';
        if (typeof auiToast == "undefined") {
            switch (type_) {
                // 用于提示功能尚未开放
                case 'disable':
                    msg = '此功能尚未开放，敬请期待~';
                    break;
                // 用于提示ajax请求失败
                case 'ajax':
                    msg = '当前网络不佳，请重试~';
                    break;
                case 'success':
                    msg = u.check(msg_, '提交成功');
                    break;
                case 'fail':
                    msg = u.check(msg_, '提交失败');
                    break;
                default:
                    msg = u.check(msg_, '');
                    break;
            }
            api.toast({
                msg: msg,
                duration: 2000,
                location: 'middle'
            });
            return;
        }
        toast = new auiToast();

        switch (type_) {
            case "success":
                msg_ = u.check(msg_, '提交成功')
                toast.success({
                    title: msg_,
                    duration: 2000
                });
                break;
            case "fail":
                msg_ = u.check(msg_, '提交失败')
                toast.fail({
                    title: msg_,
                    duration: 2000
                });
                break;
            case "custom":
                toast.custom({
                    title: msg_,
                    html: '<i class="aui-iconfont aui-icon-info"></i>',
                    duration: 2000
                });
                break;
            case "loading":
                toast.loading({
                    title: "加载中",
                    duration: 2000
                }, function(ret) {
                });
                break;
            case "hide":
                toast.hide();
                break;
                // 用于提示功能尚未开放
            case 'disable':
                msg_ = '功能尚未开放<br/>敬请期待';
                toast.fail({
                    title: msg_,
                    duration: 2000
                });
                break;
            case 'ajax':
                msg_ = '当前网络不佳<br/>请检查网络重试';
                toast.fail({
                    title: msg_,
                    duration: 2000
                });
                break;
            default:

                break;
        }


    }

    u.dialog = function(type_, title_, msg_) {
        var myScript = document.createElement("script");
        myScript.type = "text/javascript";
        myScript.src = "../../script/aui-dialog.js";
        document.body.appendChild(myScript);
        var dialog = new auiDialog();
        switch (type_) {
            case "text":
                dialog.alert({
                    title: "弹出提示",
                    msg: '这里是内容',
                    buttons: ['取消', '确定']
                }, function(ret) {
                    console.log(ret)
                })
                break;
            case "callback":
                dialog.alert({
                    title: "弹出提示",
                    msg: '这里是内容',
                    buttons: ['取消', '确定']
                }, function(ret) {
                    if (ret) {
                        dialog.alert({
                            title: "提示",
                            msg: "您点击了第" + ret.buttonIndex + "个按钮",
                            buttons: ['确定']
                        });
                    }
                })
                break;
            case "input":
                dialog.prompt({
                    title: "弹出提示",
                    text: '默认内容',
                    type: 'number',
                    buttons: ['取消', '确定']
                }, function(ret) {
                    if (ret.buttonIndex == 2) {
                        dialog.alert({
                            title: "提示",
                            msg: "您输入的内容是：" + ret.text,
                            buttons: ['确定']
                        });
                    }
                })
                break;
            default:
                break;
        }

    }

    /**
     * 字符串提取纯数字
     */
    u.toNum = function(str) {
        //console.log(str.replace(/[^0-9]/ig,""));
        return str.replace(/[^0-9]/ig, "");
    }

    /**
     * 表单验证策略模式
     */
    u.checkConditions = {
        isTrue: function (value, errorMsg){
            if (!value) {
                return errorMsg;
            }
        },
        isNoEmpty: function(value, errorMsg){
            if (value === '') {
                return errorMsg;
            }
        },
        isPhone: function(value, errorMsg){
            if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
                return errorMsg;
            }
        },
        isIDNum: function(value, errorMsg){
            if (!value.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
                return errorMsg;
            }
        },
        isCardNum: function(value, errorMsg){
            if (!value.match(/^\d{16}|\d{19}$/)) {
                return errorMsg;
            }
        },
        isNoChinese: function(value, errorMsg){
            if (value.match(/[\u4E00-\u9FA5\uF900-\uFA2D]/)) {
                return errorMsg;
            }
        },
        isCode: function(value, errorMsg){
            if (!value.match(/^[0-9]{4}$/)) {
                return errorMsg;
            }
        },
        minLength: function(value, length, errorMsg){
            if (value.length < length) {
                return errorMsg;
            }
        },
        maxLength: function(value, length, errorMsg){
            if (value.length > length) {
                return errorMsg;
            }
        }
    }

    u.checkRule = function() {
        this.cache = [];
    }

    u.checkRule.prototype.add = function(value, rules) {
        var self = this;
        for (var i = 0, rule; rule = rules[i++];) {
            (function(rule) {
                var conditionArr = rule.condition.split(':');
                var errorMsg = rule.errorMsg;

                self.cache.push(function() {
                    var condition = conditionArr.shift();
                    conditionArr.unshift(value);
                    conditionArr.push(errorMsg);
                    return u.checkConditions[condition].apply(null, conditionArr);
                });
            })(rule)
        }
    }

    u.checkRule.prototype.start = function() {
        for (var i = 0, ruleFunc; ruleFunc = this.cache[i++];) {
            var errorMsg = ruleFunc();
            if (errorMsg) {
                return errorMsg;
            }
        }
    }

    /**
     * 检查手机格式
     * @param  {str} phone_ 手机号码
     * @return {bool}     手机号码格式是否正确
     */
    u.checkPhone = function(phone_) {
        phone_ = phone_ || '';
        return !!phone_.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    }

    /**
     * 检查身份证格式
     * @param  {str} id_ 身份证号码
     * @return {bool}    格式是否正确
     */
    u.checkIdNum = function(id_) {
        return !!id_.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
    }


    u.checkChinese = function(str) {
            var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            return reg.test(str);
        }
        /**
         * 页面滚动
         * @param  {str} str_ 滚动的方向,不传则默认滚动到底部
         * @return {num} scrollTop
         */
    u.scroll = function(str_) {

        var height = 0;

        switch (str_) {
            case 'top':
                break;

            case 'bottom':
                height = document.body.scrollHeight;
                break;

            default:
                height = document.body.scrollTop + str_;
                break;
        }

        return document.body.scrollTop = height;

    }

    /**
     * 切换某个元素的样式
     * @param  {el/id} el_  DOM元素或元素id
     * @param  {str} class_ class类名，不传则默认为aui-hide
     * @return {bool}       返回此元素切换后是否拥有此类名
     */
    u.toggle = function(el_, class_) {

        var class_ = (typeof class_ == "undefined" || class_ == null) ? 'aui-hide' : class_;
        var el = (!u.isElement(el_)) ? $api.byId(el_) : el_;

        if ($api.hasCls(el, class_)) {
            $api.removeCls(el, class_);
            return false;
        } else {
            $api.addCls(el, class_);
            return true;
        }

    }

    /**
     * 判断目标元素是否为某一个元素的子元素或后代元素
     * @param  {el} parent 父元素
     * @param  {el} el     子元素
     * @return {bool}      是否
     */
    u.contains = function(parent, el) {
        var mark = false;
        if (el === parent) {
            mark = true;
            return mark;
        } else {
            if (el !== document.body && el !== document.documentElement) {
                do {
                    if (el === null) {
                        return mark;
                    }
                    el = el.parentNode;
                    if (el === parent) {
                        mark = true;
                        return mark;
                    }
                } while (el !== document.body || el !== document.documentElement);
            }
            return mark;
        }

    };

    /**
     * 用于关闭蒙版层
     * @param  {e} event_ 传入事件对象，一般是this
     * @param  {el} el_   蒙版层内的容器DOM对象，支持传id
     * @return {null}        [description]
     */
    u.closeFrame = function(event_,el_){
        var el_ = (!u.isElement(el_)) ? $api.byId(el_) : el_;
        if(!u.contains(el_, event_.target)){
            setTimeout(function(){
                api.closeFrame();
            },200);
        }
    }

    /**
     * 用于隐藏蒙版层
     * @param  {e} event_ 传入事件对象，一般是this
     * @param  {el} el_   蒙版层内的容器DOM对象，支持传id
     * @return {null}        [description]
     */
    u.hideFrame = function(event_,el_){
        var el_ = (!u.isElement(el_)) ? $api.byId(el_) : el_;
        if(!u.contains(el_, event_.target)){
            setTimeout(function(){
                api.setFrameAttr({
                    hidden: true
                });
            },200);
        }
    }

    /**
     * 用于打开百度导航页面
     * @param  {str} title_  标题
     * @param  {num} lon_    经度
     * @param  {num} lat_    纬度
     * @return {null}        [description]

     */
    u.bmapGuide = function(title_, lon_, lat_) {

        api.openWin({
            name: 'bmap_win',
            url: '../unit/bmap_win.html',
            pageParam: {
                title: title_,
                lon: lon_,
                lat: lat_
            }
        });

    }

    /**
     * 打开成功页面(暂不推荐使用)
     * @param  {str} title_  页面标题
     * @param  {str} result_ 成功描述
     * @param  {obj} data_   详细内容，一个对象，格式为{'0': ['str','str'], '1':[]}
     * @param  {[type]} name_   win_name,默认为'success_win'
     * @return {[type]}         [description]
     */
    u.success = function(title_, result_, data_, name_) {

        var title_ = (typeof title_ == "undefined" || title_ == null) ? '操作成功' : title_;
        var result_ = (typeof result_ == "undefined" || result_ == null) ? '操作成功' : result_;
        var data_ = (typeof data_ == "undefined" || data_ == null) ? { '0': [] } : data_;
        var name_ = (typeof data_ == "undefined" || data_ == null) ? 'success_win' : name_;
        api.openWin({
            name: name_,
            url: '../unit/success_win.html',
            pageParam: {
                title: title_,
                result: result_,
                data: data_
            }
        });

    }

    /**
     * 获取storage,如未定义则返回空字符串
     * @param  {str} str_ storage key，默认为ID
     * @return {[type]}   storage value，默认为空字符串
     */
    u.getStorage = function(str_) {
        var str_ = u.check(str_, 'ID');
        var storage_ = $api.getStorage(str_);
        if (typeof storage_ != "undefined") {
            return storage_;
        }
        return '';
    }

    /**
     * 输入金额格式限制
     *
     * 输入前显示“0.00”
     * 移入后如果是“0.00”则清空内容
     * 移入后如果是“*.00”则去除后面的“.00”以方便填写
     * 移入后如果是“*.*0”则优化成“*.*”，即去掉最后面的“0”以方便填写
     * 什么都没写移出后又再次填充“0.00”
     * 只能输入数字和小数点
     * 仅能输入一个小数点
     * 仅保留后面两个小数点
     * 限制最高位数
     *
     * @param  {el/id} el_  DOM元素或元素id
     * @return {num}        金额
     */
    u.moneyInput = function(el_, callback) {

        var el_ = (!u.isElement(el_)) ? $api.byId(el_) : el_;

        if (api.systemType == 'ios') {
            $api.attr(el_, 'type', 'number');
        }

        //仅能输入数字和小数点
        el_.addEventListener('focus', function() {
            if (this.value == '0.00') {
                this.value = '';
            } else {
                this.value = this.value.replace(/\.00/, '').replace(/(\.\d)0/, '$1');
            }

        });
        el_.addEventListener('keyup', function() {

            this.value = this.value.replace(/^[\.]/, '').replace(/[^\d.]/g, '');

            // 阻止输入2个点号
            var length = this.value.split(".").length;
            if (length > 2) {
                var l = this.value.length;
                this.value = this.value.slice(0, l - 1);
            }
            // 限制最高位数
            if (this.value.length > 7) {
                this.value = this.value.slice(0, 7);
            }
            if (callback) {
                callback(this);
            }

        });
        el_.addEventListener('blur', function() {
            this.value = this.value.replace(/[\.]$/, '');
            this.value = Number(this.value).toFixed(2);
            if (callback) {
                callback(this);
            }
        });


        return this.value;

    }

    u.isEmpty = function(obj_) {
        for (var name in obj_) {
            return false;
        }
        return true;
    };

    /**
     * 将一组元素的高度设置为它们中间最高的那一个
     * @param  {arr} els_ 一组元素
     * @return {num}      返回最高高度
     */
    u.sameHeight = function(els_) {
        var height = 0;
        // 获取元素的最大高度
        for (var i = els_.length - 1; i >= 0; i--) {
            var elH = $api.offset(els_[i]).h;
            if (elH > height) {
                height = elH;
            }
        }
        // 设置每个元素高度
        for (var i = els_.length - 1; i >= 0; i--) {
            var css = 'height:' + height + 'px';
            $api.css(els_[i], css);
        }

        return height;
    }

    /**
     * 清空输入框
     * @param  {el} el_ DOM对象或id
     * @return {[type]}     [description]
     */
    u.clear = function(el_) {
        var el_ = (!u.isElement(el_)) ? $api.byId(el_) : el_;
        $api.val(el_, '');
    }

    u.showProgress = function() {

    }


    u.imgCompress = function(imgsrc, quality, scale, callback) {

        var ext = getExt(imgsrc);
        // 压缩文件的保存目录
        var savePath = api.cacheDir + "/" + getNowFormatDate() + "/";
        // 压缩文件生成的随机文件名称
        var savename = NewGuid() + "." + ext;
        if (typeof imageFilter == 'undefined') {
            var imageFilter = api.require('imageFilter');
        }
        imageFilter.compress({
            img: imgsrc,
            quality: quality,
            scale: scale,
            save: {
                album: false,
                imgPath: savePath,
                imgName: savename
            }
        }, function(ret, err) {
            if (ret) {
                callback(savePath + savename);
            } else {
                alert(JSON.stringify(err));
            }
        });

        function NewGuid() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        }

        // 获取当前的时间，拼接成2015-11-09这样的格式，主要用于对图片进行时间分类
        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate
            return currentdate;
        }

        // 获取文件拓展名
        function getExt(fileName) {
            return fileName.substring(fileName.lastIndexOf('.') + 1);
        }
    }

    u.strToJson = function(str) {
        var json = (new Function("return " + str))();
        return json;
    }

    /**
     * 加载进度窗
     * @param modal 加载过程中窗口是否可点 */
    u.showp = function(title,text,modal){
        api.showProgress({
            style: 'default',
            animationType: 'fade',
            title: title,
            text: text,
            modal: modal ? modal : false
        });
    };

    u.formatMoney = function(money) {
        money = parseInt(money);
        if (money >= 10000) {
            return (money * 0.0001).toFixed(2) + '万';
        }
        return money.toFixed(2);
    }

    /*end*/

    window.tea = u;
    if (typeof Vue != 'undefined') {
        Vue.prototype.window = window;
        Vue.prototype.tea = tea;
        Vue.prototype.$api = $api;
        Vue.prototype.website = website;
    }

})(window);

// 消除300毫秒延迟
if (typeof FastClick != 'undefined') {
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }    
}


(function(window) {
    var u = {};

    u.scan = function() {
        for (var key in dom) {
            var el = dom[key];
            if (!tea.isElement(el)) {
                continue;
            }
            for (var i = el.attributes.length - 1; i >= 0; i--) {
                var attr = el.attributes[i];
                if (attr.nodeName.indexOf('v-') > -1) {
                    var type = attr.nodeName.split('-')[1];
                    var value = tea.strToJson('values.' + attr.nodeValue);
                    u.command[type].call(el, value, attr.nodeName);
                }
            }
        }
    }
    u.command = {
        text: function(str) {
            this.innerHTML = str;
        },
        value: function(str) {
            this.setAttribute('value', str);
        },
        class: function(str, name) {
            var kls = name.slice(8);
            if (str == true) {
                $api.addCls(this, kls);
                return;
            }
            $api.removeCls(this, kls);
        },
        if: function(str) {
            if (str) {
                $api.removeCls(this, 'aui-hide');
                return;
            }
            $api.addCls(this, 'aui-hide');
        },
        unless: function(str) {
            if (str) {
                $api.addCls(this, 'aui-hide');
                return;
            }
            $api.removeCls(this, 'aui-hide');
        },
        src: function(str) {
            this.setAttribute('src', str);
        },
        attr: function(str, name) {
            var attr = name.slice(7);
            if (str == true) {
                this.setAttribute(name);
                return;
            }
            this.removeAttribute(name);
        }
    };
    /**
     * 设置数据后扫描
     */
    u.set = function(key, value) {
        values[key] = value;
        //_alert(values);
        u.scan();
    };

    u.addEventListener = function() {
        for (var key in dom) {
            var el = dom[key];
            if (!tea.isElement(el)) {
                continue;
            }
            for (var i = el.attributes.length - 1; i >= 0; i--) {
                var attr = el.attributes[i];
                if (attr.nodeName.indexOf('v-') > -1 && attr.nodeName.slice(2) == 'value') {
                    el.addEventListener('input', function(e) {
                        var el = e.target;
                        for (var i = el.attributes.length - 1; i >= 0; i--) {
                            var attr = el.attributes[i];
                            if (attr.nodeName.indexOf('v-') > -1 && attr.nodeName.slice(2) == 'value') {
                                u.set(attr.nodeValue, el.value);
                            }
                        }
                    }, false);
                }
            }
        }
    };
    /*end*/
    
    window.vm = u;
})(window);

// AC默认参数 BEGIN
window.openWinAnimationType = "movein";
window.openWinAnimationSubType = "from_right";
window.openWinAnimationDuration = 300;
window.openWinDelay = 300;
window.toastDuration = 4000;
window.toastLocation = "bottom";
window.showProgressAnimationType = "fade";
window.showProgressTitle = "载入数据...";
window.showProgressText = "请稍候...";
window.ajaxTimeout = 30;
// APP默认参数 END
// 用户偏好设置的Key
window.userKey = "userInfo";
// 继承拓展对象
function _extents(obj1, obj2) {
    for (var i in obj2) {
        if (obj1[i]) {
            continue;
        } else {
            obj1[i] = obj2[i];
        }
    }
}

// 手机号验证
function _checkPhone(phone) {
    var res = !!phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    return res;
}

// 打开新窗口
function _openWin(name, url, pageParam, bgColor, animateDirection, bounces, reload) {
    var _pageParam = (typeof arguments[2] == "undefined" || arguments[2] == null) ? api.pageParam : arguments[2];
    var _bgColor = (typeof arguments[3] == "undefined" || arguments[3] == null) ? 'rgba(0,0,0,0)' : arguments[3];
    var _animateDirection = (typeof arguments[4] == "undefined" || arguments[4] == null) ? window.openWinAnimationSubType : arguments[4];
    var _bounces = (typeof arguments[5] == "undefined" || arguments[5] == null) ? false : arguments[5];
    var _reload = (typeof arguments[6] == "undefined" || arguments[6] == null) ? false : arguments[6];
    api.openWin({
        name: name,
        url: url,
        pageParam: _pageParam,
        bgColor: _bgColor,
        bounces: _bounces,
        scrollToTop: true,
        slidBackEnabled: true,
        animation: {
            type: window.openWinAnimationType,
            subType: _animateDirection,
            duration: window.openWinAnimationDuration
        },
        delay: api.systemType == "ios" ? 0 : window.openWinDelay,
        reload: _reload,
        allowEdit: false,
        vScrollBarEnabled: false,
        hScrollBarEnabled: false
    });
}

// 打开新框架
function _openFrame(name, url, rect, pageParam, bgColor, bounces, reload, showProgress) {
    var __rect = {
        x: 0,
        y: 0,
        w: api.winWidth,
        y: api.winHeight,
        l: 0,
        t: 0,
        b: 0,
        r: 0
    };
    var _rect = (typeof arguments[2] == "undefined" || arguments[2] == null || typeof arguments[2] != "object") ? __rect : arguments[2];
    var _pageParam = (typeof arguments[3] == "undefined" || arguments[3] == null) ? api.pageParam : arguments[3];
    var _bgColor = (typeof arguments[4] == "undefined" || arguments[4] == null) ? 'rgba(0,0,0,0)' : arguments[4];
    var _bounces = (typeof arguments[5] == "undefined" || arguments[5] == null) ? false : arguments[5];
    var _reload = (typeof arguments[6] == "undefined" || arguments[6] == null) ? false : arguments[6];
    var _showProgress = (typeof arguments[7] == "undefined" || arguments[7] == null) ? false : arguments[7];
    api.openFrame({
        name: name,
        url: url,
        rect: {
            x: typeof _rect.x != "number" ? __rect.x : _rect.x,
            y: typeof _rect.y != "number" ? __rect.y : _rect.y,
            w: typeof _rect.w != "number" ? __rect.w : _rect.w,
            h: typeof _rect.h != "number" ? __rect.h : _rect.h,
            marginLeft: typeof _rect.l != "number" ? __rect.l : _rect.l,
            marginTop: typeof _rect.t != "number" ? __rect.t : _rect.t,
            marginBottom: typeof _rect.b != "number" ? __rect.b : _rect.b,
            marginRight: typeof _rect.r != "number" ? __rect.r : _rect.r
        },
        bgColor: _bgColor,
        pageParam: _pageParam,
        scrollToTop: true,
        bounces: _bounces,
        showProgress: _showProgress,
        reload: _reload,
        vScrollBarEnabled: false,
        hScrollBarEnabled: false,
        allowEdit: true
    });
}

// 关闭当前窗口到新的窗口
function _closeToWin(name) {
    api.closeToWin({
        name: name,
        animation: {
            type: 'movein',
            subType: 'from_left',
            duration: 300
        }
    });
}

// 小提示
function _toast(msg, duration, location, _call) {
    var _duration = (typeof arguments[1] == "undefined" || arguments[1] == null) ? window.toastDuration : arguments[1];
    var _location = (typeof arguments[2] == "undefined" || arguments[2] == null) ? window.toastLocation : arguments[2];
    api.toast({
        msg: msg,
        duration: _duration,
        location: _location
    });
    if (typeof _call == "function") {
        setTimeout(_call, duration);
    }
}

// 加载框
function _showProgress(title, text, modal, animationType) {
    var _title = (typeof arguments[0] == "undefined" || arguments[0] == null) ? window.showProgressTitle : arguments[0];
    var _text = (typeof arguments[1] == "undefined" || arguments[1] == null) ? window.showProgressText : arguments[1];
    var _modal = (typeof arguments[2] == "undefined" || arguments[2] == null) ? true : arguments[2];
    var _animationType = (typeof arguments[3] == "undefined" || arguments[3] == null) ? window.showProgressAnimationType : arguments[3];
    api.showProgress({
        style: 'default',
        animationType: _animationType,
        title: _title,
        text: _text,
        modal: _modal
    });
}

// 双击退出应用
function _twoClickCloseApp(_call) {
    //定义个时间戳
    var mkeyTime = new Date().getTime();

    _addEventListener('keyback', function(ret) {
        //如果当前时间减去标志时间大于2秒，说明是第一次点击返回键，反之为2秒内点了2次，则退出。
        if ((new Date().getTime() - mkeyTime) > 2000) {
            mkeyTime = new Date().getTime();
            _toast('再按一次退出程序', 2000);
        } else {
            if (typeof _call == "function") {
                _call();
            }
            // 静默关闭,不弹出关闭提示窗口
            api.closeWidget({
                silent: true
            });
        }
    }, {});
}

// 下拉刷新
function _setRefreshHeaderInfo(_call, bgColor, textColor) {
    var _bgColor = (typeof arguments[1] == "undefined" || arguments[1] == null) ? '#f1f1f1' : arguments[1];
    var _textColor = (typeof arguments[2] == "undefined" || arguments[2] == null) ? '#999' : arguments[2];
    api.setRefreshHeaderInfo({
        visible: true,
        loadingImg: 'widget://image/refresh.png',
        bgColor: _bgColor,
        textColor: _textColor,
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        showTime: true
    }, function(ret, err) {
        if (typeof _call == "function") {
            _call();
        }
    });
}

// 上拉加载
function _scrolltobottom(_call, threshold) {
    var _threshold = (typeof arguments[1] == "undefined" || arguments[1] == null) ? 0 : arguments[1];
    _addEventListener('scrolltobottom', _call, {
        threshold: _threshold
    });
}

// 获取偏好设置
function _getPrefs(key, _call) {
    api.getPrefs({
        key: key
    }, function(ret, err) {
        var v = ret.value;
        if (typeof _call == "function") {
            _call(v);
        }
    });
}

// 设置偏好设置
function _setPrefs(key, value, _call) {
    api.setPrefs({
        key: key,
        value: value
    }, function(ret, err) {
        var v = ret.value;
        if (typeof _call == "function") {
            _call();
        }
    });
}

// 移除偏好设置
function _removePrefs(key, _call) {
    api.removePrefs({
        key: key
    }, function(ret, err) {
        var v = ret.value;
        if (typeof _call == "function") {
            _call();
        }
    });
}

// 设置存储
function _setStorage(key, value) {
    $api.setStorage(key, value);
}

// 获取存储
function _getStorage(key) {
    return $api.getStorage(key);
}

// 移除存储
function _removeStorage(key) {
    return $api.rmStorage(key);
}

// 异步请求
function _ajax(url, method, data, dataType, _call, headers, cache, timeout, tag) {
    var _data = (typeof arguments[2] == "undefined" || arguments[2] == null) ? {} : arguments[2];
    var _dataType = (typeof arguments[3] == "undefined" || arguments[3] == null) ? "json" : arguments[3];
    var _headers = (typeof arguments[5] == "undefined" || arguments[5] == null) ? {} : arguments[5];
    var _cache = (typeof arguments[6] == "undefined" || arguments[6] == null) ? false : arguments[6];
    var _timeout = (typeof arguments[7] == "undefined" || arguments[7] == null) ? window.ajaxTimeout : arguments[7];
    var _tag = (typeof arguments[8] == "undefined" || arguments[8] == null) ? '' : arguments[8];
    api.ajax({
        url: url,
        cache: _cache,
        tag: _tag,
        method: method,
        headers: _headers,
        timeout: _timeout,
        dataType: _dataType,
        returnAll: false,
        data: _data
    }, function(ret, err) {
        if (ret) {
            if (typeof _call == "function") {
                _call(ret);
            }
        } else {
            api.hideProgress();
            api.refreshHeaderLoadDone();
            _toast("亲，网速不给力哦~");
            //api.alert({
            //  msg : ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
            //});
        }

    });
}

// 解决状态栏重合
function _fixStatusBar(headerid, callback) {
    var header = $api.byId(headerid);
    var systemType = api.systemType;
    var systemVersion = parseFloat(api.systemVersion);
    if (systemType == "ios" || (systemType == "android" && systemVersion >= 5.0)) {
        if (systemType == "android") {
            header.style.paddingTop = '25px';
        }
        $api.fixStatusBar(header);
    } else {
        $api.fixIos7Bar(header);
    }
    var headerPos = $api.offset(header);
    if (typeof callback == "function") {
        callback(headerPos);
    }
}

// 指定window或者frame执行脚本
function _execScript(winName, frmName, fnStr) {
    var _winName = (typeof arguments[0] == "undefined" || arguments[0] == null) ? api.winName : arguments[0];
    var _frmName = (typeof arguments[1] == "undefined" || arguments[1] == null) ? api.frameName : arguments[1];
    var _fnStr = (typeof arguments[2] == "undefined" || arguments[2] == null) ? '' : arguments[2];
    api.execScript({
        name: _winName,
        frameName: _frmName,
        script: _fnStr
    });
}

// 广播事件
function _sendEvent(eventName, extra) {
    var _extra = (typeof arguments[1] == "undefined" || arguments[1] == null) ? {} : arguments[1];
    api.sendEvent({
        name: eventName,
        extra: _extra
    });
}

// 监听事件
function _addEventListener(eventName, _call, extra) {
    var _extra = (typeof arguments[2] == "undefined" || arguments[2] == null) ? {} : arguments[2];
    api.addEventListener({
        name: eventName,
        extra: _extra
    }, function(ret, err) {
        if (typeof _call == "function") {
            _call(ret);
        }
    });
}

// 打开相册或相机
//library            //图片库
//camera            //相机
//album            //相册
//pic            //图片
//video        //视频
function _getPicture(_call, encodingType, mediaValue, destinationType, quality, targetWidth, targetHeight, saveToPhotoAlbum, allowEdit) {
    var _encodingType = (typeof arguments[1] == "undefined" || arguments[1] == null) ? "jpg" : arguments[1];
    var _mediaValue = (typeof arguments[2] == "undefined" || arguments[2] == null) ? "pic" : arguments[2];
    var _destinationType = (typeof arguments[3] == "undefined" || arguments[3] == null) ? "url" : arguments[3];
    var _quality = (typeof arguments[4] == "undefined" || arguments[4] == null) ? 50 : arguments[4];
    var _targetWidth = (typeof arguments[5] == "undefined" || arguments[5] == null) ? 320 : arguments[5];
    var _targetHeight = (typeof arguments[6] == "undefined" || arguments[6] == null) ? 320 : arguments[6];
    var _saveToPhotoAlbum = (typeof arguments[7] == "undefined" || arguments[7] == null) ? true : arguments[7];

    api.actionSheet({
        title: '您想要从哪里选取图片？',
        cancelTitle: '取消',
        buttons: ["优雅自拍", "相册收藏"]
    }, function(ret, err) {
        if (ret.buttonIndex == 3) {
            return;
        }
        var sourceType = "album";
        if (ret.buttonIndex == 1) {
            sourceType = "camera";
        }

        api.getPicture({
            sourceType: sourceType,
            encodingType: _encodingType,
            destinationType: _destinationType,
            mediaValue: _mediaValue,
            quality: _quality,
            targetWidth: _targetWidth,
            targetHeight: _targetHeight,
            saveToPhotoAlbum: _saveToPhotoAlbum
        }, function(ret, err) {
            if (ret) {
                if (typeof _call == "function") {
                    _call(ret.data);
                }
            } else {
                api.alert({
                    msg: err.msg
                });
            }
        });
    });

}

// 判断是否是IOS
function _isIOS() {
    return api.systemType == "ios" ? true : false;
}

// 滚动到底部
function _scrollToEnd() {
    document.body.scrollTop = document.body.scrollHeight;
    //document.getElementsByTagName('body')[0].scrollTop = document.getElementsByTagName('body')[0].scrollHeight;
}

// 设置frame显示隐藏状态
function _setFrameStatus(name, isHidden) {
    api.setFrameAttr({
        name: name,
        hidden: isHidden
    });
}

// 判断是否是整数
function _isNumber(str) {
    var re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(str)
}

// 是否是浮点数
function _isDecimal(str) {
    var re = /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/;
    return re.test(str)
}

// 是否是日期格式
function _isDate(str) {
    var re = /^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/;
    return re.test(str)
}

// 清除缓存
function _clearCache() {
    api.clearCache(function(ret, err) {
        _toast("清除成功");
    });
}

// 退出登录
function _loginOut(_call) {
    _removePrefs(window.userKey, _call);
}

// 禁止返回
function _stopBack(_call) {
    _addEventListener('keyback', function(ret) {
        if (typeof _call == "function") {
            _call(ret.data);
        }
    }, {});
}

// 弹窗
function _alert(obj) {
    if (typeof obj == "object") {
        api.alert({
            msg: JSON.stringify(obj)
        }, function(ret, err) {

        });
    } else {
        api.alert({
            msg: obj
        }, function(ret, err) {

        });
    }
}

// 根据出生日期算年龄
function ages(str) {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null)
        return false;
    var d = new Date(r[1], r[3] - 1, r[4]);
    if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
        var Y = new Date().getFullYear();
        return (Y - r[1]);
    }
    return 0;
}

// 获取文件拓展名
function _getExt(fileName) {
    return fileName.substring(fileName.lastIndexOf('.') + 1);
}

// PHP时间戳转时间
function _trans_php_time_to_str(timestamp, n) {
    update = new Date(timestamp * 1000);
    //时间戳要乘1000
    year = update.getFullYear();
    month = (update.getMonth() + 1 < 10) ? ('0' + (update.getMonth() + 1)) : (update.getMonth() + 1);
    day = (update.getDate() < 10) ? ('0' + update.getDate()) : (update.getDate());
    hour = (update.getHours() < 10) ? ('0' + update.getHours()) : (update.getHours());
    minute = (update.getMinutes() < 10) ? ('0' + update.getMinutes()) : (update.getMinutes());
    second = (update.getSeconds() < 10) ? ('0' + update.getSeconds()) : (update.getSeconds());
    if (n == 1) {
        return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
    } else if (n == 2) {
        return (year + '-' + month + '-' + day);
    } else {
        return 0;
    }
}

// 生成guid,主要用于生成随机文件名
function _newGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// 获取当前的时间，拼接成2015-11-09这样的格式，主要用于对图片进行时间分类
function _getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate;
}

// 图片压缩
// imageFilter:压缩对象
// imgsrc：源图片的路径
// quality：图片压缩质量，一般建议0.5
// scale：图片压缩比例，也是建议0.5
// ext：源图片拓展名
// callback：转换成功之后回调函数
function _imgCompress(imageFilter, imgsrc, quality, scale, ext, callback) {
    // 压缩文件的保存目录
    var savePath = api.cacheDir + "/" + _getNowFormatDate() + "/";
    // 压缩文件生成的随机文件名称
    var savename = _newGuid() + "." + ext;
    imageFilter.compress({
        img: imgsrc,
        quality: quality,
        scale: quality,
        save: {
            album: false,
            imgPath: savePath,
            imgName: savename
        }
    }, function(ret, err) {
        if (ret) {
            callback(savePath + savename);
        } else {
            alert(JSON.stringify(err));
        }
    });
}

// 上传图片
function _uploadImgs(data, _call) {
    _toast("上传中...", 10000);
    _ajax(window.serverUrl + "index/uploads", "post", {
        files: {
            "pic": data
        }
    }, "json", function(ret) {
        if (ret.statu == 1) {
            _toast("上传成功!");
            if (typeof _call == "function") {
                _call(ret);
            }
        } else if (ret.statu == 0) {
            _toast("系统繁忙，请重新上传!");
        } else {
            _toast("非法参数!");
        }
    });
}

// 时间戳转时间
function _formatDate(timespan) {
    var now = new Date(timespan);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}

// 去除数组重复项
function _unique(arr) {
    var result = [],
        hash = {};
    for (var i = 0, elem;
        (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

// 检测是否数组
function _isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}
