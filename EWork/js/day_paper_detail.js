var url='http://121.42.29.124/workoa/index.php?s=/Api/ribao/getribaobyid/';
var companyId = localStorage.getItem('companyId');
var this_phoneNum = localStorage.getItem('phoneNum');
function sendRequest() {
			//得到动态内容
			mui.ajax(url, {
				data: {
					 ribaoid:id
				},
				dataType: 'json',
				type: 'get',
				timeout: 10000,
				headers: {
					'content-Type': 'application/json'
				},
				success: function(data) {
					//mui.alert(JSON.stringify(data));
					mui.toast(data.msg);
					if(data.flag == '200') {
					//	mui.alert(JSON.stringify(data.result));
						showContent(data.result[0]);
					} 
				},
				error: function(xhr, type, errorThrown) {
					mui.alert("无网络连接");
				}

			});

		}
	function showContent(result) { 
		 
			var body = document.getElementById('body');
			body.innerHTML = '<ul class="mui-table-view"><li class="mui-table-view-cell"><img class="mui-pull-left" src="'+result.personlogo+'" />'+
							'<div class="mui-pull-left name">'+result.name+'<span class="date">'+result.writedate+'</span></div></li></ul>'+
							'<div class="container"><div class="detail"><div class="key"><span>已完成</span></div><div class="value"><span>'+result.finishwork+'</span></div>	</div>'+
							'<div class="detail"><div class="key"><span>未完成</span></div><div class="value"><span>'+result.unfinishwork+'</span></div></div>'+
							'<div class="detail"><div class="key"><span>需协调</span></div><div class="value"><span>'+result.needhelp+'</span></div></div>'+
							'<div class="detail"><div class="key" style="letter-spacing: 30px;"><span>备注</span></div><div class="value"><span>'+result.moveinfo+'</span></div></div></div>'+
							'<ul class="mui-table-view reply"><li class="mui-table-view-cell"><img class="mui-icon" src="../../images/Assets.xcassets/comment.imageset/comment@2x.png" /><span>暂无回复</span></li></ul>';
							
//
//			var numOfPhotos = result.photourls.length;
//
//			if(numOfPhotos != 0) {
//				if(numOfPhotos == 1) {
//					body.innerHTML += '<div class="photos"> <img class="photo" style="width:100%;" src="' + result.photourls[0].url + '" data-preview-src="" data-preview-group="' + 1 + '"/> </div>';
//
//				} else if(numOfPhotos == 2) {
//					body.innerHTML += '<div class="photos"><img class="photo" style="width:40%;" src="' + result.photourls[0].url + '" data-preview-src="" data-preview-group="' + 1 + '"/>' +
//						'<img class="photo" style="width:40%;" src="' + result.photourls[1].url + '" data-preview-src="" data-preview-group="' + 1 + '"/> </div>';
//				} else {
//					body.innerHTML += '<div class="photos">';
//					for(var j = 0; j < numOfPhotos; j++) {
//						body.innerHTML += '<img class="photo"  src="' + result.photourls[j].url + '" data-preview-src="" data-preview-group="' + 1 + '"/>';
//					}
//					body.innerHTML += '</div>';
//				}
//			}
//
//			body.innerHTML += '<div class="bottom"><div class="likeImg" id="like" ><img class="like_img" src="../../images/Assets.xcassets/heart.imageset/heart@2x.png" />' +
//				'<div class="num_like">' + result.laud_count + '</div></div>' +
//				'<div class="commentImg" id="comment" ><div class="comment_img">' + result.comment_count + '</div><img class="num_comment" src="../../images/Assets.xcassets/comment_fill.imageset/comment_fill@2x.png"  />' +
//				'</div></div>';

		}