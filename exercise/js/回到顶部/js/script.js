window.onload = function () {
	var button = document.getElementsByClassName('button')[0];
	var timer = null;
	var key = false;
	button.onclick = function () {
		if (!key == true) {
			key = true;
			var scroll = 0;
			scroll = document.documentElement.scrollTop || document.body.scrollTop;
			timer = setInterval(function() {
				scroll = Math.ceil(scroll - scroll / 2);
				document.documentElement.scrollTop = document.body.scrollTop = scroll;
				if (scroll <= 2) {
					document.documentElement.scrollTop = document.body.scrollTop = scroll = 0;
					clearInterval(timer);
				}
				if (scroll == 0) {
					key = false;
		        }	
			},60);
			
		}
	}
}