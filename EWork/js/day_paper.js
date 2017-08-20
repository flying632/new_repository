var companyId = localStorage.getItem('companyId');
var phoneNum = localStorage.getItem('phoneNum');
var thePage = 1;
 
/**
 * 下拉具体业务的实现
 */
function pullDownGetData() { 
	var table = document.body.querySelector('.mui-table-view');
	thePage = 1;
	//这个接口有问题，返回值是300   郭梦娜-2016-07-25-获得公司日报接口-		
	mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/Ribao/getribao/', {
		data: {
			companyid: companyId, //先以刘老师的companyid为例
			userid: phoneNum, //不知道是啥，获取的信息中没有
			page: thePage,
			num: 10,
		},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			mui.toast(data.msg);
			plus.nativeUI.closeWaiting();
			if(data.flag == 200) { 
				var result = data.result;
				var thePage = 1;
				
				table.innerHTML = "";
				for(var i = 0; i < result.length; i++) {
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.setAttribute('id', result[i].id);
					li.innerHTML = '<div class="first_line"><img class="headImg" src="' + result[i].personlogo + '"/>' +
						'<div class="username">' + result[i].name + '</div><div class="date">' + result[i].writedate + '</div></div>' +
						'<div class="second">' +
						'<span class="line"><span class="title">已完成</span>' + result[i].finishwork + '</span>' +
						'<span class="line"><span class="title">未完成</span>' + result[i].unfinishwork + '</span>' +
						'<span class="line"><span class="title">需协调</span>' + result[i].needhelp + '</span>' +
						'<span class="line"><span class="title">备注</span>' + result[i].moveinfo + '</span>' +
						'</div>';
					var numOfPhotos = result[i].imgurl.length;

					if(numOfPhotos != 0) {
						if(numOfPhotos == 1) {
							li.innerHTML += '<div class="photos"> <img class="mui-icon" style="width:100%;" src="' + result[i].imgurl[0].imgurl + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';

						} else if(numOfPhotos == 2) {
							li.innerHTML += '<div class="photos"><img class="mui-icon" style="width:40%;" src="' + result[i].imgurl[0].imgurl + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>' +
								'<img class="mui-icon" style="width:40%;" src="' + result[i].imgurl[1].imgurl + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';
						} else {
							li.innerHTML += '<div class="photos">';
							for(var j = 0; j < numOfPhotos; j++) {
								li.innerHTML += '<img class="mui-icon" style="height:100px"  src="' + result[i].imgurl[j].imgurl + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>';
							}
							li.innerHTML += '</div>';
						}
					}
					table.appendChild(li);
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.alert("无网络连接");
		}

	});  

}

/**
 * 上拉加载具体业务实现
 */
function pullUpGetData() {
	var table = document.body.querySelector('.mui-table-view');
	thePage++;
	//这个接口有问题，返回值是300   郭梦娜-2016-07-25-获得公司日报接口-		
	mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/Ribao/getribao/', {
		data: {
			companyid: companyId, //先以刘老师的companyid为例
			userid: phoneNum, //不知道是啥，获取的信息中没有
			page: thePage,
			num: 10,
		},
		type: 'post',
		timeout: 10000,
		success: function(data) {
			mui.toast(data.msg);
			if(data.flag == 200) {
				//mui.toast(data.msg);
				var result = data.result;
				
				for(var i = 0; i < result.length; i++) {
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.setAttribute('id', result[i].id);
					li.innerHTML = '<div class="first_line">	<img class="headImg" src="' + result[i].personlogo + '"/>' +
						'<div class="username">' + result[i].name + '</div><div class="date">' + result[i].writedate + '</div></div>' +
						'<div class="second">' +
						'<span class="line"><span class="title">已完成</span>' + result[i].finishwork + '</span>' +
						'<span class="line"><span class="title">未完成</span>' + result[i].unfinishwork + '</span>' +
						'<span class="line"><span class="title">需协调</span>' + result[i].needhelp + '</span>' +
						'<span class="line"><span class="title">备注</span>' + result[i].moveinfo + '</span>' +
						'</div>';
					var numOfPhotos = result[i].imgurl.length;

					if(numOfPhotos != 0) {
						if(numOfPhotos == 1) {
							li.innerHTML += '<div class="photos"> <img class="mui-icon" style="width:100%;" src="' + result[i].imgurl[0].imgurl + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';

						} else if(numOfPhotos == 2) {
							li.innerHTML += '<div class="photos"><img class="mui-icon" style="width:40%;" src="' + result[i].photourls[0].imgurl + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>' +
								'<img class="mui-icon" style="width:40%;" src="' + result[i].imgurl[1].imgurl + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';
						} else {
							li.innerHTML += '<div class="photos">';
							for(var j = 0; j < numOfPhotos; j++) {
								li.innerHTML += '<img class="mui-icon" style="height:100px"  src="' + result[i].imgurl[j].imgurl + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>';
							}
							li.innerHTML += '</div>';
						}
					}
					table.appendChild(li);
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			mui.alert("无网络连接");
		}

	});
}