/**
 *remindMark: true | Boolean
 * remindBoxType: button, noButton, extend load | String
 * remindType: button: warn, finish, error, query | String
 *             noButton: warn, finish | String
 *             extend: extend | String
 *             load: load | String
 * remindBoxWidth: 350 | Number
 * remindTitle: 提示 | String
 * remindInfo: 欢迎使用remindMe！ | String
 * remindExtendContent: 段落 | String | Html String
 * remindBtnNoText: 取消 | String
 * remindBtnYesText: 确定 | String
 * remindNOCallback: no() | function
 * remindYesCallback: yes() | function
 * remindDely: 0
 * remindLoadCallback: null | function
 * 必传参数 (*)
 * 可选参数 (-)
 */
(function() {
    var RemindMe = function(option) {
        var obj = option;
        // 所需要的 Dom 元素
        this.timer = null;
        this.mark = document.createElement('div');
        this.remMe = document.createElement('div');
        this.remMeTitle = document.createElement('div');
        this.remMeCotent = document.createElement('div');
        this.remMeIcon = document.createElement('div');
        this.remMeInfo = document.createElement('div');
        this.remMeExtend = document.createElement('div');
        this.remMeBtn = document.createElement('div');
        this.remMeExtendBox = document.createElement('div');
        this.remMeExtendCont = document.createElement('div');
        this.remMeNo = document.createElement('button');
        this.remMeYes = document.createElement('button');
        // 创建默认参数
        this.defaultOption = {
            remindMark: false, // -
            remindBoxType: 'noButton', // -
            remindType: 'finish', // -
            remindBoxWidth: '', // -
            remindTitle: '', // -
            remindInfo: '欢迎使用remindMe！', // -
            remindExtendContent: '', // -
            remindBtnNoText: '', // -
            remindBtnYesText: '', // -
            remindNOCallback: null, // *
            remindYesCallback: null, // *
            remindDely: 2000
        }
        this.init(obj);
    }
    RemindMe.prototype.init = function(obj) {
        var This = this;
        for (var key in obj) {
            this.defaultOption[key] = obj[key];
        }
        this.createBox();
        this.no();
        this.yes();
        window.addEventListener('resize', function() {
            This.remMe.style.left = (window.innerWidth - This.remMe.offsetWidth) / 2 + 'px';
            This.remMe.style.top = (window.innerHeight - This.remMe.offsetHeight) / 2 + 'px';
        }, false);
    }
    RemindMe.prototype.createBox = function() {
        var This = this;
        var time;
        // 是否需要遮罩层
        if (this.defaultOption.remindMark == true) {
            var body = document.body.appendChild(this.mark);
            this.mark.className = 'remMe-mark';
        }
        if (this.defaultOption.remindBoxType == 'button') {
            this.remMe.className = "remMe-isbtn"; //框架
            this.remMeTitle.className = "remMe-title";//共标题
            this.remMeCotent.className = "remMe-cotent-isbtn";// 内容框
            // icon
            if (this.defaultOption.remindType == 'warn') {
                this.remMeIcon.className = "remMe-btnwarn-icon";
            } else if (this.defaultOption.remindType == 'finish') {
                this.remMeIcon.className = "remMe-btnfinish-icon";
            } else if (this.defaultOption.remindType == 'query') {
                this.remMeIcon.className = "remMe-btnquery-icon";
            } else {
                this.remMeIcon.className = "remMe-btnerror-icon";
            }
            this.remMeInfo.className = "remMe-info-isbtn";// 消息
            this.remMeBtn.className = "remMe-btns";
            this.remMeNo.className = "remMe-btnno";
            this.remMeYes.className = "remMe-btnyes";
            //插入dom
            this.remMeCotent.appendChild(this.remMeIcon);
            this.remMeCotent.appendChild(this.remMeInfo);
            this.remMeBtn.appendChild(this.remMeNo);
            this.remMeBtn.appendChild(this.remMeYes);
            this.remMe.appendChild(this.remMeTitle);
            this.remMe.appendChild(this.remMeCotent);
            this.remMe.appendChild(this.remMeBtn);
            //插入数据
            this.remMeTitle.innerText = this.defaultOption.remindTitle;
            this.remMeInfo.innerText = this.defaultOption.remindInfo;
            this.remMeNo.innerText = this.defaultOption.remindBtnNoText;
            this.remMeYes.innerText = this.defaultOption.remindBtnYesText;
            document.body.appendChild(this.remMe);
            this.remMe.style.left = (window.innerWidth - this.remMe.offsetWidth) / 2 + 'px';
            this.remMe.style.top = (window.innerHeight - this.remMe.offsetHeight) / 2 + 'px';
            clearInterval(time);
            time = setTimeout(function() {
                This.remMe.className = "remMe-isbtn remMe-isbtn-animation";
            }, 100);
        } else if (this.defaultOption.remindBoxType == 'noButton') {
            this.remMe.className = "remMe";
            this.remMeCotent.className = "remMe-cotent";
            this.remMeInfo.className = "remMe-info";
            if (this.defaultOption.remindType == 'finish') {
                this.remMeIcon.className = "remMe-icon-finish";
            } else if (this.defaultOption.remindType == 'warn') {
                this.remMeIcon.className = "remMe-icon-warn";
            } else {
                console.log('没有按钮的弹框只支持 warn, finish');
                return;
            }
            this.remMeInfo.innerText = this.defaultOption.remindInfo;
            this.remMeCotent.appendChild(this.remMeIcon);
            this.remMeCotent.appendChild(this.remMeInfo);
            this.remMe.appendChild(this.remMeCotent);
            document.body.appendChild(this.remMe);
            this.remMe.style.left = (window.innerWidth - this.remMe.offsetWidth) / 2 + 'px';
            this.remMe.style.top = (window.innerHeight - this.remMe.offsetHeight) / 2 + 'px';
            clearInterval(time);
            time = setTimeout(function() {
                This.remMe.className = "remMe remMe-animation";
            }, 100);
            //消息提示后 delay 秒后自己删除
            this.delay(this.defaultOption.remindDely);
        } else if (this.defaultOption.remindBoxType == 'extend') {
            this.remMe.className = "remMe-isExtend"; //框架
            this.remMeTitle.className = "remMe-title";//共标题
            this.remMeCotent.className = "remMe-cotent-isExtend";// 内容框
            this.remMeInfo.className = "remMe-info-isExtend";
            this.remMeExtendBox.className = "remMe-isExtend-box";
            this.remMeExtendCont.className = "remMe-extend";
            this.remMeBtn.className = "remMe-btns";
            this.remMeNo.className = "remMe-btnno";
            this.remMeYes.className = "remMe-btnyes";
            this.remMeCotent.appendChild(this.remMeInfo);
            this.remMeExtendBox.appendChild(this.remMeExtendCont);
            this.remMeBtn.appendChild(this.remMeNo);
            this.remMeBtn.appendChild(this.remMeYes);
            this.remMe.appendChild(this.remMeTitle);
            this.remMe.appendChild(this.remMeCotent);
            this.remMe.appendChild(this.remMeExtendBox);
            this.remMe.appendChild(this.remMeBtn);
            this.remMeInfo.innerText = this.defaultOption.remindInfo;
            this.remMeTitle.innerText = this.defaultOption.remindTitle;
            this.remMeExtendCont.innerHTML = this.defaultOption.remindExtendContent;
            this.remMeNo.innerText = this.defaultOption.remindBtnNoText;
            this.remMeYes.innerText = this.defaultOption.remindBtnYesText;
            document.body.appendChild(this.remMe);
            if (this.defaultOption.remindBoxWidth > 350) {
                this.remMe.style.width = this.defaultOption.remindBoxWidth + 'px';
            }
            this.remMe.style.left = (window.innerWidth - this.remMe.offsetWidth) / 2 + 'px';
            this.remMe.style.top = (window.innerHeight - this.remMe.offsetHeight) / 2 + 'px';
            clearInterval(time);
            time = setTimeout(function() {
                This.remMe.className = "remMe-isExtend remMe-isExtend-animation";
            }, 100);
        } else if (this.defaultOption.remindBoxType == 'load') {
            this.remMe.className = "remMe-load";
            this.remMeCotent.className = "remMe-load-content";
            this.remMeInfo.className = "remMe-load-info";
            this.remMeIcon.className = "remMe-load-icon";
            this.remMeInfo.innerText = this.defaultOption.remindInfo;
            this.remMeCotent.appendChild(this.remMeInfo);
            this.remMeCotent.appendChild(this.remMeIcon);
            this.remMe.appendChild(this.remMeCotent);
            document.body.appendChild(this.remMe);
            this.remMe.style.left = (window.innerWidth - this.remMe.offsetWidth) / 2 + 'px';
            this.remMe.style.top = (window.innerHeight - this.remMe.offsetHeight) / 2 + 'px';
            clearInterval(time);
            time = setTimeout(function() {
                This.remMe.className = "remMe-load remMe-load-animation";
            }, 100);
        } else {
            console.log('remindMe has no that' + 'remindBoxType' + this.defaultOption.remindBoxType);
        }
    }
    RemindMe.prototype.no = function() {
        var This = this;
        if (this.defaultOption.remindNOCallback) {
            if (typeof(this.defaultOption.remindNOCallback) == "function") {
                this.remMeNo.addEventListener('click', function(ev) {
                    var ev = ev || window.event
                    ev.stopPropagation();
                    This.clearMyself();
                    This.defaultOption.remindNOCallback();
                }, false);
            }
        } else {
            console.log("reMindMe must have 'remindNOCallback' and type must be Function");
        }
    }
    RemindMe.prototype.yes = function() {
        var This = this;
        if (this.defaultOption.remindYesCallback) {
            if (typeof(this.defaultOption.remindYesCallback) == "function") {
                this.remMeYes.addEventListener('click', function(ev) {
                    var ev = ev || window.event
                    ev.stopPropagation();
                    This.defaultOption.remindYesCallback();
                    This.clearMyself();
                }, false);
            }
        } else {
            console.log("reMindMe must have 'remindYesCallback' and type must be Function");
        }
    }
    RemindMe.prototype.delay = function(delay) {
        var This = this;
        clearInterval(this.timer);
        this.timer = setTimeout(function() {
            document.body.removeChild(This.remMe);
            if (This.defaultOption.remindMark == true) {
                document.body.removeChild(This.mark);
            }
        }, delay);
    }
    RemindMe.prototype.clearMyself = function() {
        if (this.defaultOption.remindMark == true) {
            document.body.removeChild(this.mark);
        }
        document.body.removeChild(this.remMe);
    }
    window.RemindMe = RemindMe;
})()
// 实例
// var remind1 = new RemindMe({
//     remindBoxType: 'load',
//     remindType: 'warn',
//     remindMark: false,
//     remindBoxWidth: 400,
//     remindTitle: "警告",
//     remindInfo: "这个东西不能卸载！",
//     remindBtnNoText: "取消",
//     remindBtnYesText: "确地",
//     remindDely: 1500,
//     remindNOCallback: function() {
//
//     },
//     remindYesCallback: function() {
//
//     }
// });
