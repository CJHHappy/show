window.onload = function () {
	var container = document.getElementById('container');
	var content = container.getElementsByClassName('content')[0];
	var btView = container.getElementsByClassName('bt-view')[0];
	var check = container.getElementsByClassName('check')[0];
	//获取到的每个button的  buttonlist列表
	var button = container.getElementsByClassName('buttons')[0];
	var buttonList = button.getElementsByTagName('button');
	//获取 title 里面的每个 span
	var title = container.getElementsByClassName('title')[0];
	var spanList = title.getElementsByTagName('span');
	//获取到每个 div
	var chBox = container.getElementsByClassName('ch-box')[0];
	var divList  = chBox.getElementsByTagName('div');
	//获取到每个 执行动作的 input
	var cInput1 = container.getElementsByClassName('c-input1')[0];
    var cButton = container.getElementsByClassName('c-button')[0];
    var tInput1 = container.getElementsByClassName('t-t1')[0];
    var tInput2 = container.getElementsByClassName('t-t2')[0];
    var tButton = container.getElementsByClassName('t-button')[0];

    var key = true;
    //展开收缩
    btView.onclick = function () {
    	if (key == true) {
    		for (var i = 0; i < buttonList.length; i++) {
    			buttonList[i].className = "bt-hide";
    			btView.innerHTML = "收缩";
    			key = false;
    		}
    	} 
    	else {
    		for (var i = 0; i < buttonList.length; i++) {
    			buttonList[i].className = "";
    			btView.innerHTML = "展开";
    			check.style.display = "none"
    			key = true;
    		}
    	}
    }
    for (var i = 0; i < spanList.length; i++) {
    	spanList[i].index = i;
    	buttonList[i].index = i;
    	spanList[i].onclick = function () {
    		for (var i = 0; i < spanList.length; i++) {
    			spanList[i].className = "";
    			divList[i].className = "";
    		}
    	    spanList[this.index].className = "active";
    	    divList[this.index].className = "active";
    	}

    	buttonList[i].onclick = function () {
            check.style.display = "block";
            for (var i = 0; i < spanList.length; i++) {
                spanList[i].className = "";
                divList[i].className = "";
            }
            spanList[this.index].className = "active";
            divList[this.index].className = "active";
    	}
    }
    var con = content.innerHTML;
    cButton.onclick = function () {
    	var cText = cInput1.value;
    	var cContent = con;
    	if (cText == "") {
    		return false;
    	}
    	var arr = cContent.split(cText);
    	content.innerHTML = arr.join("<span>" + cText + "</span>");
    	cInput1.value = "";
    }
    tButton.onclick = function () {
    	var tText1 = tInput1.value;
    	var tText2 = tInput2.value;
    	var cContent = content.innerHTML;
    	if (tText1 == "" || tText2 == "") {
    		return false;
    	}
    	var arr = cContent.split(tText1);
    	content.innerHTML = arr.join("<span>" + tText2 + "</span>");
    	tInput1.value = tInput2.value = "";
    }

}