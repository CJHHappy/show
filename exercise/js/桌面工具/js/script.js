window.onload = function(){
	var nav = document.getElementById('nav');
	var oImg = nav.getElementsByTagName('img');

	document.onmouseover = function(ev){
		/*获取鼠标位置*/
		var ev = ev || window.event;//浏览器兼容处理事件event对象,ie 为window.event
		for(var i = 0; i < oImg.length; i++){
			var x = oImg[i].offsetLeft + oImg[i].offsetWidth / 2;
			var y = oImg[i].offsetTop + oImg[i].offsetHeight / 2 + nav.offsetTop;
			// console.log(x,y);
			var ax = ev.clientX - x;
			var ay = ev.clientY - y;
			var distance = Math.sqrt(Math.pow(ax, 2) + Math.pow(ay, 2));
			// console.log(distance);
			var scale = 1 - distance / 250;
			if(scale < 0.5){
				scale = 0.5;
			}
			oImg[i].style.width = scale * 160 + "px";
			oImg[i].style.height = scale * 160 + "px";
		}
	}
}