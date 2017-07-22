window.onload = function (){
	/*
	初始化
	*/
	var container = document.getElementById('container');
	var text = container.getElementsByClassName('text')[0];
	var button = container.getElementsByClassName('button')[0];
	var oUl = container.getElementsByClassName('content-list')[0];
	/*
	执行动作
	*/
	button.onclick = function (){
		var value = text.value;
		var Li = document.createElement('li');
		Li.innerHTML = value;
		var span = document.createElement('span');
		span.innerHTML = "删除";
		span.onclick = function (){
			oUl.removeChild(this.parentNode);
		}
		Li.appendChild(span);
		if (oUl.children[0]) {
			oUl.insertBefore(Li, oUl.children[0]);
		}
		else{
			oUl.appendChild(Li);
		}
		var liList = oUl.getElementsByTagName('li');
		if (liList.length > 5) {
			oUl.removeChild(oUl.lastElementChild)
		}
		text.value = "";
	}
}