window.onload = function(){
	var title = document.getElementById('title');
	var aSpan = title.getElementsByTagName('span');

	var content = document.getElementById('content');
	var aDiv = content.getElementsByTagName('div');
	var aLis = [];
	for(var i = 0; i < aDiv.length; i++){
	    aLis[i] = aDiv[i].getElementsByTagName('li');
	}

	begin();

	function begin(){
		var n = 0;
		var j = 0;
		aSpan[n].className = "action";
		aDiv[n].className = "show";
		f();
		function f(){
            setInterval(function(){
            	if(j > aLis[n].length - 1){
            		j = 0;
            		aSpan[n].className = "";
            		aDiv[n].className = "";
            		n++;
            		console.log(n + 'shin');
            		if(n > aSpan.length - 1){
            			n =0;
            		}
            		for(var i = 0; i < aLis[n].length; i++){
            		    aLis[n][i].className = "";
            	    }
            		aSpan[n].className = "action";
            		aDiv[n].className = "show";
            		aLis[n][j].className = "active";
            		j++;
            	}
            	else{
            		for(var i = 0; i < aLis[n].length; i++){
            		    aLis[n][i].className = "";
            	    }
            	    aLis[n][j].className = "active";
            	    console.log(j);
            		j++;
            	}	
		    },1000);
		}
		
	}
}