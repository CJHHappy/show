window.onload = function(){
	var oContainer = document.getElementById('container');
	show("container");
}
function show(boxId){
	var oContainer = document.getElementById(boxId);
	var aTitleBox = container.getElementsByClassName('title');
	var aSpan = aTitleBox[0].getElementsByTagName('span');
	var aContentBox = container.getElementsByClassName('content');
	var aDiv = aContentBox[0].getElementsByTagName('div');
	var aSpanLength = aSpan.length;
	for(var i = 0; i < aSpanLength; i++){
		showAndhide(i);	
	}
	function showAndhide(a){
		var oUl = aDiv[a].getElementsByTagName('ul')[0];
		var aLi = oUl.getElementsByTagName('li');
		aLi[0].className = "actionli";
		aSpan[a].onmouseover = function(){
			var index = 0;
			function num(){
				return a;
			}
			index = num();
			for(var i = 0; i < aSpan.length; i++){
			    aSpan[i].className = "";
			    aDiv[i].className = "";
		    }
			aSpan[index].className = "active";
			aDiv[index].className = "action";
	    } 
	    for(var i = 0; i < aLi.length; i++){
	    	aLi[i].index = i;
			aLi[i].onmouseover = function(){
				for(var i = 0; i < aLi.length; i++){
					aLi[i].className = "";
				}
				this.className = "actionli";
			}
	    }
	} 
}