/*
* @Author: 90431
* @Date:   2017-09-20 15:11:24
* @Last Modified by:   90431
* @Last Modified time: 2017-10-10 10:50:34
*/

var eventListener = {
	android: function(){
		ajpush.setListener(
		    function(ret) {
			    api.sendEvent({
			       name: 'getunread',
			       extra: {}
			    }); 
		    }
		);
		api.addEventListener({
		    name: 'appintent'
		}, function(ret, err){
		    if( ret && ret.appParam.ajpush ){
	    		openWinPush(ret.appParam.ajpush.extra);
		    }
		});
	},
	ios: function(){
		// 在后台时
		api.addEventListener({
		    name: 'noticeclicked'
		}, function(ret, err){
		    if( ret && ret.value ){
		        if (typeof ret.value == 'object') {
		        	//console.log(JSON.stringify(ret, null, 4));
		        	var r = ret.value.extra;
					openWinPush(r);
		        }
		        
		    }
		});

		//这是ios界面在前台的判断
		ajpush.setListener(        
		    function(ret) {	
				    api.sendEvent({
				       name: 'getunread',
				       extra: {}
				    });
				  // 一共有两次回调，一次只返回状态不返回结果
				  if (typeof ret.extra == 'undefined') return false; 
		          var mtype = ret.extra.type;
		          var pageid = ret.extra.pageid;
		          var txt = ret.extra.txt;
		          var url = ret.extra.url;
	              if(mtype == 'newsly'){    //如果为新鲜事留言                         
						api.confirm({
						    title: '消息提示',
						    msg: ret.content + ',是否要立即查看？',
						    buttons: ['是', '否']
						},function( ret, err ){
						    if( ret ){
					            if( ret.buttonIndex == 1){
									api.openWin({
								        name: 'tanewscontent_win',
								        url: '../news/tanewscontent_win.html',
								        pageParam: {ID: pageid},
								        vScrollBarEnabled: false
								   	 });
					            }
						    }
						});                                
	              }else{
			    		var arr = url.split('/');
			    		var name = arr[arr.length -1].split('.')[0];
						api.confirm({
						    title: '消息提示',
						    msg: ret.content +',是否要立即查看？',
						    buttons: ['是', '否']
						},function( ret, err ){
						    if( ret ){
					            if( ret.buttonIndex == 1){                          
								api.openWin({
							        name: name,
							        url: url,
							        pageParam: {id: pageid, txt: txt},
							        vScrollBarEnabled: false
							   	 }); 
					            }
						    }
						});  									   	                                               
	              }			                
		    }
		);		
	}
}



function openWinPush(r){
    api.sendEvent({
       name: 'getunread',
       extra: {}
    });
	var mtype = r.type;
	var txt = r.txt;
	var title = r.title;
	var content = r.content;
	var url = r.url;
    var pageid = r.pageid;
    switch (mtype) {
    	case 'newsly':
    		api.openWin({
    		    name: 'tanewscontent_win',
    		    url: '../news/tanewscontent_win.html',
    		    pageParam: {
    		        ID: pageid
    		    }
    		});
    		break;
    	case 'sys':
    		api.openWin({
    		    name: 'sysnews_win',
    		    url: '../notice/sysnews_win.html',
    		    pageParam: {
    		    	title: title,
    		    	content: content,
    		    	url: url
    		    }
    		});
    		break;
    	default:
    		var arr = url.split('/');
    		var name = arr[arr.length -1].split('.')[0];
			api.openWin({
		        name: name,
		        url: url,
		        pageParam: {
		        	id: pageid,
		        	txt: txt
		        },
		        vScrollBarEnabled: false
		   	 });		            	
    }	
}