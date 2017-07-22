(function() {
	function Tab(container,contentBox) {
		this.container = document.getElementById(container);
		this.ul = this.container.getElementsByClassName('nav')[0];
		this.aLi = this.ul.getElementsByTagName('li');
		this.cont = document.getElementById(contentBox);
		this.divs = this.cont.getElementsByTagName('div');
	   	this.aliLength = this.aLi.length;
	   	this.timer = null;
		this.timer1 = null;
		this.num = 0;
	}

	Tab.prototype.init = function() {
		var mThis = this;
		for(var i = 0; i < this.aliLength; i++){
			this.aLi[i].index = i;
			this.divs[i].index = i;
			this.aLi[i].onmouseover = function() {
				var This = this;
				mThis.liMouseover(This);
			}
			this.aLi[i].onmouseout = function() {
				var This = this;
				mThis.liMouseout(This);
			}
			this.divs[i].onmouseover = function() {
				mThis.divMouseover();
			} 
			this.divs[i].onmouseout = function() {
				var This = this;
				mThis.divMouseout(This);
			}
		}

	}

	Tab.prototype.liMouseover = function(This) {
		clearTimeout(this.timer1);
		this.aLi[this.num].className = "";
		this.divs[this.num].className = "";
		This.className = "active";
		this.divs[This.index].className = "action";
		this.num = This.index;
	}

	Tab.prototype.liMouseout = function(This) {
		var this_ = this;		
	    this.timer = setTimeout(function(){
			This.className = "";
		    this_.divs[This.index].className = "";
		},300);
		this.num = This.index;
	}

	Tab.prototype.divMouseover = function() {
		clearTimeout(this.timer);
	}

	Tab.prototype.divMouseout = function(This) {
		var this_ = this;
		this.timer1 = setTimeout(function(){
			This.className = "";
		    this_.aLi[This.index].className = "";
		},300); 
	}
	window.Tab = Tab;
})()

window.onload = function(){
	var tab1 = new Tab('container', 'cont-box');
	tab1.init();
}

