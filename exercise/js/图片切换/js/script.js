window.onload = function(){
	var xunhaun = document.getElementById('xunhuan');
	var shunxu = document.getElementById('shunxu');
	var view = document.getElementById('view');
	var left = document.getElementById('left');
	var right = document.getElementById('right');
	var tu = document.getElementById('tu');
	var imgArr = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg"];
	var count = 0;
	var key = 0;
	xunhuan.onclick = function(){
		view.innerHTML = "图片可以从最后一张切换到第一张";
		key = 0;
		switch(key){
		case 0 : 
			key = 0;
		    break;
		case 1 : 
			key = 3;
		    break;
	    }
	}
	shunxu.onclick = function(){
		view.innerHTML = "图片只能切换到第一张或者最后一张";
		key = 1;
		switch(key){
		case 0 : 
			key = 0;
		    break;
		case 1 : 
			key = 3;
		    break;
	    }
	}
	

	left.onclick = function(){
        if(count > imgArr.length - 2){
			count = key;
			if(count == 3){
				alert("已经是最后一张了")
			}	
			tu.src = imgArr[count];
			show.innerHTML = (count + 1) + "/4";
		}
		else{
			count++;
			tu.src = imgArr[count];
			show.innerHTML = (count + 1) + "/4";
		}
	}
	right.onclick = function(){
		 if(count < 1){
			count = 3 - key;
			if(count == 0){
				alert("已经是第一张了")
			}		
			tu.src = imgArr[count];
			show.innerHTML = (count + 1) + "/4";
		}
		else{
			count--;
			tu.src = imgArr[count];
			show.innerHTML = (count + 1) + "/4";
		}
	}
}