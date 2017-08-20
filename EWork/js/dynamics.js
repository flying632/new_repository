//添加监听事件，获得全文展示
var result;
var thePage = 1;
var this_phoneNum;
 
/*
mui('.mui-table-view').on('tap', '.mui-table-view-cell', function() {
	var talk_content = this.getElementsByTagName('p');
	var className = talk_content[0].getAttribute('class');
	if(className == 'talk_all') {
		talk_content[0].setAttribute('class', 'talk');
	} else {
		talk_content[0].setAttribute('class', 'talk_all');
	}
});
*/

function getData(thePage, dateTime) { 
	this_phoneNum = localStorage.getItem('phoneNum');
	
	//请求数据  
	mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/search/jh_circle_moments', {
		data: {
			phoneNum: this_phoneNum,
			page: thePage,
			flag: '1',
			datetime: "", //加入时间时返回值为false
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		headers: {
			'content-Type': 'application/json'
		},
		success: function(data) {
			var table = document.getElementById('table');
			table.innerHTML = "";
			if(data.flag == '200') {

				

				table.innerHTML = "";
				result = data.result;
				for(var i = 0; i < result.length; i++) {
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.setAttribute('id',result[i].id);
					li.innerHTML = '<div id="mainBody"><div class="head"> <img class="headImg" src="' + result[i].personlogo + '"/> <div class="username">' +
						result[i].name + '</div> </div>' + '<div class="content"> <p class="talk">' + result[i].describe + '</p> </div>';

					var numOfPhotos = result[i].photourls.length;

					if(numOfPhotos != 0) {
						if(numOfPhotos == 1) {
							li.innerHTML += '<div class="photos"> <img class="mui-icon" style="width:100%;" src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';

						} else if(numOfPhotos == 2) {
							li.innerHTML += '<div class="photos"><img class="mui-icon" style="width:40%;" src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>' +
								'<img class="mui-icon" style="width:40%;" src="' + result[i].photourls[1].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';
						} else {
							li.innerHTML += '<div class="photos">';
							for(var j = 0; j < numOfPhotos; j++) {
								li.innerHTML += '<img class="mui-icon" style="height:100px"  src="' + result[i].photourls[j].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>';
							}
							li.innerHTML += '</div>';
						}
					}
					li.innerHTML += '<div class="date">' + result[i].date + '</div></div>';
					
					li.innerHTML += '<div class="bottom"><div class="like"><img class="like_img" src="../../images/Assets.xcassets/heart.imageset/heart@2x.png" />'+
								'<div class="num_like">'+result[i].laud_count+'</div></div>'+
								'<div class="comment"><div class="comment_img">'+result[i].comment_count+'</div><img class="num_comment" src="../../images/Assets.xcassets/comment_fill.imageset/comment_fill@2x.png"  />'+
								'</div></div>'
					table.appendChild(li);

				}
			}

		},
		error: function(xhr, type, errorThrown) {
			mui.alert("无网络连接");
		}

	});
}
//下拉刷新, 时间戳的具体作用，暂时未知，现行搁置
function pulldownGetData(Page, dateTime) {
	//请求数据  
	mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/search/jh_circle_moments', {
		data: {
			phoneNum: this_phoneNum,
			page: Page,
			flag: '1',
			datetime: "", //加入时间时返回值为false
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		headers: {
			'content-Type': 'application/json'
		},
		success: function(data) { 
			var table = document.getElementById('table');
			table.innerHTML = "";
			if(data.flag == '200') {

				

				
			    result = data.result;
				for(var i = 0; i < result.length; i++) {
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.setAttribute('id',result[i].id);
					li.innerHTML = '<div class="head"> <img class="headImg" src="' + result[i].personlogo + '"/> <div class="username">' +
						result[i].name + '</div> </div>' + '<div class="content"> <p class="talk">' + result[i].describe + '</p> </div>';

					var numOfPhotos = result[i].photourls.length;

					if(numOfPhotos != 0) {
						if(numOfPhotos == 1) {
							li.innerHTML += '<div class="photos"> <img class="mui-icon" style="width:100%;" src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';

						} else if(numOfPhotos == 2) {
							li.innerHTML += '<div class="photos"><img class="mui-icon" style="width:40%;" src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>' +
								'<img class="mui-icon" style="width:40%;" src="' + result[i].photourls[1].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';
						} else {
							li.innerHTML += '<div class="photos">';
							for(var j = 0; j < numOfPhotos; j++) {
								li.innerHTML += '<img class="mui-icon" style="height:100px" src="' + result[i].photourls[j].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>';
							}
							li.innerHTML += '</div>';
						}
					}
					li.innerHTML += '<div class="date">' + result[i].date + '</div>';
					li.innerHTML += '<div class="bottom"><div class="like"><img class="like_img" src="../../images/Assets.xcassets/heart.imageset/heart@2x.png" />'+
								'<div class="num_like">'+result[i].laud_count+'</div></div>'+
								'<div class="comment"><div class="comment_img">'+result[i].comment_count+'</div><img class="num_comment" src="../../images/Assets.xcassets/comment_fill.imageset/comment_fill@2x.png"  />'+
								'</div></div>'
					table.appendChild(li);

				}
				mui.toast("刷新成功");
			} else {
				mui.toast("刷新失败");
			}
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();

		},
		error: function(xhr, type, errorThrown) {
			mui.alert("wrron");
		}

	});
}

function pullupGetData(Page, dateTime) {
	//请求数据
	mui.ajax('http://121.42.29.124/workoa/index.php?s=/Api/search/jh_circle_moments', {
		data: {
			phoneNum: this_phoneNum,
			page: Page,
			flag: '2',
			datetime: "",
		},
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		headers: {
			'content-Type': 'application/json'
		},
		success: function(data) {
			thePage++;
			if(data.flag == '200') {
				var table = document.getElementById('table');

				result = data.result;
				for(var i = 0; i < result.length; i++) {
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.setAttribute('id',result[i].id);
					li.innerHTML = '<div id="mainBody> <div class="head"> <img class="headImg" src="' + result[i].personlogo + '"/> <div class="username">' +
						result[i].name + '</div> </div>' + '<div class="content"> <div class="talk mui-ellipsis-2">' + result[i].describe + '</div>';

					var numOfPhotos = result[i].photourls.length;

					if(numOfPhotos != 0) {
						if(numOfPhotos == 1) {
							li.innerHTML += '<div class="photos"> <img class="mui-icon" style="width:100%;" src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';

						} else if(numOfPhotos == 2) {
							li.innerHTML += '<div class="photos"><img class="mui-icon" style="width:40%;" src="' + result[i].photourls[0].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>' +
								'<img class="mui-icon" style="width:40%;" src="' + result[i].photourls[1].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/> </div>';
						} else {
							li.innerHTML += '<div class="photos">';
							for(var j = 0; j < numOfPhotos; j++) {
								li.innerHTML += '<img class="mui-icon" style="height:100px" src="' + result[i].photourls[j].url + '" data-preview-src="" data-preview-group="' + i * thePage + '"/>';
							}
							li.innerHTML += '</div>';
						}
					}
					li.innerHTML += '<div class="date">' + result[i].date + '</div></div>';
					li.innerHTML += '<div class="bottom"><div class="like"><img class="like_img" src="../../images/Assets.xcassets/heart.imageset/heart@2x.png" />'+
								'<div class="num_like">'+result[i].laud_count+'</div></div>'+
								'<div class="comment"><div class="comment_img">'+result[i].comment_count+'</div><img class="num_comment" src="../../images/Assets.xcassets/comment_fill.imageset/comment_fill@2x.png"  />'+
								'</div></div>'
					table.appendChild(li);

				}
				mui.toast("刷新成功");
			} else {
				mui.toast("无更多数据");
			}
			mui('#pullrefresh').pullRefresh().endPullupToRefresh();

		},
		error: function(xhr, type, errorThrown) {
			mui.alert("wrron");
		}

	});
}

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentDate = date.getFullYear() + seperator1 + month + seperator1 +
		strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
	return currentDate;
}
/**
 * 下拉具体业务的实现
 */
function pulldownRefresh() {
	thePage = 1;
	pulldownGetData(1, getNowFormatDate());
}

function pullupRefresh() {
	pullupGetData(thePage + 1, getNowFormatDate());

}