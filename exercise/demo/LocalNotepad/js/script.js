(function() {
  var textContent = document.querySelector('#pub-box .content'),
      beginTimes = document.querySelectorAll('#pub-box .time-begin input'),
      endTimes = document.querySelectorAll('#pub-box .time-end input'),
      reset = document.querySelector('#pub-box .btn .reset'),
      add = document.querySelector('#pub-box .btn .add'),
      content = document.querySelector('#content'),
      temp = localStorage.getItem('D'),
      id,
      data,
      lcdata;
      
  if (!temp) {
    data = [];
  } else {
    data = JSON.parse(temp);
  }

  /*插入任务*/
  function createAriticle(id, text, createTime, msTime) {
    var str = '<article class="c-b" data-id="' + id + '">' +
                '<div class="red-star"></div>' +
                '<div class="ms-cont-b">' +
                    '<div class="ms-cont">' + text + '</div>' +
                    '<div class="ms-icon"></div>' + 
                '</div>' + 
                '<div class="ms-b">' +
                    '<div class="ms-time">' +
                        '<p class="create-t">创建于：<span>' + createTime + '</span></p>' +
                        '<p class="set-t">' + msTime +'</p>' +
                    '</div>' +
                    '<div class="ms-btn">' +
                        '<button class="del" onclick="deletArticle(this)">删除</button>' +
                        '<button class="star" onclick="addRedStar(this)">设为星标任务</button>' +
                        '<button class="finished" onclick="isFinish(this)">确认完成</button>' +
                    '</div>' +
                '</div>' +
            '</article>'
    content.innerHTML = str + content.innerHTML;
  }
  /*删除任务*/
  function deletArticle(self) {
    var id = self.parentNode.parentNode.parentNode.getAttribute('data-id');
    var parent = self.parentNode.parentNode.parentNode.parentNode;
    var arts = document.querySelectorAll('.c-b');
    var s;
    for (var i = 0; i < arts.length; i++) {
      if (arts[i].getAttribute('data-id') == id) {
        parent.removeChild(arts[i]);
        for (var j = 0; j < data.length; j++) {
          if (data[j].id == id) {
            data.splice(j,1);
          }
        }
      }
    }
    s = JSON.stringify(data);
    localStorage.setItem('D', s);
  }
  window.deletArticle = deletArticle;
  /*添加星标任务*/
  function addRedStar(self) {
    var id = self.parentNode.parentNode.parentNode.getAttribute('data-id');
    var str;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        if (!data[i].star) {
          self.parentNode.parentNode.parentNode.children[0].className = 'red-star fa fa-star';
          self.innerHTML = "取消星标任务";
          data[i].star = true;
        } else {
          self.parentNode.parentNode.parentNode.children[0].className = 'red-star';
          self.innerHTML = "设为星标任务";
          data[i].star = false;
        }
      }
    }
    str = JSON.stringify(data);
    localStorage.setItem('D', str);
  }
  window.addRedStar = addRedStar;
 /*确认任务完成操作*/
  function isFinish(self) {
    var id = self.parentNode.parentNode.parentNode.getAttribute('data-id');
    var str;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        if (data[i].finished == 0) {
          self.parentNode.parentNode.previousSibling.children[1].className = 'ms-icon fa fa-check';
          self.innerHTML = "取消完成";
          data[i].finished = 1;
        } else if (data[i].finished == 1) {
          self.parentNode.parentNode.previousSibling.children[1].className = 'ms-icon';
          self.innerHTML = "确认完成";
          data[i].finished = 0;
        } else {
          return;
        }
      }
    }
    str = JSON.stringify(data);
    localStorage.setItem('D', str);
  }
  window.isFinish = isFinish;
  /*页面加载完，向页面加载默认任务起始时间*/
  function addDefaultTime() {
    var date = new Date();
    beginTimes[0].placeholder = date.getFullYear();
    beginTimes[1].placeholder = date.getMonth() + 1;
    beginTimes[2].placeholder = date.getDate();
  }
  addDefaultTime();
  /*加载任务*/
  function loadThing() {
    var arr,
        length,
        sets,
        finishs,
        arts,
        stars,
        now = new Date().getTime(),
        d = localStorage.getItem('D');
    if (!d) {
      console.log(d);
      return;
    }
    arr = JSON.parse(d);
    length = arr.length;
    for (var m = 0; m < length; m++) {
      if ((now - arr[m].id) > 259200000) {
        arr.splice(m, 1);
      }
    }
    if (!arr.length) {
      return;
    }
    for (var i = 0; i < length; i++) {
      createAriticle(arr[i].id, arr[i].text, arr[i].createTime, arr[i].msTime);
    }
    arts = document.querySelectorAll('.c-b');
    finishs = document.querySelectorAll('.finished');
    for (var i = 0; i < length; i++) {
      if (arr[i].star) {
        for (var j = 0; j < arts.length; j++) {
          if (arts[j].getAttribute('data-id') == arr[i].id) {
            arts[j].children[0].className = 'red-star fa fa-star';
            arts[j].getElementsByClassName('star')[0].innerHTML = '取消星标任务';
          }
        }
      }
      if ((arr[i].em - arr[i].bm) < 0) {
        arr[i].finished = 2;
      } 
      if (arr[i].finished == 0) {
        for (var k = 0; k < arts.length; k++) {
          if (arts[k].getAttribute('data-id') == arr[i].id) {
            arts[k].getElementsByClassName('ms-icon')[0].className = 'ms-icon';
            arts[k].getElementsByClassName('finished')[0].innerHTML = '确认完成';
          }
        }
      } else if (arr[i].finished == 1) {
        for (var t = 0; t < arts.length; t++) {
          if (arts[t].getAttribute('data-id') == arr[i].id) {
            arts[t].getElementsByClassName('ms-icon')[0].className = 'ms-icon fa fa-check';
            arts[t].getElementsByClassName('finished')[0].innerHTML = '取消完成';
          }
        }
      } else if (arr[i].finished == 2) {
        for (var n = 0; n < arts.length; n++) {
          if (arts[n].getAttribute('data-id') == arr[i].id) {
            arts[n].getElementsByClassName('ms-icon')[0].className = 'ms-icon fa fa-close';
            arts[n].getElementsByClassName('finished')[0].style.display = 'none';
            arts[n].getElementsByClassName('star')[0].style.display = 'none';
          }
        }
      }
    }
  }
  loadThing();
  /*重置按钮*/
  function resetContent() {
    var length = endTimes.length;
    textContent.value = "";
    for (var i = 0; i < length; i++) {
      beginTimes[i].value = "";
      endTimes[i].value = "";
    }
  }
  reset.addEventListener('click', function(ev){
    var ev = ev || event;
    ev.stopPropagation();
    resetContent();
  }, false);
  /*添加任务*/
  add.addEventListener('click', function(ev){
    var ev = ev || event;
    ev.stopPropagation();
    var date = new Date(); 
    var createTime,
        beginTime,
        contText,
        endTime,
        defY,
        defM,
        defD, 
        msTime,
        em,
        bm,
        c,
        id = new Date().getTime();
    if (textContent.value == "") {
      alert('输入不能为空');
      return;
    }
    if (endTimes[0].value == "" || endTimes[1].value == "" || endTimes[2].value == "") {
      alert('结束时间不能留空');
      return;
    }  
    if (beginTimes[0].value == "") {
      defY = beginTimes[0].placeholder;
    } else {
      defY = beginTimes[0].value;
    }
    if (beginTimes[1].value == "") {
      defM = beginTimes[1].placeholder;
    } else {
      defM = beginTimes[1].value;
    }
    if (beginTimes[2].value == "") {
      defD = beginTimes[2].placeholder;
    } else {
      defD = beginTimes[2].value;
    }
    c = id - new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()).getTime();
    createTime = date.getFullYear() + '年' +
                  (date.getMonth() + 1) + '月' +
                  date.getDate() + '日';

    endTime = {
      year: endTimes[0].value,
      month: endTimes[1].value,
      day: endTimes[2].value
    }
    em = new Date(endTime.year + '/' + endTime.month + '/' + endTime.day).getTime() + c;
    beginTime = {
      year: defY,
      month: defM,
      day: defD
    }
    bm = new Date(beginTime.year + '/' + beginTime.month + '/' + beginTime.day).getTime() + c;
    msTime = '任务有效期：' + beginTime.year + '年' + beginTime.month + '月' + 
              beginTime.day + '日  至 ' + endTime.year + '年' + endTime.month + '月' + 
              endTime.day + '日';
    /*一个文章的整体数据*/
    var contText = {
      text: textContent.value,
      createTime: createTime,
      beginTime: beginTime,
      endTime: endTime,
      star: false,
      finished: 0,
      msTime: msTime,
      id: id,
      bm: bm,
      em: em
    }
    data.push(contText);
    lcdata = JSON.stringify(data);
    localStorage.setItem('D', lcdata);
    createAriticle(contText.id, contText.text, contText.createTime, contText.msTime);
    resetContent();
  }, false);
})()