window.onload = function(){
	var cont = document.getElementById('img-cont');
	var ul1 = cont.getElementsByTagName('ul')[0];
	var lis = ul1.getElementsByTagName('li');
	var contp = [];
	var timer = timer1 = timer2 = null;
	for(var i = 0; i < lis.length; i++){
		contp[i] = lis[i].getElementsByTagName('p')[0];
	}
    var n = 0;

	var jkl = function(){
    	  movePUp(n, hjk);
    }
    var hjk = function(){
    	setTimeout(function(){
    		movePDown(n, function(){
    		    move(jkl);
    	    });
    	},500);
    }
    jkl();
  

    function move(fn){
    	timer2 = setInterval(function(){
			if(-ul1.offsetLeft > ul1.offsetWidth - 2 * lis[1].offsetWidth ){
				ul1.style.left = 0 + "px";
				console.log(getStyle(ul1,"left"));
				n = 0;
				clearInterval(timer2);
				fn && fn();
			}
			else{
				ul1.style.left = ul1.offsetLeft - lis[1].offsetWidth + 'px';
				clearInterval(timer2);
				n++; 
				fn && fn();
				console.log("drtdtdthtddd");
		    }
		});
		console.log("move : " + n);
    }
	

	function movePUp(a, endFn1){
		timer = setInterval(function(){	
			if( parseInt(getStyle(contp[a], 'bottom')) > 0){
				contp[a].style.bottom = 0;
				clearInterval(timer);
				endFn1 && endFn1();
			}
			else{
				contp[a].style.bottom = parseInt(getStyle(contp[a], 'bottom')) + 1 + "px";
			}
		},30);
		console.log("movePUp : " + n);
	}

	function movePDown(c, endFn2){
		timer1 = setInterval(function(){	
			if( parseInt(getStyle(contp[c], 'bottom')) < -50){
				contp[c].style.bottom = -50 + "px";
				clearInterval(timer1);
				endFn2 && endFn2();
			}
			else{
				contp[c].style.bottom = parseInt(getStyle(contp[c], 'bottom')) - 1 + "px";
			}
		},30);
		console.log("movePDown : " + n);
	}
	function getStyle(obj, str){
		if(obj.currentStyle){
			return obj.currentStyle[str];
		}
		else{
			return getComputedStyle(obj)[str];
		}
	}

}

