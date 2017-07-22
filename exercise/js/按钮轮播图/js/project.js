function autoTrunAll(ul1)
{
	var oUl=document.getElementById(ul1);
	var oLi=oUl.getElementsByTagName('li');
	var aLi=oUl.getElementsByTagName('li')[0];

	var oLeft=document.getElementById('left');
	var oRight=document.getElementById('right');

	var oBtn=document.getElementById('buttons');
	var aSpan=oBtn.getElementsByTagName('span');
	//设置全局变量a来控制buttons的移动
	//以下的三个动作（自动滚动，oLeft.onclik, oRight.onclik）都会
	//影响到a的值 用a来记录每个buttons的位置
	var a = 0;
	//自动滚动
	timer = setInterval(function()
		{	
			if(oUl.offsetLeft % aLi.offsetWidth == 0)//判断函数什么时候执行
			{
				if(oUl.offsetLeft <= -oUl.offsetWidth + aLi.offsetWidth)
				{   
					aSpan[a].className = "";
					a = 0;
					oUl.style.left = 0 + 'px';
					aSpan[a].className = "num"
				}
				else
				{
					aSpan[a].className = "";
					a++;
			 		move('ul1', -1);
			 		aSpan[a].className = "num"
				}
			}
			
		},2500);
	
	//左点击
    oRight.onclick = function()
	{   
		if(oUl.offsetLeft % aLi.offsetWidth == 0)//判断函数什么时候执行
		{
			if(oUl.offsetLeft <= -oUl.offsetWidth + aLi.offsetWidth)
			{	
				aSpan[a].className = "";
				a = 0;
				oUl.style.left = 0 + 'px';
				aSpan[a].className = "num"
			}
			else
			{
				aSpan[a].className = "";
				a++;
				move('ul1',-1);
				aSpan[a].className = "num"
			}
		}
	}
	//右点击
	oLeft.onclick = function()
	{   
		if(oUl.offsetLeft % aLi.offsetWidth == 0)//判断函数什么时候执行
	    {
			if(oUl.offsetLeft >= 0)
			{
				aSpan[a].className = "";
				a = oLi.length-1;
				oUl.style.left = -oUl.offsetWidth + aLi.offsetWidth + 'px';
				aSpan[a].className = "num"
			}
			else
			{
				aSpan[a].className = "";
				a--;
				move('ul1',1);
				aSpan[a].className = "num"
			}
		}
	}
    //移动函数
    //-1代表向左   1代表向右
	function move(ulId, speed)
	{   
		var oUl=document.getElementById(ulId);
		var oLi=oUl.getElementsByTagName('li');
		var aLi=oUl.getElementsByTagName('li')[0];
		if(speed < 0)
		{
			speed = -aLi.offsetWidth; 
		}
		else
		{
			speed = aLi.offsetWidth;
		}
    	oUl.style.left = oUl.offsetLeft + speed + 'px';
	}
	}
autoTrunAll('ul1');
	