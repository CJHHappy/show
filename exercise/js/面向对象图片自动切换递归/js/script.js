function getStyle(obj, str){
	if(obj.currentStyle){
		return obj.currentStyle[str];
	}
	else{
		return getComputedStyle(obj)[str];
	}
}
function ImgScroll() {
	this.container = null;
	this.cont = null;
	this.ul1 = null;
	this.lis = null;
	this.contp = null;
	this.timer = null;
	this.timer1 = null;
	this.timer2 = null;
	this.n = 0;
}
ImgScroll.prototype.init = function (id) {
	this.container = document.getElementById(id);
	this.cont = this.container.getElementsByClassName('img-cont')[0];
	this.ul1 = this.cont.getElementsByTagName('ul')[0];
	this.lis = this.ul1.getElementsByTagName('li');
	this.contp = [];
	this.timer = null;
	this.timer1 = null;
	this.timer2 = null;
	this.n = 0;
	for(var i = 0; i < this.lis.length; i++){
		this.contp[i] = this.lis[i].getElementsByTagName('p')[0];
	}
	var This = this;
	var f = function() {
  		This.movePUp(This.n,function() {
	  		setTimeout(function() {
	  			This.movePDown(This.n, function() {
	  				This.move(function(){
	  					f();
	  				});
	  			});
	  		},1000);
	  	});
  	}
  	f();
}
ImgScroll.prototype.move = function(fn) {
	var This = this;
	this.timer2 = setInterval(function(){
		if(-This.ul1.offsetLeft > This.ul1.offsetWidth - 2 * This.lis[1].offsetWidth ){
			This.ul1.style.left = 0 + "px";
			This.n = 0;
			clearInterval(This.timer2);
			fn && fn();
		}
		else{
			This.ul1.style.left = This.ul1.offsetLeft - This.lis[1].offsetWidth + 'px';
			clearInterval(This.timer2);
			This.n++; 
			fn && fn();
	    }
	});
}
ImgScroll.prototype.movePUp = function(a, endFn1){
	var This = this;
	this.timer = setInterval(function(){	
		if( parseInt(getStyle(This.contp[a], 'bottom')) > 0){
			This.contp[a].style.bottom = 0;
			clearInterval(This.timer);
			endFn1 && endFn1();
		}
		else{
			This.contp[a].style.bottom = parseInt(getStyle(This.contp[a], 'bottom')) + 1 + "px";
		}
	},30);
}
ImgScroll.prototype.movePDown = function(c, endFn2){
	var This = this;
	this.timer1 = setInterval(function(){	
		if( parseInt(getStyle(This.contp[c], 'bottom')) < -50){
			This.contp[c].style.bottom = -50 + "px";
			clearInterval(This.timer1);
			endFn2 && endFn2();
		}
		else{
			This.contp[c].style.bottom = parseInt(getStyle(This.contp[c], 'bottom')) - 1 + "px";
		}
	},30);
}
window.onload = function(){
	var img = new ImgScroll();
	img.init('container');
}

