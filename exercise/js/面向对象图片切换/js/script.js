function ImgPlay() {
	this.box = null;
	this.xunhaun = null;
	this.shunxu = null;
	this.view = null;
	this.left = null;
	this.right = null;
	this.tu = null;
	this.show = null;
	this.imgArr = null;
	this.count = 0;
	this.key = 0;
}

ImgPlay.prototype.init = function(id, arr) {
	var This = this;
	this.box = document.getElementById(id);
	this.xunhuan = this.box.getElementsByClassName('xunhuan')[0];
	this.shunxu = this.box.getElementsByClassName('shunxu')[0];
	this.view = this.box.getElementsByClassName('view')[0];
	this.left = this.box.getElementsByClassName('left')[0];
	this.right = this.box.getElementsByClassName('right')[0];
	this.tu = this.box.getElementsByClassName('tu')[0];
	this.show = this.box.getElementsByClassName('show')[0];
	this.imgArr = arr;
	this.xunhuan.onclick = function(){
		// alert(this);
		This.xunhuan1();
	}
	this.shunxu.onclick = function(){
		// alert(This.id);
		This.shunxu1();
	}
	this.left.onclick = function(){
		This.left1();        
	}
	this.right.onclick = function(){
		This.right1();
	}
}

ImgPlay.prototype.xunhuan1 = function() {
	this.view.innerHTML = "图片可以从最后一张切换到第一张";
	this.key = 0;
	panduan(this.key);
}

ImgPlay.prototype.shunxu1 = function() {
	this.view.innerHTML = "图片只能切换到第一张或者最后一张";
	this.key = 1;
	panduan(this.key);
}

ImgPlay.prototype.left1 = function() {
	if(this.count > this.imgArr.length - 2){
		this.count = this.key;
		if(this.count == 3){
			alert("已经是最后一张了")
		}	
		this.tu.src = this.imgArr[this.count];
		this.show.innerHTML = (this.count + 1) + "/4";
	}
	else{
		this.count++;
		this.tu.src = this.imgArr[this.count];
		this.show.innerHTML = (this.count + 1) + "/4";
	}
}

ImgPlay.prototype.right1 = function() {
	if(this.count < 1){
		this.count = 3 - this.key;
		if(this.count == 0){
			alert("已经是第一张了")
		}		
		this.tu.src = this.imgArr[this.count];
		this.show.innerHTML = (this.count + 1) + "/4";
	}
	else{
		this.count--;
		this.tu.src = this.imgArr[this.count];
		this.show.innerHTML = (this.count + 1) + "/4";
	}
}

function panduan(num) {
	switch(num){
		case 0 : 
			num = 0;
		    break;
		case 1 : 
			num = 3;
		    break;
    }
}

window.onload = function(){
	var arr = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg"];
	var img = new ImgPlay();
	img.init('box', arr);
}