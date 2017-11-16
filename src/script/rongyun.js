/*
 * 融云聊天模块
 * @author winston(iwinston@163.com)
 */
(function(window){
var u = {};

u.init = function(){
    // 引入融云模块
	rong = api.require('rongCloud2');

    // 融云初始化
    rong.init(function(ret, err) {
		if (ret.status == 'error') {
            tea.toast('fail','融云初始化未成功');
		}

	});
}

u.connect = function(callback){
    // 融云连接
	var token = $api.getStorage("rongtoken");
	if (token) {
		rong.connect({
			token : token
		}, function(ret, err) {
			if (ret.status == 'success') {
                callback();
			} else {
                tea.toast('fail','获取列表未成功')
			}
		});
	}
}

u.getConversationList = function(callback){
	rong.getConversationList(function(ret, err) {
		if (ret) {
			console.log(JSON.stringify(ret, null, 4))
            u.getTotalUnreadCount();
			if (ret.result.length < 1) {
				isFirst = false;
			}
            //console.log(JSON.stringify(ret, null, 4));
            callback(ret);
		}
		else {
			api.hideProgress();
		}
	})
}

u.getLatestMessages = function(chatType, chatId){
	rong.getLatestMessages({
		conversationType : chatType,
		targetId : chatId,
		count : 20
	}, function(ret, err) {
		api.sendEvent({
			name: 'getLastMsgEnd',
			extra: ret.result
		});
	})
}

u.getTotalUnreadCount = function(){
    rong.getTotalUnreadCount(function(ret, err) {
        api.sendEvent({
            name: 'messageUnread',
            extra: {
				type: 'chat',
				num: ret.result
			}
        });
    });
}

u.clearUnread = function(chatId, chatType, callback){
	rong.clearMessagesUnreadStatus({
		conversationType : chatType,
		targetId : chatId
	}, function(ret, err) {
		if (ret && ret.status) {
			u.getTotalUnreadCount();
			callback(chatId, chatType);
		}
	})
}

u.initEventListener = function(){

    // 监听融云连接状态
	rong.setConnectionStatusListener(function(ret, err) {
		var statuMsg = "";
		var rong_statu = ret.result.connectionStatus;
		switch(rong_statu) {
			case "CONNECTED":
				statuMsg = "连接成功";
				break;
			case "CONNECTING":
				statuMsg = "连接中";
				break;
			case "DISCONNECTED":
				statuMsg = "断开连接";
				break;
			case "KICKED":
				statuMsg = "用户账户在其他设备登录，本机会被踢掉线";
				break;
			case "NETWORK_UNAVAILABLE":
				statuMsg = "网络不可用";
				break;
			case "SERVER_INVALID":
				statuMsg = "服务器异常或无法连接";
				break;
			case "TOKEN_INCORRECT":
				statuMsg = "Token 不正确";
				break;
			default:
				statuMsg = "未知错误";
				break;
		}
	    // api.toast({
	    //     msg: statuMsg,
	    //     duration: 2000,
	    //     location: 'bottom'
	    // });
    });

	rong.setOnReceiveMessageListener(function(ret, err) {
        // 广播接收到消息了
        api.sendEvent({
            name: 'receivedMsg',
            extra: ret.result.message
        });
        u.getTotalUnreadCount();
        //console.log(JSON.stringify(ret, null, 4));
        vm.updateHTML(ret.result.message, 'receive');
		return;

		//rong_getConversationList();

	})

// 6.0 统一发送消息接口
// @msgType：消息类型，文字，图片，语言，地图，天气
// @conversationType：会话类型，单聊（PRIVATE），讨论组（DISCUSSION），群组（GROUP），聊天室（CHATROOM），客服（CUSTOMER_SERVICE），（SYSTEM）
// @targetId：接受方ID，可以是用户 Id、讨论组 Id、群组 Id 或聊天室 Id
// @content：发送内容
// @extra：用户自定义数据,一般extra是用户+token组装的json字符串
u.sendMsg = function(msg, callback) {
	var msgType = msg.msgType, conversationType = msg.chatType, targetId = msg.chatId, content = msg.content, extra = msg.extra;
	switch(msg.msgType) {
		// 发送文字消息
		case "text":
			rong.sendTextMessage({
				conversationType : conversationType,
				targetId : targetId,
				text : content,
				extra : extra
			}, function(ret,err){
				sendingMsg(ret, err)
			});
			break;
		// 发送语音
		case "voice":
			rong.sendVoiceMessage({
				conversationType : conversationType,
				targetId : targetId,
				voicePath : content,
				duration : $api.strToJson(extra).duration,
				extra : extra
			}, function(ret, err) {
				sendingMsg(ret, err)
			});
			break;
		// 发送图片
		case "image":
			rong.sendImageMessage({
				conversationType : conversationType,
				targetId : targetId,
				imagePath : content,
				extra : extra
			}, function(ret, err) {
				sendingMsg(ret, err)
			});
			break;
		// 发送图文
		case "richmsg":
			rong.sendRichContentMessage({
			    conversationType: 'PRIVATE',
			    targetId: targetId,
			    title: $api.strToJson(extra).wareTitle,
			    description: $api.strToJson(extra).wareId,// 此参数不能为空
			    imageUrl: content,
			    extra: extra
			}, function(ret, err) {
				sendingMsg(ret, err)
			});
			break;
		// 发送位置信息
		case "location":
			rong.sendLocationMessage({
				conversationType : conversationType,
				targetId : targetId,
				latitude : $api.strToJson(extra).lat,
				longitude : $api.strToJson(extra).lon,
				poi : $api.strToJson(extra).poi,
				imagePath : content,
				extra : extra
			}, function(ret, err) {
				sendingMsg(ret, err)
			});
			break;
		// 发送商品浏览消息（命令消息）
		case "cmd":
			// 命令消息类型需特殊处理
			var data = {
				extra: extra,
				text: content
			};
			rong.sendCommandMessage({
			    conversationType: conversationType,
			    targetId: targetId,
			    name: 'ware',
			    data: JSON.stringify(data)
			}, function(ret, err) {
				// 不需要展示给用户看
			});
			break;
		default:
			break;
	}

	function sendingMsg(ret, err){
		var _msg = ret.result.message;
		if (ret.status == 'prepare') {
			//console.log(JSON.stringify(_msg, null, 4));
			// 广播消息，发送准备中
			api.sendEvent({
				name: 'sendMsgPrepare',
				extra: _msg
			});
			// 存储当前发送信息
			$api.setStorage(_msg.messageId.toString(), ret);
		} else if (ret.status == 'success') {
			// 广播消息，发送成功
			api.sendEvent({
				name: 'sendMsgSuccess',
				extra: _msg
			});
			// 更新会话列表
			var msg = $api.getStorage(_msg.messageId.toString());
			vm.updateHTML(msg.result.message, 'send');
		} else if (ret.status == 'error') {
			// 广播消息，发送失败
			api.sendEvent({
				name: 'sendMsgError',
				extra: {
					errcode : err.code,
					messageId : _msg.messageId
				}
			});
		}
	}
}

// 获取历史记录
u.getHistoryMessages = function(data, callback){
	rong.getHistoryMessages({
		conversationType: data.chatType,
		targetId: data.chatId,
		oldestMessageId: data.lastMsgId,
		count: 20
	}, function(ret, err) {
		if(ret) {
			callback(ret);
		}
	})
}

u.loginOut = function(){

	rong.disconnect({
	    isReceivePush: true
	}, function(ret, err) {
	    if ('success' == ret.status) {
	        //api.toast({ msg: '断开连接成功!' });
	    }
	}); // 断开，且不再接收 Push
	
}

u.deleteMessages = function(id){
	rong.deleteMessages({
		messageIds: [id]
	}, function(ret, err) {
		if (ret.status == 'success') {
			api.sendEvent({
				name: 'delSuccess',
				extra: {id: id}
			});
		}
	})
}

}

/*end*/
window.rongyun = u;
})(window);