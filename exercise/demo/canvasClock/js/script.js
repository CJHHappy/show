(function() {
  var div = document.querySelector("#container");
  var canvas = document.querySelector("#canvas");
  var cxt = canvas.getContext('2d');
  canvas.width = div.offsetWidth;
  canvas.height = div.offsetHeight;
  function drawArcFill(x, y, r, h1, h2, color) {
    cxt.arc(x, y, r, h1, h2, false);
    cxt.fillStyle = color;
    cxt.fill();
  }
  function drawArcStroke(x, y, r, h1, h2, color) {
    cxt.arc(x, y, r, h1, h2, false);
    cxt.strokeStyle = color;
    cxt.stroke();
  }
  function drawClockBox() {
    //秒针标
    cxt.save();
    cxt.beginPath();
    for (var i = 0; i < 60; i++) {
      cxt.lineTo(200,200);
      drawArcStroke(200, 200, 180, i * 6 * Math.PI/180, (i + 1) * 6 * 
        Math.PI/180, "#333333");
    }
    cxt.closePath();
    //遮罩层1
    cxt.beginPath();
    drawArcFill(200, 200, 170, 0, 2 * Math.PI, '#ffffff');
    cxt.closePath();
    //时针标
    cxt.beginPath();
    cxt.lineWidth = 4;
    for (var i = 0; i < 12; i++) {
      cxt.lineTo(200,200);
      drawArcStroke(200, 200, 180, i * 30 * Math.PI/180, (i + 1) * 30 * 
        Math.PI/180, "#333333");
    }
    //遮罩层2
    cxt.beginPath();
    drawArcFill(200, 200, 160, 0, 2 * Math.PI, '#ffffff');
    cxt.closePath();
    //指针原点
    cxt.beginPath();
    drawArcFill(200, 200, 8, 0, 2 * Math.PI, "#333");
    cxt.closePath();
    cxt.restore();
  }
  function drawLine(seconde, minute, hour) {
    //秒针
    cxt.save();
    cxt.beginPath();
    cxt.lineWidth = 2;
    cxt.lineTo(200, 200);
    drawArcStroke(200, 200, 150, (-90 + 6 * seconde) * Math.PI/180, (-90 + 6 * seconde) * Math.PI/180, '#333333');
    cxt.closePath();
    cxt.restore();
    //分针
    cxt.save();
    cxt.beginPath();
    cxt.lineWidth = 4;
    cxt.lineTo(200, 200);
    drawArcStroke(200, 200, 120, ((-90 + 6 * minute) + ((-90 + 6 * seconde) * 1/60)) * Math.PI/180, ((-90 + 6 * minute) + ((-90 + 6 * seconde) * 1/60)) * Math.PI/180, '#333333');
    cxt.closePath();
    cxt.restore();
    //时针
    cxt.save();
    cxt.beginPath();
    cxt.lineWidth = 6;
    cxt.lineTo(200, 200);
    drawArcStroke(200, 200, 100, ((-90 + 30 * hour) + ((-90 + 6 * minute) * 1/12)) * Math.PI/180, ((-90 + 30 * hour) + ((-90 + 6 * minute) * 1/12)) * Math.PI/180, '#333333');
    cxt.closePath();
    cxt.restore();
  }
  function lineMove() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconde = date.getSeconds();
    drawClockBox();
    drawLine(seconde, minute, hour);
    setInterval(function() {
      cxt.clearRect(0, 0, canvas.width, canvas.height);
      drawClockBox();
      var date = new Date();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var seconde = date.getSeconds();
      drawLine(seconde, minute, hour);
    }, 1000);
  }
  lineMove();
})()