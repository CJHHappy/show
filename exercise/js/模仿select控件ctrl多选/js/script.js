window.onload = function() {
    var oInput = document.getElementsByClassName('input')[0];
    var buttonList = document.getElementsByClassName('buttonList')[0];
    var liList = document.getElementsByTagName('li');

    oInput.onclick = function() {
        buttonList.style.display = "block"
        return false;
    }
    // document.onclick = function() {
    //     buttonList.style.display = "none";
    // }
    for (var i = 0; i < liList.length; i++) {
        liList[i].index = i;
        liList[i].onclick = function(ev) {
            var ev = ev || event;
            if (ev.ctrlKey == true) {
                oInput.value += liList[this.index].innerHTML;
            }
            else {
                oInput.value = liList[this.index].innerHTML;
            }
            return false;
        }
    }
}
