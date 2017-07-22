window.onload = function () {
	var acolor = ["green", "orange", "blue"];
	var widthAndHeight = ["200", "300", "400"];
	var setobj = document.getElementById("setobj");
	var set = document.getElementById("set");
	var mark = document.getElementById("mark");
	var color = document.getElementById("color");
	var colors = color.getElementsByTagName("span");
	var width = document.getElementById("width");
	var widths = width.getElementsByTagName("span");
	var height = document.getElementById("height");
	var heights = height.getElementsByTagName("span");
	var reset = document.getElementById("reset");
	var really = document.getElementById("really");

	set.onclick = function () {
		mark.style.display = "block";
	}
	for (var i = 0; i < acolor.length; i++) {
		colors[i].index = i;
		widths[i].index = i;
		heights[i].index = i;
		colors[i].onclick = function () {
			setobj.style.backgroundColor = acolor[this.index];
		}
		widths[i].onclick = function () {
			console.log(widthAndHeight[this.index]);
			setobj.style.width = widthAndHeight[this.index] + "px";
		}
		heights[i].onclick = function () {
			setobj.style.height = widthAndHeight[this.index] + "px";
		}
	}
	reset.onclick = function () {
		setobj.style.width = 100 + 'px';
		setobj.style.height = 100 + 'px';
		setobj.style.backgroundColor = "#fff";
	}
	really.onclick = function () {
		mark.style.display = "none";
	}

}