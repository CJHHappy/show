window.onload = function(){
	var wechat = document.getElementById('wechat');
	var mes = document.getElementById('mes-cont');
	var back = document.getElementById('back');
	var message = document.getElementById('mesage');

	var user = document.getElementById('user');
	var text = document.getElementById('text');
	var button = document.getElementById('button');
	var key = true;

	button.onclick = function(){
		if(text.value == ""){
			return;
		}
		var mesdiv = document.createElement('div');
		message.appendChild(mesdiv);
		var messpan1 = document.createElement('span');
		mesdiv.appendChild(messpan1);
		var messpan2 = document.createElement('span');
		mesdiv.appendChild(messpan2);
		messpan2.innerHTML = text.value;
		if(user.innerHTML == "李二"){
			messpan1.className = "lier";
			messpan2.className = "lier1";
			messpan1.innerHTML = user.innerHTML + " :" ; 
		}
		else{
			messpan1.className = "zhangsan";
			messpan2.className = "zhangsan1";
			messpan1.innerHTML = ": " + user.innerHTML;
		}
		text.value = "";
	}
	user.onclick = function(){
		if(key == true){
			user.innerHTML = "张三";
			key = false;
		}
		else{
			user.innerHTML = "李二";
			key = true;
		}
	}
	wechat.onclick = function(){
		setTimeout(function(){
			mes.className = "";
			mes.style.display = "block";
		},350);
			
	}
	wechat.onmousedown = function(){
		wechat.style.backgroundColor = '#0EA80B';
	}
	wechat.onmouseup = function(){
		wechat.style.backgroundColor = '#0EBF0B';
	}
	back.onclick = function(){
		mes.className = "small";
		setTimeout(function(){
			mes.style.display = "none";
		},150);
	}
}