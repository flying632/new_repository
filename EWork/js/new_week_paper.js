var url = 'http://121.42.29.124/workoa/index.php?s=/Api/Zhoubao/addzhoubao';

var task;
var photos = [];
var companyId = localStorage.getItem('companyId');
var this_phoneNum = localStorage.getItem('phoneNum');

var finish = document.getElementById('finish');
var max = 6; //照片的最大数目
var photosNum;
var camera_photos = [];
var gallery_photos = [];
 
function createUploader() {
	task = plus.uploader.createUpload(url, {
		method: 'POST'
	}, function(data, status) {
		mui.alert(JSON.stringify(data));
		if(status == 200) {
			
			plus.nativeUI.closeWaiting();
			var page = plus.webview.getWebviewById('week_paper_sub.html');
			mui.fire(page, 'refresh', {});
			mui.openWindow({
				id: 'week_paper_main.html',
			});
		} else {
			mui.alert(status);
		}
	});

}

finish.addEventListener('tap', function() {
	var files;
	var finishWork = document.getElementById('finishWork').value;
	var unfinishWork = document.getElementById('unfinishWork').value;
	var needHelp = document.getElementById('needHelp').value;
	var moveInfo = document.getElementById('moveInfo').value;  
	
 
	var len = photos.length; 
	task.addData('userid', this_phoneNum);
	task.addData('companyid', companyId);
	task.addData('finishwork', finishWork);
	task.addData('unfinishwork', unfinishWork);
	task.addData('needhelp',needHelp);
	task.addData('moveinfo',moveInfo);
	
	for(var i = 0; i < len; i++) { 
		var temp = 'picture' + i;
		task.addFile(photos[i].path, {
			key: temp
		});
	}
	task.start();
	plus.nativeUI.showWaiting(); 
});

//从相机中选取图片
function clickCamera() {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {

			var path = entry.toLocalURL();
			var name = path.substr(e.lastIndexOf('/') + 1);

			//压缩图片到内存
			plus.zip.compressImage({
				src: path,
				dst: '_doc/' + path,
				quality: 20,
				overwrite: true
			}, function(zip) {
				camera_photos.push({
					path: zip.target
				});
				photos.push({
					path: zip.target
				});
				showPhotos();
			}, function(error) {
				console.log("压缩error");
			});

		}, function(e) {
			mui.toast("读取拍照文件错误" + e.message);
		});
	})
};
/*
function clickGallery() {
	plus.gallery.pick(function(e) {
		name = e.substr(e.lastIndexOf('/') + 1);
		
		mui.alert(name);
		plus.zip.compressImage({
			src: e,
			dst: '_doc/' + name,
			overwrite:true,
			quality:50
		},function(zip){
			photos.push({path:zip.target}); 
			showPhotos();
		});
	});

}*/

//确定还可以从相册中选择照片的最大数目  
var galleryPhotoNum;
var galleryFiles;

function clickGallery() {
	galleryPhotoNum = max - camera_photos.length;
	plus.gallery.pick(function(path) {
			galleryFiles = path.files; 
			plus.nativeUI.showWaiting();
		    compressImg(galleryFiles, 0);
		},
		function(e) {
			console.log("获取照片失败");
		}, {
			filter: "image",
			multiple: true,
			maximum: galleryPhotoNum,
			system: false,
			onmaxed: function() {
				mui.toast('最多选' + galleryPhotoNum + '个');
			},
			popover: true,
			selected: galleryFiles
		});
}
//递归压缩图片
function compressImg(files, file_index) {
	var file_length = files.length;
	var path = files[file_index];
	plus.zip.compressImage({
		src: path,
		dst: '_doc/' + path,
		quality: 20,
		overwrite: true
	}, function(zip) {
		var next_file_index = file_index + 1;
		if(file_index == 0) {
			gallery_photos = [];
		}
		gallery_photos.push({
			path: zip.target
		});
		addPhoto(zip.target, file_index);
		if(next_file_index < file_length) {
			compressImg(files, next_file_index);
		} else {
			showPhotos();
		}
	})
}

function addPhoto(imgPath, index) {
	if(index == 0) {
		photos = [];
		for(var i = 0; i < camera_photos.length; i++) {
			photos.push({
				path: camera_photos[i].path
			});
		}
	}
	photos.push({
		path: imgPath
	});
}

function showPhotos() {
	var table = document.body.querySelector('#photos');
	var len = photos.length; 
	if(len > max) {
		len = max;
	}
	table.innerHTML = "";
	for(var i = 0; i < len; i++) {
		var img = document.createElement('img');
		img.src = photos[i].path;
		table.appendChild(img)
	}
	plus.nativeUI.closeWaiting();
	if(len == max) {
		document.getElementById('pick').style.display = 'none';
	}
}