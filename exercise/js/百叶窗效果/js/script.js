window.onload = function() {
    var oUl = document.getElementById('ul1');
    baiYeChuang( oUl );
}
function baiYeChuang( oul )
{
    var aLi = oul.getElementsByTagName('li');
    var oSpan=[];
    for(var i = 0; i<aLi.length; i++){//获得的每个oSpan[i]是存放着span的数组
         oSpan[i] = aLi[i].getElementsByTagName('span');
    }
    var num = 0;
    setInterval(function() {
        for( var i = 0; i<aLi.length; i++ ){
            for( var j = 0; j<aLi.length; j++ ){
                oSpan[i][j].className = "";
            }
        }//清空class
        for( var j = 0; j<aLi.length; j++ ){
            oSpan[j][num].className = "on";
        }
        if( num < aLi.length-1 )
        {
            num++;
        }else{
            num = 0;
        }
    },3000)
}
