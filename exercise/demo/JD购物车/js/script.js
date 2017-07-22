var data = [{"title": "展卉 四川不知火丑柑 2.5kg装", 
"price": "33.90¥", "shopName": "柯柯安旗舰店","image": "images/1.jpg" },
			{"title": "双超 甩脂机懒人塑身机塑形纤体机健身器材抖抖机运动震动 ", 
			"price": "498.00¥", "shopName": "智凯专营店","image": "images/2.jpg" },
			{"title": "耐克篮球鞋男鞋 2016秋冬新款詹姆斯", 
			"price": "339.86¥", "shopName": "幸运叶子旗舰店","image": "images/3.jpg" },
			{"title": "板鞋F39042 F76514 DF 蓝色F76514 ", 
			"price": "269.00¥", "shopName": "香奈儿","image": "images/4.jpg" },
			{"title": "【京东超市】日本尤妮佳（Moony）婴儿纸尿裤（尿不湿） 大", 
			"price": "86.79¥", "shopName": "芝加哥店","image": "images/5.jpg" },
			{"title": "少儿百科全书套装（全8册/套）", 
			"price": "36.80¥", "shopName": "小猫腻","image": "images/6.jpg" },
			{"title": "捷宝（TRIOPO) T258+D-2 铝合金 可拆独脚 称重12KG 专业", 
			"price": "109.00¥", "shopName": "幸运叶子旗舰店","image": "images/7.jpg" },
			{"title": "包装盒个性白色大号礼盒 仿古白 大号",
			 "price": "19.90¥", "shopName": "仔仔","image": "images/8.jpg" },
			{"title": "恒都 澳洲牛肉片 500g/袋 草饲",
			 "price": "25.00¥", "shopName": "香奈儿","image": "images/9.jpg" },
			{"title": "【京东超市】滋源 无患子 控油清爽 洗护套265ml*2", 
			"price": "88.80¥", "shopName": "香奈儿","image": "images/10.jpg" }];
var wrap = document.getElementById('wrap');

/*循环创建div并插入到wrap里*/
for( var i = 0; i < data.length; i++ ){
	var divs = document.createElement("div");
	var imgs = document.createElement("img");
	var titles = document.createElement("p");
	var prices = document.createElement("span");
	var pricesred = document.createElement("strong");
	var ashop = document.createElement("i");
	imgs.src = "images/" + ( i + 1 ) +".jpg";
	divs.className = "list";
	wrap.appendChild( divs );
	divs.appendChild( imgs );
	divs.appendChild( titles );
	divs.appendChild( prices );
	prices.appendChild( pricesred );
	prices.appendChild( ashop );
	titles.innerHTML = data[i].title;
	pricesred.innerHTML = data[i].price;
	ashop.innerHTML = "加入购物车"
}
//用来数据存储的交换的数组
var common_arr_data = [];
//页面加载完成后执行相关操作
var ashops = [];
window.onload = function(){
	var wrap = document.getElementById('wrap');
	// 获取每个div下面的i
    var rdivs = wrap.getElementsByTagName('div');
    // 存放 a的数组
	
	for( var i = 0; i < rdivs.length; i++ ){
		ashops.push( rdivs[i].getElementsByTagName('i') );
	}
	//给每个a对象加上点击事件（加入购物车）
	//ashops[i][0] 是 i元素 列表对象 里的第i个对象列表里的第 0 个元素；
	// localStorage.clear(); 
	for( var i = 0; i < ashops.length; i++ ){
    	ashops[i][0].index = i;
	 	ashops[i][0].onclick = function () {
	 		//添加对应索引的数据到数组
			common_arr_data.push( data[this.index]  );
			localStorage["com"] = JSON.stringify(common_arr_data);
	 	}
	}
	// 产看购物车
	var botton = document.getElementById('chek');
	function checkCar(){
        botton.onclick = function(){
        	window.open("../jd/car.html");
        }
	}
	checkCar();

}
    










