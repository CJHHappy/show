window.onload = function() {
    var div = document.getElementsByClassName('div1')[0];
    var timer = [];
    var speed = 0;
    var key = true;
    var num = 0;
    document.addEventListener("keydown",function(ev) {
        var ev = ev || event;
        switch (ev.keyCode) {
            case 37:
            speed = -5;
            num = 0;
            break;
            case 38:
            speed = -5;
            num = 1;
            break;
            case 39:
            speed = 5;
            num = 2;
            break;
            case 40:
            speed = 5;
            num = 3;
            break;
        }
        if (key == true) {
            key = false;
            timer[num] = setInterval(function() {
                if (ev.keyCode == 37) {
                    div.style.left = div.offsetLeft + speed + "px";
                } else if (ev.keyCode == 38) {
                    div.style.top = div.offsetTop + speed + "px";
                } else if (ev.keyCode == 39) {
                    div.style.left = div.offsetLeft + speed + "px";
                } else if (ev.keyCode == 40) {
                    div.style.top = div.offsetTop + speed + "px";
                }
            },10);
        }
        ev.preventDefault();
    },false);
    document.addEventListener("keyup", function(ev) {
        var num = 0;
        var ev = ev || event;
        key = true;
        switch (ev.keyCode) {
            case 37:
            num = 0;
            break;
            case 38:
            num = 1;
            break;
            case 39:
            num = 2;
            break;
            case 40:
            num = 3;
            break;
        }
        clearInterval(timer[num]);
        ev.preventDefault();
    }, false);
}
