function show(ev, self) {
  ev.stopPropagation();
  var isShow = self.getAttribute('data-show'),
      bottom = self.parentNode.nextElementSibling,
      children = self.parentNode.parentNode.children[1];

  if (children.length == 0) {
    return false;
  }

  if (isShow == "true") {
    self.setAttribute("data-show", false);
    self.className = "t-icon l";
    bottom.style.display = "none";
  } else {
    self.setAttribute("data-show", true);
    self.className = "t-icon t";
    bottom.style.display = "block";
  }
  
}

(function() {
  window.onload = function() {
    var topTitLength = Data.length,
        topUl = document.querySelector('#list .top');

    for (var i = 0; i < topTitLength; i++) {
      var str = '';
      if (Data[i].children.length == 0) {
        topUl.innerHTML = topUl.innerHTML + '<li class="t-li">' +
            '<div class="t-box clearfix">' +
                '<i class="t-icon l" data-show="false" onclick="show(event, this)"></i>' +
                '<span class="t-title">javascript 学习</span>' +
            '</div>' +
        '</li>';
      } else {

        for (var j = 0; j < Data[i].children.length; j++) {
          str = str + '<li><a href="' + Data[i].children[j].href + '">' + Data[i].children[j].title + '</a></li>';
        }

        topUl.innerHTML = topUl.innerHTML + '<li class="t-li">' +
            '<div class="t-box clearfix">' +
                '<i class="t-icon l" data-show="false" onclick="show(event, this)"></i>' +
                '<span class="t-title">' + Data[i].title + '</span>' +
            '</div>' + 
            '<ul class="bottom">' +
            str +
            '</ul>' +
        '</li>';
      } 
    }
  }
})()
