(function() {
	var oContainer = null;
	var aTitleBox = null;
	var aSpan = null;
	var aContentBox = null;
	var oUl = null;
	var aLi = null;

	function Tab() {

	}

	Tab.prototype.init = function(id) {
		this.oContainer = document.getElementById(id);
		this.aTitleBox = this.oContainer.getElementsByClassName('title')[0];
		this.aSpan = this.aTitleBox.getElementsByTagName('span');
		this.aContentBox = this.oContainer.getElementsByClassName('content')[0];
		this.oUl = this.aContentBox.getElementsByTagName('ul');
		this.aLi = [];
		var This = this;
		for (var i = 0; i < this.oUl.length; i++) {
			this.aLi[i] = this.oUl[i].getElementsByTagName('li');
		}

		for (var i = 0; i < this.aSpan.length; i++) {
			this.aSpan[i].index = i;
			this.aSpan[i].onmouseover = function() {
				var this_li = this;
				var index = 0;
				index = This.action(this_li);
				This.actionLi(index);
			}
		}
	}

	Tab.prototype.action = function(this_) {
		var index_ = this_.index;
		var This = this;
		this.aLi[this_.index][0].className = "actionli"
		for (var j = 0; j < this.aSpan.length; j++) {
			this.aSpan[j].className = "";
			this.oUl[j].className = "";
		}
		this.aSpan[this_.index].className = "active";
		this.oUl[this_.index].className = "action";
		return index_;
	}

	Tab.prototype.actionLi = function(index) {
		var This = this;
		for (var k = 0; k < this.aLi[index].length; k++) {
			this.aLi[index][k].index = k;
			this.aLi[index][k].onmouseover = function() {
				for (var j = 0; j < This.aLi[index].length; j++) {
					This.aLi[index][j].className = "";
				}
				This.aLi[index][this.index].className = "actionli";
			}
		}	
	}
	window.Tab = Tab;
})()


window.onload = function(){
	var tab = new Tab();
	tab.init("container");
}	

	