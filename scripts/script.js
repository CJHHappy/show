function show(ev, self) {
  ev.stopPropagation();
  var isShow = self.getAttribute('data-show'),
      bottom = self.parentNode.nextElementSibling;
      children = self.parentNode.parentNode.children[1];
  
  

  if (children.length == 0) {
    return false;
  }
  console.log(isShow);
  if (isShow == "true") {
    console.log(1);
    self.setAttribute("data-show", false);
    self.className = "t-icon l";
    bottom.style.display = "none";
  } else {
    console.log(2);
    self.setAttribute("data-show", true);
    self.className = "t-icon t";
    bottom.style.display = "block";
  }
  
}
