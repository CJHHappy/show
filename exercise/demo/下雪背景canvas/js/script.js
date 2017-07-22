window.onload = function(){
	var canv = document.getElementById('canvas');
	var ctx = canv.getContext('2d');
	var w = canv.width = window.innerWidth;/*获取到浏览器的当前宽高*/
	var h = canv.height = window.innerHeight;
	window.onresize = function(){
		var w = canv.width = window.innerWidth;
	    var h = canv.height = window.innerHeight;
	}

	var num = 100;//雪花数量
	var po = [];//存储每个雪花的位置以及半径

	for(var i = 0;i < num; i++){
		po.push({
			x: Math.random() * w,//随机1000个横坐标
			y: Math.random() * h,//随机1000个纵坐标
			r: Math.random() * 3 //随机1000个半径
		});
	}

	function draw(){
		// 构建1000个实心圆
		for(var i = 0; i < num; i++){
			ctx.beginPath();
			ctx.arc(po[i].x, po[i].y, po[i].r, 0, 2*Math.PI, false);//第i个圆的位置 半径 完整性
		    ctx.fill();  //填充实心圆
		    ctx.fillStyle = "#fff"; //实心圆颜色为白色
		   
		}
		changey();
	}
	function changey(){
		for(var i = 0; i < num; i++){

			po[i].y += Math.random() * 5;

			if(po[i].y > h){
			    po[i].y = 0;
		    }

		}
	}
	draw();
	setInterval(function(){
		ctx.clearRect(0, 0, w, h);
		draw();
	},1);
}