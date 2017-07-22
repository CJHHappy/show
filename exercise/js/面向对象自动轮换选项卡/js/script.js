function AutoPlayTab(id) {

    this.container = null;
    this.title = null;
    this.aSpan = null;
    this.content = null;
    this.aDiv = null;
    this.aLis = [];
    this.n = 0;
    this.j = 0;

}
AutoPlayTab.prototype.init = function() {

    this.container = document.getElementById("container");
    this.title = this.container.getElementsByClassName('title')[0];
    this.aSpan = this.title.getElementsByTagName('span');
    this.content = this.container.getElementsByClassName('content')[0];
    this.aDiv = this.content.getElementsByTagName('div');
    this.aLis = [];
    for(var i = 0; i < this.aDiv.length; i++){
        this.aLis[i] = this.aDiv[i].getElementsByTagName('li');
    }
    this.begin();

}
AutoPlayTab.prototype.f = function() {
    var This = this;
    setInterval(function(){
        if(This.j > This.aLis[This.n].length - 1){
            This.j = 0;
            This.aSpan[This.n].className = "";
            This.aDiv[This.n].className = "";
            This.n++;
            if(This.n > This.aSpan.length - 1){
                This.n =0;
            }
            for(var i = 0; i < This.aLis[This.n].length; i++){
                This.aLis[This.n][i].className = "";
            }
            This.aSpan[This.n].className = "action";
            This.aDiv[This.n].className = "show";
            This.aLis[This.n][This.j].className = "active";
            This.j++;
        }
        else{
            for(var i = 0; i < This.aLis[This.n].length; i++){
                This.aLis[This.n][i].className = "";
            }
            This.aLis[This.n][This.j].className = "active";
            This.j++;
        }     
    },1000);

}

AutoPlayTab.prototype.begin = function() {

    this.aSpan[this.n].className = "action";
    this.aDiv[this.n].className = "show";
    this.f();

} 

window.onload = function(){
    var auto = new AutoPlayTab("container");
    auto.init();
}