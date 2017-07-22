window.onload = function(){
	var ul = document.getElementById('nav');
	var aLi = ul.getElementsByTagName('li');
	var cont = document.getElementById('cont-box');
	var divs = cont.getElementsByTagName('div');

	aliLength = aLi.length;
	var timer = null;
	var timer1 = null;
	for(var i = 0; i < aliLength; i++){
		aLi[i].index = i;
		divs[i].index = i;
		var num = 0;
		aLi[i].onmouseover = function(){
			clearTimeout(timer1);
			aLi[num].className = "";
			divs[num].className = "";
			this.className = "active";
			divs[this.index].className = "action";
			num = this.index;
		}
		aLi[i].onmouseout = function(){
			var This = this;		
            timer = setTimeout(function(){
				This.className = "";
			    divs[This.index].className = "";
			},300);
			num = this.index;
	    }	
		divs[i].onmouseover = function(){
			clearTimeout(timer);
		}
		divs[i].onmouseout = function(){
			var This = this;
			timer1 = setTimeout(function(){
				This.className = "";
			    aLi[This.index].className = "";
			},300); 
		}
	}
}