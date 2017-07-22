window.onload = function(){
	var middle = document.getElementById('middle');
	var small = document.getElementById('small');
	var table = document.getElementById('table');
	var cont = document.getElementById('cont');
	var divs = cont.getElementsByTagName('div');

	middle.onclick =　function(){
		for (var i = 0; i < divs.length; i++) {
			divs[i].className = "cont-list2";
		}
	}
	small.onclick =　function(){
		for (var i = 0; i < divs.length; i++) {
			divs[i].className = "cont-list";
		}
	}
	table.onclick =　function(){
		for (var i = 0; i < divs.length; i++) {
			divs[i].className = "cont-list3";
		}
	}
}