window.onload=function()
{
	var oImg=document.getElementById('img');
	var aImg=oImg.getElementsByTagName('img');
	var oUl=document.getElementById('button');
	var aLi=oUl.getElementsByTagName('li');
	var aColor=['#f7f4f7','#72d8da','#000','#fc74a7','#ffff33']

	for(var i=0; i<aLi.length; i++)
		{
		aLi[i].index=i;
	    aLi[i].onmouseover=function()
			{
			for(var i=0; i<aLi.length; i++)
				{
			    aLi[i].style.background='';
			    aLi[i].style.color='';
				aLi[i].style.borderColor='#aaa';
				aImg[i].style.display="none";
			}
		    aLi[this.index].style.background=aColor[this.index];
			aLi[this.index].style.color="#ffffff";
			aLi[this.index].style.borderColor='red';
            aImg[this.index].style.display="block";
		} 
	}
	
}