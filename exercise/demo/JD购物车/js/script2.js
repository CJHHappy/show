window.onload = function(){
	var cont = document.getElementById('cont');
	var all_goods = document.getElementById('all_goods');

	// var count_span1 = []//存放创建的每个num_w_1
	// var count_span2 = []//存放创建的每个num_w_2
	// var count_view = []//存放创建的每个num_w_inp
	try{
		//如果获取储存数据为空 报错时 会执行 catch语句
		//并且不会执行报错语所在的块级作用域以下的代码
		//如果数据不为空的话 不执行catch语句 会一直把、try语句执行完。
		var a = JSON.parse(localStorage["com"]);//a为处理后的数组对象
		for( var i = 0; i < a.length; i++ ){

			var shop1 = document.createElement('div');
			var shop_wrap = document.createElement('div');
			var shop_cont = document.createElement('div');
			var shop_cont1 = document.createElement('div');
			var mass = document.createElement('div');
			var price = document.createElement('div');
			var num = document.createElement('div');
			var num_wrap = document.createElement('div');
			var count = document.createElement('div');
			var dele = document.createElement('div');
			var label = document.createElement('label');
			var shop_all = document.createElement('input');
			var shop_name = document.createElement('strong');
			var mass_input = document.createElement('input');
			var mass_img = document.createElement('img');
			var titlep = document.createElement('p');
			var num_w_1 = document.createElement('span');
			var num_inp = document.createElement('input');
			var num_w_2 = document.createElement('span');
			var dele_i = document.createElement('i');

			cont.appendChild( shop1 );
			shop1.appendChild( shop_wrap );
			shop1.appendChild( shop_cont );
			shop_wrap.appendChild( label );
			label.appendChild( shop_all );
			label.appendChild( shop_name );
			shop_cont.appendChild( shop_cont1 );
			shop_cont1.appendChild( mass );
			shop_cont1.appendChild( price );
			shop_cont1.appendChild( num );
			shop_cont1.appendChild( count );
			shop_cont1.appendChild( dele );
			mass.appendChild( mass_input );
			mass.appendChild( mass_img );
			mass.appendChild( titlep );
			num.appendChild( num_wrap );
			num_wrap.appendChild( num_w_1 );
			num_wrap.appendChild( num_inp );
			num_wrap.appendChild( num_w_2 );
			dele.appendChild( dele_i );
            
            shop1.id = "shop1";
            shop1.className = "shop1";
            shop_wrap.className = "shop_wrap";
            shop_all.id = "shop_all";
            shop_name.id = "shop_name";
            shop_cont.className = "shop_cont";
            shop_cont1.className = "shop_cont1";
            mass.className = "mass";
            price.className = "price";
            num.className = "num";
            count.className = "count";
            dele.className = "dele";
            dele_i.className = "dele_i";
            num_wrap.className = "num_wrap";
            num_w_1.className = "num_w_1";
            num_w_2.className = "num_w_2";
            num_inp.id = "num_inp";
            num_inp.className = "num_inp";
            mass_input.className = "mass_input";
            mass_img.id = "mass_img";
            titlep.className = "title"
            shop_all.type = "checkbox"
            mass_input.type = "checkbox"
            num_inp.type = "text";
            num_inp.value = "1";
            dele_i.innerHTML = "删除";
            num_w_1.innerHTML = "-";
            num_w_2.innerHTML = "+";
            mass_img.src = a[i].image;
            titlep.innerHTML = a[i].title;
            price.innerHTML = a[i].price;
            count.innerHTML = a[i].price;
            shop_name.innerHTML = a[i].shopName;
            all_goods.innerHTML = a.length;
		}
	}
	catch(e){
		alert("购物车空空如也，快去加入商品");
	}
    //可以直接使用try里面的变量
    var count_span1 =document.getElementsByClassName("num_w_1");
	var count_view =document.getElementsByClassName("num_inp");
	var count_span2 =document.getElementsByClassName("num_w_2");
	var count =document.getElementsByClassName("count");

	function addAndreduce(){
		for( var i = 0; i < a.length; i++){
	    	count_span1[i].index = count_span2[i].index = i;
	    	var v = f = p = 0;
	    	count_span1[i].onclick = function(){
	    		if(count_view[this.index].value==1){
	    			count_view[this.index].value==1;
	    		}
	    		else{
	    			count_view[this.index].value--;
	    		}
	    		var x = ((parseFloat(a[this.index].price) * 1000)*
	    		count_view[this.index].value) / 1000 ;
	    		count[this.index].innerHTML = change_into_00_floor(x);
	    		if(mass_inputs[this.index].checked == true){
	    			for(var i = 0; i < shop_cont.length; i++){
	    				if(mass_inputs[i].checked == true){
	    					if(count_view[i].value == 1){
	    						count_view[i].value = 1;
	    						for(var i = 0; i < shop_cont.length; i++){
	    							if(mass_inputs[i].checked == true){
	    								v += ((parseFloat(a[i].price) * 1000)*
	    		                        count_view[i].value);
	    		                        coun_pric.innerHTML = (v / 1000).toFixed(2);
	    							}
	    						}
	    						v=0;
	    					}
	    					else{
	    						for(var i = 0; i < shop_cont.length; i++){
	    							if(mass_inputs[i].checked == true){
	    								p += ((parseFloat(a[i].price) * 1000)*
	    		                        count_view[i].value);
	    		                        coun_pric.innerHTML = (p / 1000).toFixed(2);
	    							}
	    						}
	    						p=0;
	    					}
	    				} 
	    			}
	    		}
	    	}
	    	count_span2[i].onclick = function(){
	    		count_view[this.index].value++;
	    		var x = ((parseFloat(a[this.index].price) * 1000)*
	    		count_view[this.index].value) / 1000 ;
	    		count[this.index].innerHTML = change_into_00_floor(x);
	    		if(mass_inputs[this.index].checked == true){
	    			for(var i = 0; i < shop_cont.length; i++){
	    				if(mass_inputs[i].checked == true){
	    					f += ((parseFloat(a[i].price) * 1000)*
	    		            count_view[i].value);
	    				}else{
	    					var p = 0;
	    				}
	    				coun_pric.innerHTML = (f / 1000).toFixed(2);
	    			}
	    			f = 0;
	    		}
	    	}
	    }
	}
    
    // 清空购物车
    var button_price = document.getElementById('button-pric');

    button_price.onclick = function () {
    	localStorage.clear();
    	localStorage.setItem("emptye",0)
    }
    // 点击全选按钮
    var all = document.getElementById('all');
    var shop_cont =document.getElementsByClassName("shop_cont");
    var mass_inputs =document.getElementsByClassName("mass_input"); 
    var coun_pric = document.getElementById('coun-pric');

    all.onclick = function () {
    	var c = 0;
    	if (all.checked == true){
    	    for(var i = 0; i < shop_cont.length; i++){
    	    	shop_cont[i].style.backgroundColor = "pink";
    	    	mass_inputs[i].checked = true;
    	    	c += ((count_view[i].value * (parseFloat(a[i].price) * 1000)))/1000;
    	    }
    	    coun_pric.innerHTML = change_into_00_floor(c);
        }
        else{
    	    for(var i = 0; i < shop_cont.length; i++){
    	    	shop_cont[i].style.backgroundColor = "#fff";
    	    	mass_inputs[i].checked = false;
    	    	coun_pric.innerHTML = 0;
    	    }
	    }
    }
    // 每个子checkbox点击事件
    function checkboxClick() {
    	for( var i = 0; i < shop_cont.length; i++){
    		mass_inputs[i].index = i;
    		var con = 0;
    		var c = b = d = 0;
    		mass_inputs[i].onclick = function(){
    			if (mass_inputs[this.index].checked == true){
    	   			shop_cont[this.index].style.backgroundColor = "pink";
    	   			b = ((count_view[this.index].value * (parseFloat(a[this.index].price) * 1000)));
    	   			b = b / 1000;
    	   			coun_pric.innerHTML = parseFloat(coun_pric.innerHTML) + b;
    	   			coun_pric.innerHTML = parseFloat(coun_pric.innerHTML).toFixed(2);
            	}
            	else{
    	    		shop_cont[this.index].style.backgroundColor = "#fff";
    	    		all.checked = false;
    	    		d = ((count_view[this.index].value * (parseFloat(a[this.index].price) * 1000))) / 1000;
    	    		d =  d.toFixed(2);
        			coun_pric.innerHTML = coun_pric.innerHTML - d;
        			coun_pric.innerHTML = coun_pric.innerHTML.toFixed(2);
	        	}
	        	for (var i = 0; i < shop_cont.length; i++){
	        		if(mass_inputs[i].checked == true){
	        			con++;
	        		}
        		}
        		if(con == shop_cont.length){
        			all.checked = true;
        			for(var i = 0; i < shop_cont.length; i++){
        				c += ((count_view[i].value * (parseFloat(a[i].price) * 1000)));
        			}
        			c = c / 1000;
        			coun_pric.innerHTML = c.toFixed(2);
        		}else if(con == 0){
        			coun_pric.innerHTML = 0;
        		}else{
        			con = 0;
        		}
    		}
    	}
    }

    

    // 判断选中商品后 价格的总计变化
    function changePrice(){
    	var c = 0;
    	for( var i = 0; i < shop_cont.length; i++){
    	    if(mass_inputs[i].checked == true){
    	    	// c += ((count_view[i].value * (parseFloat(a[i].price) * 1000)))/1000;
    	    	c += ((count_view[i].value * (parseFloat(a[i].price) * 1000)));
    	    	c = c / 1000;
    	    	coun_pric.innerHTML = change_into_00_floor(c) + "¥";
    	    	
    	    }
    	    
        }   
    }
    // 删除操作
    var dele =document.getElementsByClassName("dele_i");
    var cont = document.getElementById('cont');
    var shop1 =document.getElementsByClassName("shop1");
    function deleList() {
    	for( var i = 0; i < shop_cont.length; i++){
    		dele[i].index = i;
    		dele[i].onclick = function(){
    			cont.removeChild(shop1[this.index]);
    		}
    	}
    }
    changePrice();// 判断选中商品后 价格的总计变化
    checkboxClick();// 每个子checkbox点击事件
    addAndreduce();//点击 + -号执行动作
    deleList();// 删除操作








}
// 把数字转化为保留两位小数的浮点数
function change_into_00_floor(num){
	// 传入要转化的小数
	// 用字符串方法吧小数用.分成两部分存入数组
	var arr = num.toString().split(".");
	// 判断数组长短 若长度为1 说明数组只存在整数部分
	// 此时在数字后面加 00
	if(arr.length == 1){
		num = num.toString() + ".00";
		return num;
	}
	// 如果长度大于1 说明有小数部分有 一位或两位数
	if(arr.length > 1){
		// 如果小数部分的字符长度小于2 即小数部分只有一位数
		// 在数后面加 0
		if(arr[1].length < 2){
			num = num.toString() + "0";
		}
		return num;
	}	
}
















