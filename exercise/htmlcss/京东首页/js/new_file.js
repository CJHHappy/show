function cle(){
	 var div=document.getElementById("diyihang");
	 div.style.display="none";
	
}
function box10(){
	var a=window.scrollY;
	
	if(a>=200){
		 document.getElementById("box10").style.display="block";
	 
	 
	}else{
		document.getElementById("box10").style.display="none";
	}
	
}
setInterval(box10,200);

function daojishi() {
		var EndTime = new Date(2018, 1, 1, 0, 0, 0);
		var NowTime = new Date();
		var t = EndTime.getTime() - NowTime.getTime();
		var d = 0;
		var h = 0;
		var m = 0;
		var s = 0;
		if(t >= 0) {
			d = Math.floor(t / 1000 / 60 / 60 / 24);
			h = Math.floor(t / 1000 / 60 / 60 % 24);

			m = Math.floor(t / 1000 / 60 % 60);

			s = Math.floor(t / 1000 % 60);

		}
		if(h<10){
		document.getElementById("t-h").innerHTML ="0"+ h ;	
		}else{document.getElementById("t-h").innerHTML = h ;}
		if(m<10){
		document.getElementById("t-m").innerHTML ="0"+ m ;	
		}else{document.getElementById("t-m").innerHTML = m ;}
		if(s<10){
		document.getElementById("t-s").innerHTML ="0"+ s ;	
		}else{document.getElementById("t-s").innerHTML = s;}
		
		
		
		
	}
	setInterval(daojishi, 0);
	
	