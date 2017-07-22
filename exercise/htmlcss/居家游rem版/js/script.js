//获取像素比
//设置缩放常量
var piexl = 1 / window.devicePixelRatio;
var oHtml = document.getElementsByTagName('html')[0];
var oHead = document.getElementsByTagName('head')[0];
//写入mate标签 进行页面等比缩放
document.write('<meta name="viewport" content="width=device-width,initial-scale='+ 
	piexl +',minimum-scale='+ piexl +',maximum-scale='+ piexl +'">');
//获取设备视口宽度, 来动态改变字体大小
var pageWidth = oHtml.getBoundingClientRect().width;
oHtml.style.fontSize = pageWidth / 16 + 'px';
//监听视口宽度变化 动态改变字体大小
window.onresize = function () {
	var n = checkViewportChild(oHead);
	oHead.removeChild(oHead.children[n]);
	var piexl = 1 / window.devicePixelRatio;
    oHead.innerHTML += '<meta name="viewport" content="width=device-width,initial-scale='+ 
    piexl +',minimum-scale='+ piexl +',maximum-scale='+ piexl +'">';
	var pageWidth = oHtml.getBoundingClientRect().width;
    oHtml.style.fontSize = pageWidth / 16 + 'px';
}








/********************工具函数***************************************/

//检查带有viepot的meta标签 并返回在其父元素下的索引值
function checkViewportChild(obj) {
	var eleList = obj.children;
	for (var i = 0; i < eleList.length; i++) {
		if (eleList[i].tagName.toLowerCase() == "meta" && eleList[i].name == "viewport") {
			return i;
	   }
    }
}


