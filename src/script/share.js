function share(){
	var token = $api.getStorage('token');
	var agid = null;
	showp('数据加载中','');
	api.ajax({
	    url: website + 'getmyinfo.php',
	    method: 'post',
	    timeout: 30,
	    dataType: 'json',
	    returnAll:false,
	    data:{
	        values: {token: token},
	    }
	},function(ret,err){
	    if (ret) {    	    
	        agid = ret.agid;
	        if(!agid || agid == ''){
	        	agid = '8888888';
	        } 	
	        getagid(agid);	        
			api.hideProgress();
	    }
	});
}
function getagid(agid){
	var key,url;
	var dialogBox = api.require('dialogBox');
	dialogBox.actionMenu ({
		rect:{
			h: 180
		},
		texts:{
			cancel:'取消'
		},
		tapClose: true,
		items:[
			{
				text: '微信好友',
				icon: 'widget://image/wxhy.png'
			},
			{
				text: '朋友圈',
				icon: 'widget://image/wxpyq.png'
			}
		],
		styles:{
			bg:'#FFF',
			column: 2,
			itemText: {
				color: '#000',
				size: 12,
				marginT:8
			},
			itemIcon:{
				size:50
			},
			border:{color:'#eee', width: 2,
				marginT:15
			},
			cancel:{
				bg:'fs://icon.png',
				h:60,
				color:'#999',
				size:16
			}
		}
	}, function(ret){
	    var userid = $api.getStorage('ID');
		if(ret.eventType == 'cancel'){
			dialogBox.close({
				dialogName:"actionMenu"
			})
			return false;
		}else if(ret.index == 0){
			key = 'session';
		}else if(ret.index == 1){
			key = 'timeline';
		}
		if(agid == '8888888'){
			url = website + 'wx/activity20170921/share.php?friid='+ userid
		}else {
			url = website + '/wx/gotoapp.php?agid=' + agid + '&friid=' + userid
		}
		var wx = api.require('wx');
		wx.shareWebpage({
			apiKey: '',
			scene: key,
			title: '小马哥在线审车',
			description: '小马哥在线审车，环检加年审只收160元，修理费全免!修到好修到合格为止!',
			thumb: 'widget://image/logo108.png',
			contentUrl: url,
		}, function(ret, err){
			if(ret.status){
				api.alert({msg: '分享成功'})
			}
		});
	});
}

function shareImg(obj){
	var url = obj.url,
		title = obj.title,
		description = obj.description,
		scene = obj.scene,
		thumb = obj.thumb;
	shareToWX();

	function shareToWX(){
		var wx = api.require('wx');
		wx.isInstalled(function(ret, err) {

			if (!ret.installed) {
				alert('当前设备未安装微信客户端');
				return false;
			}
			wx.shareImage({
				apiKey: '',
				scene: scene,
				thumb: api.systemType == 'ios' ? 'widget://image/logo108.png' : null,
				contentUrl: url
			}, function(ret, err) {
				if (ret.status) {
					alert('分享成功');
				} else {
					alert('分享未成功');
				}
			});
		});
	}

		

	// function shareToQQ(){
	// 	var qq = api.require('QQPlus');
	// 	qq.installed(function(ret, err) {

	// 		if (!ret.status) {
	// 			alert('当前设备未安装QQ客户端');
	// 			return false;
	// 		}

	// 		qq.shareNews({
	// 			url: url,
	// 			title: title,
	// 			description: description,
	// 			imgUrl: thumb,
	// 			type: scene
	// 		}, function(ret, err){
	// 			if(ret.status){
	// 				api.alert({msg: '分享成功'})
	// 			}
	// 		});
	// 	});
	// }	

}