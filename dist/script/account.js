/*
* @Author: 90431
* @Date:   2017-09-22 17:12:11
* @Last Modified by:   90431
* @Last Modified time: 2017-09-25 22:15:01
*/
(function(window) {

	var u = {};

	u.loginSucc = function(ret, type){
	    // 存储数据到本地
	    $api.setStorage('ID',ret.ID);	// id;
	    $api.setStorage('token',ret.token);	// 唯一标识码 ;
	    $api.setStorage('telphone',vm.tel); // 手机号码 ;
	    $api.setStorage('tel',vm.tel); // 手机号码 ;
	    $api.setStorage('lasttime',ret.lasttime); //最近的一次登录时间	;
	    $api.setStorage('img',ret.logo); //保存图片	;
	    $api.setStorage('nickname', ret.nickname);
	    $api.setStorage('sex', ret.sex);

	    setTimeout(sendevent, 200);

	    function sendevent(){
		    // 广播登录成功
		    api.sendEvent({
		        name: 'loginSuccess',
		        extra: ret
		    });
		    //类型是登录则跳转主页
		    if (type == 'login') {
		        api.toast({
		            msg: '登录成功',
		            duration: 2000,
		            location: 'middle'
		        });
			    api.closeToWin({
			        name: 'main_win',
			        animation: {
			            type: 'none'
			        }
			    });
		    }
		    // 类型是注册则跳去完善信息
		    if (type == 'register') {
		        api.toast({
		            msg: '注册成功',
		            duration: 2000,
		            location: 'middle'
		        });
		        api.openWin({
		            name: 'password_set_win',
		            url: '../account/password_set_win.html',
		            bounces: false,
		            pageParam: {
		            }
		        });
		    }
	    }


	}

	u.loginByCode = function(ret){
		
		$api.post(website + 'user_api.php?action=login', {
			values: {
				tel: vm.tel,
				smscode: vm.code
			}
		}, function(ret){
                if (!ret) {
                    tea.toast('ajax');
                    return false;
                }
                if (ret.succ == 1) {
                    u.loginSucc(ret.data, 'login');
                    return true;                
                }
                api.toast({
                    msg: ret.msg,
                    duration: 2000,
                    location: 'middle'
                }); 
		});

	}

	u.loginByPassword = function(ret){

		$api.post(website + 'user_api.php?action=login_psw', {
			values: {
				tel: vm.tel,
				password: vm.password
			}
		}, function(ret){
                if (!ret) {
                    tea.toast('ajax');
                    return false;
                }
                if (ret.succ == 1) {
                    u.loginSucc(ret.data, 'login');
                    return true;                
                }
                api.toast({
                    msg: ret.msg,
                    duration: 2000,
                    location: 'middle'
                }); 
		});

	}

    window.account = u;
    if (typeof Vue != 'undefined') {
        Vue.prototype.account = account;
    }
})(window);