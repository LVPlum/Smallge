/*
* @Author: 90431
* @Date:   2017-09-16 12:14:46
* @Last Modified by:   90431
* @Last Modified time: 2017-09-22 14:37:55
*/
function openFrmDialog(data) {
	api.openFrame({
	    name: 'offers_dialog_frm',
	    url: '../unit/offers_dialog_frm.html',
	    rect: {
	        x: 0,
	        y: 0,
	        w: 'auto',
	        h: 'auto'
	    },
	    pageParam: {
	        data: data
	    },
	    bounces: false,
	    bgColor: 'rgba(0,0,0,0.6)',
	    vScrollBarEnabled: false,
	    hScrollBarEnabled: false
	});
}
