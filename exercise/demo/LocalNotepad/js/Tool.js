(function() {
  var Tool = {};
  Tool = {
    //dom相关操作
    Dom: {
      //获取多个class里的单个class
      getByClassName: function(parent, classname) {
        var childrens = parent.children;
        var childrenLen = childrens.length;
        for (var i = 0; i < childrenLen; i++) {
            if (childrens[i].className) {
                var arr = childrens[i].className.split(' ');
                for (var k = 0; k < arr.length; k++) {
                    if(arr[k] == classname) {
                        return childrens[i];
                        break;
                    }
                }
            }
        }
      },
      //元素是否有某个 class
      isClassName: function(classArr, classed) {
        //传入 classArr数组 ，要添加的class名
        for (var i = 0; i < classArr.length; i++) {
          if (classArr[i] == classed) {
            return i;
          }
        }
        return -1;
      },
      //给某对象添加class
      addClassName: function(obj, classname) {
        var cla = 0;
        var claIndex = 0;
        // 是否有class
        // 如果没有class 直接添加
        if (obj.className == "") {
          obj.className = classname;
        }
        else {
            //如果有class
            //class 列表里是否有要添加的class， 调用isclassname方法
          cla = obj.className.split('');
          claIndex = isClassName(cla, classname);
          //如果不存在要添加的class
          if (claIndex == -1 ) {
            obj.className += " " + classname;
          }
        }
      },
      //给某元素移除class
      removeClassName: function(obj, classname) {
        var cla = 0;
        var claIndex = 0;
        //如果有class
        if (obj.className != "") {
          //class 列表里是否有要移除的class， 调用isclassname方法
          cla = obj.className.split(' ');
          claIndex = isClassName(cla, classname);
          //如果存在要移除的class
          if (claIndex != -1) {
            cla.splice(claIndex, 1);
            obj.className = cla.join('');
          }
        }
      }

    },
    //Style类操作
    Style: {

    },
    //Bom类
    Bom: {

    }

  }
  window.Tool = Tool;
})();

