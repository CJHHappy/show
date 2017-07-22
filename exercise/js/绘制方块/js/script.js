window.onload = function() {
    var box = document.getElementsByClassName('container')[0];
    box.onmousedown = function(ev) {
        var newDiv = document.createElement('div');
        box.appendChild(newDiv);
        var ev = ev || event;
        var beginX = ev.clientX - box.offsetLeft;
        var beginY = ev.clientY - box.offsetTop;
        console.log(ev.clientX, ev.clientY,box.offsetLeft,box.offsetTop, beginX, beginY);
        box.onmousemove = function(ev) {
            var ev = ev || event;
            var proX = ev.clientX - (beginX + box.offsetLeft);
            var proY = ev.clientY - (beginY + box.offsetTop);
            if (proX < 0) {
                proX = -proX;
                newDiv.style.width = proX + "px";
                newDiv.style.left = beginX - proX + "px";
            }else {
                newDiv.style.width = proX + "px";
                newDiv.style.left = beginX + "px";
            }
            if (proY < 0) {
                proY = -proY;
                newDiv.style.height = proY + "px";
                newDiv.style.top  = beginY - proY + "px";
            }else {
                newDiv.style.height = proY + "px";
                newDiv.style.top  = beginY + "px";
            }
        }
        box.onmouseup = function() {
            box.onmousemove = null;
        }
    }
}
