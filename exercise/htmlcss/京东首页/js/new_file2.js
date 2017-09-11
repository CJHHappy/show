var img = document.getElementById("tupian");

var dian = document.getElementsByClassName("li");

var m = 2;
dian[0].style.backgroundColor = "red"; //第一个

function fn() {

	if(m == 1) {

		dian[5].style.backgroundColor = "#ffffff"; //第八个

	} else {

		dian[m - 2].style.backgroundColor = "#ffffff";
	}
	dian[m - 1].style.backgroundColor = "red";
	img.src ="img/"+ m + ".jpg";
	m++;
	if(m == 7) {
		m = 1
	}
}
setInterval(fn, 2000);