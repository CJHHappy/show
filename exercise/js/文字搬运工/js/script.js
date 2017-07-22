window.onload = function() {
	var container = document.getElementById('container');
	var textarea = container.getElementsByClassName('left')[0];
	var middle = container.getElementsByClassName('middle')[0];
	var ul = middle.getElementsByTagName('ul')[0];
	var aLi = ul.getElementsByTagName('li');
	var button = middle.getElementsByTagName('button')[0];
	var section = middle.getElementsByTagName('section')[0];
	var spanList = section.getElementsByTagName('span');
	var right = container.getElementsByClassName('right')[0];

	var timer = timer2 = null;
	var key = true;
	button.onclick = function () {
		if ( key == true && textarea.value != "") {
			//初始化
			key = false;
			var num = 0;
			var s = "";
			var i = 0;
			var str = textarea.value;
			var arr = str.split("");
		    spanList[1].innerHTML = str.length;
		    button.className = "active";
		    right.innerHTML = "";
		    ul.className = "active"
		    //执行
		    clearInterval(timer);
		    clearInterval(timer2);
		    timer2 = setInterval(function(){
		    	aLi[i].style.backgroundColor = "orange";
	    		i++;
	    		aLi[i].style.backgroundColor = "red";
	    		if(i == aLi.length - 1){
	    			aLi[i].style.backgroundColor = "orange";
	    			i = 0;
	    		}
		    },80);
		    timer = setInterval(function(){
		    	s = str.substring(num)
		    	textarea.value = s;
		    	right.innerHTML +=  arr[num];
		    	num++;
		    	spanList[0].innerHTML = num;
		    	if (num > str.length - 1) {
		    		num = str.length;
		    		ul.className = "";
		    		clearInterval(timer2);
		    		clearInterval(timer);
		    		textarea.value = "";
				    key = true
				    button.className = "";
		    	}
		    },40);    
		}
	}
}