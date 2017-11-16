var VueTouch = require('vue-touch')



    /**********************************声明全局变量**********************************/
    // 声明DOM对象
    let dom = {},
        vm = null,
        photoBrowser = null,
        hammertime = {};

    /**********************************apiready**********************************/
    window.apiready = function() {
        Vue.use(VueTouch, {name: 'v-touch'})
        // 初始化变量
        init();

    };

    /**********************************初始化变量**********************************/
    function init() {

        dom = {};

        vm = new Vue({
            el: '#app',
            data: {
                msgList: [],
                userId: $api.getStorage('ID'),
                voiceIndex: null
            },
            methods: {
                init: function() {
                    // 获取最近消息列表
                    api.showProgress({
                        modal: false
                    });
                    api.sendEvent({
                        name: 'getLastMsgStart',
                        extra: {
                            chatType: api.pageParam.chatType,
                            chatId: api.pageParam.chatId,
                        }
                    });
                },
                openWinInfo: function(id) {
                    id = typeof id == "undefined" ? vm.userId : id;
                    api.openWin({
                        name: 'user_info_win',
                        url: '../location/user_info_win.html',
                        bounces: false,
                        pageParam: {
                            friendID: id,
                            pageType: 'chat'
                        }
                    });
                    /*api.openWin({
                        name: 'friendinfo_win',
                        url: './friendinfo_win.html',
                        bounces: false,
                        pageParam: {
                            id: id
                        }
                    });*/
                },
                openBigImg: function(url) {
                    var arr = [];
                    vm.msgList.forEach(function(item) {
                        if (typeof item.msgContent.imageUrl != 'undefined') {
                            arr.push(item.msgContent.imageUrl);
                        }
                    });
                    var index = arr.indexOf(url);
                    photoBrowser.open({
                        images: arr,
                        placeholderImg: 'widget://image/holder.png',
                        activeIndex: index,
                        bgColor: '#000'
                    }, function(ret, err) {
                        if (ret) {
                            if (ret.eventType === 'click') {
                                photoBrowser.close();
                            }
                        }
                    });
                },
                playVoice: function(index, path){
                    vm.voiceIndex = index;
                    // 先停止所有播放
                    api.stopPlay();
                    // 开始播放
                    api.startPlay({
                        path : path
                    }, function() {
                        vm.voiceIndex = null;
                    });                    
                },
                openWinWare: function(id, title){
                    tea.openWin({
                        name: 'ware_win',
                        url: '../ware/ware_win.html',
                        pageParam: {
                            wareId: id,
                            wareTitle: title
                        }
                    });                    
                },
                sendWareAgain: function(wareId, wareTitle, wareImg){
                    var extra = {
                        username: $api.getStorage('nickname'),
                        userphoto: $api.getStorage('avatar'),
                        wareId: wareId,
                        wareTitle: wareTitle
                    };
                    // 通知ware_list_frm 发送图文消息
                    api.sendEvent({
                        name: 'sendMsgStart',
                        extra: {
                            msgType : "richmsg",
                            // 聊天类型
                            chatType : 'PRIVATE',
                            // 聊天对象
                            chatId : api.pageParam.chatId,
                            content : wareImg,
                            // 用户信息
                            extra : JSON.stringify(extra)
                        }
                    });
                },
                // 长按删除
                press: function(msgId){
                    api.confirm({
                        title: '',
                        msg: '确定删除这条消息吗？',
                        buttons:['确定', '取消']
                    },function(ret,err){
                        if (ret.buttonIndex == 1) {
                            api.showProgress({
                                title: '消息删除中',
                                modal:  true
                            }); 
                            api.sendEvent({
                                name: 'delMsg',
                                extra: {msgId: msgId}
                            });
                        }
                    });
                },
                // 设置语音空格长度
                setVoiceLength: function(duration) {
                    // 超过一定长度后不再增长
                    if (duration > 30) {
                        duration = 30;
                    }
                    var beisu = Math.ceil(parseInt(duration) / 3.0);

                    var html = "";
                    for (var i = 0; i < beisu; i++) {
                        html += "&nbsp&nbsp&nbsp";
                    }
                    return html;
                }
            },
            watch: {
                msgList: {
                    handler: function(val, oldVal){
                        // 增加消息后，滚动到页面底部
                        if (val.length > oldVal.length) {
                            vm.$nextTick(function(){
                                tea.scroll('bottom');
                                api.hideProgress();
                            })
                        }
                    },
                    deep: true
                }
            }

        })

        vm.init();


        // 初始化模块
        initModule();

        // 初始化监听
        initEventListener();

    };

    /**********************************初始化模块**********************************/
    function initModule() {

        photoBrowser = api.require('photoBrowser');

    }

    /**********************************初始化监听**********************************/
    function initEventListener() {
        api.setRefreshHeaderInfo({
            visible: true,
            loadingImg: 'widget://image/refresh.png',
            bgColor: '#f4f4f4',
            textColor: '#fff',
            textDown: '下拉刷新...',
            textUp: '松开刷新...',
            showTime: true,
        }, function(ret, err){
            if(vm.msgList.length < 1) {
                api.refreshHeaderLoadDone();
                return;
            }
            var lastMsgId = vm.msgList[0].msgId;
            api.sendEvent({
                name: 'getHistoryMessages',
                extra: {
                    chatType: api.pageParam.chatType,
                    chatId: api.pageParam.chatId,
                    lastMsgId: lastMsgId
                }
            });
        });

        api.addEventListener({
            name: 'getHistoryMessagesDone'
        }, function(ret, err){
            if (ret.value.result.length < 1) {
                api.refreshHeaderLoadDone();
                return;
            }
            getChatData(ret.value.result, function(arr){
                vm.msgList = arr.concat(vm.msgList);
                api.refreshHeaderLoadDone();
            })
        });

        // 监听触摸事件，关闭输入框
        api.addEventListener({
            name: 'tap'
        }, function() {
            api.sendEvent({
                name: 'closeKeyboard',
                extra: {
                    key: ' value'
                }
            });
        });

        // 监听聊天页面滚动
        api.addEventListener({
            name: 'scrollButton'
        }, function(ret, err) {
            setTimeout(function() {
                tea.scroll('bottom');
            }, 30);
        });

        // 1.0 监听发送准备事件
        api.addEventListener({
            name: 'sendMsgPrepare'
        }, function(ret, err) {
            if (ret && ret.value) {
                var msg = ret.value;
                getChatData(msg, function(arr) {
                    arr[0].msgStatus = 'prepare';
                    vm.msgList = vm.msgList.concat(arr);
                })
            }
        });

        // 2.0 监听是否发送成功
        api.addEventListener({
            name: 'sendMsgSuccess'
        }, function(ret, err) {
            if (ret && ret.value) {
                vm.msgList.some(function(item) {
                    if (item.msgId == ret.value.messageId) {
                        item.msgStatus = "";
                        return true;
                    }
                });
            }
        });

        // 3.0 监听是否发送失败
        api.addEventListener({
            name: 'sendMsgError'
        }, function(ret, err) {
            if (ret && ret.value) {
                vm.msgList.forEach(function(item) {
                    if (item.msgId == ret.value.messageId) {
                        item.msgStatus = "error";
                    }
                });
            }
        });

        // 4.0 监听是否获取最近消息成功
        api.addEventListener({
            name: 'getLastMsgEnd'
        }, function(ret, err) {
            if (ret && ret.value) {
                getChatData(ret.value, function(arr) {
                    vm.msgList = vm.msgList.concat(arr);
                })


                // 清空未读数
                api.sendEvent({
                    name: 'clearUnread',
                    extra: {
                        chatType: 'PRIVATE',
                        chatId: api.pageParam.chatId
                    }
                });
            }
        });

        // 4.0 监听是否有消息进来
        api.addEventListener({
            name: 'receivedMsg'
        }, function(ret, err) {
            if (ret && ret.value) {
                //console.log(JSON.stringify(ret.value, null, 4));
                getChatData(ret.value, function(arr) {
                    vm.msgList = vm.msgList.concat(arr);
                });

                // 清空未读数
                api.sendEvent({
                    name: 'clearUnread',
                    extra: {
                        chatType: 'PRIVATE',
                        chatId: api.pageParam.chatId
                    }
                });
            }
        });

        // 删除成功后更新视图
        api.addEventListener({
            name: 'delSuccess'
        }, function(ret, err){
            api.hideProgress();
            var id = ret.value.id;
            vm.msgList.forEach(function(item, index){
                if (item.msgId == id) {
                    vm.msgList.splice(index, 1);
                    if (vm.msgList.length == 0) {
                        // rong.removeConversation({
                        //     conversationType: 'PRIVATE',
                        //     targetId: api.pageParam.targetId
                        // }, function(ret, err) {
                        //     api.toast({ msg: ret.status });
                        // })
                    }
                }
            })
        });

    }

    /**********************************DOM响应**********************************/

    /**********************************其他函数**********************************/
    function getChatData(ret, callback) {
        //tea.log(JSON.stringify(ret, null, 4))
        var idArr = [],
        arr = [];
        // 保证ret是一个数组
        ret = typeof ret == 'string' ? JSON.parse(ret) : ret;
        ret = Array.isArray(ret) ? ret : [ret];
        for (var i = 0, len = ret.length; i < len; i++) {
            var item = ret[i];
            // 获取列表信息时是latestMessage，单条信息是content
            item.msg = item.latestMessage ? item.latestMessage : item.content;
            // 命令类型不显示
            if (item.objectName == 'RC:CmdMsg') {
                continue;
            }
            var extra = $api.strToJson(item.msg.extra);
            var info = {
                senderId: item.senderUserId,
                msgId: item.messageId,
                msgTime: item.sentTime,
                msgAvatar: extra.userphoto,
                msgName: extra.username,
                msgContent: item.msg,
                msgContentType: item.objectName,
                //msgUnread: item.unreadMessageCount,
                msgType: item.conversationType,
                msgDirection: item.messageDirection, // 'SEND' or 'RECEIVE'
                msgStatus: ''
            };
            // 将结果保存到数组
            idArr.push(info.senderId);
            arr.push(info);

        }
        //callback(arr.reverse());
        // 若用户信息已完整则返回
        //if (idArr.length < 1) {
            callback(arr.reverse());
            return;
        //};
        // 获取用户信息
        getUsersInfo(idArr.toString(), addUsersInfo);
        // 补充用户信息
        function addUsersInfo(userArr) {
            for (var i = 0; i < userArr.length; i++) {
                var user = userArr[i];
                for (var j = 0; j < arr.length; j++) {
                    var item = arr[j];
                    if (item.senderId == user.userid) {
                        item.msgAvatar = website + user.userphoto;
                        item.msgName = user.username;
                    }
                }
            }
            callback(arr.reverse());
            // console.log(JSON.stringify(vm.msgList, null, 4))
        }
    }

    function getUsersInfo(ids, callback) {
        tea.ajax({
            url: website + "rong/index.php?action=getlastuserlist&ids=" + ids,
            method: 'get',
            timeout: 30,
            dataType: 'json',
            returnAll: false
        }, function(ret, err) {
            if (ret) {
                callback(ret);
            } else {
                tea.toast('ajax');
                return false;
            };
        });
    }

