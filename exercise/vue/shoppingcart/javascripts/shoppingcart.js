var dataBody = data;
var shoppingBox = new Vue({
    el: '#shopping-box',
    data: {
        goodsList: dataBody,
        checkAll: false,
        allMoney: 0
    },
    methods: {
        numControl: function(item, type) {
            if (type == 1) {
                item.goodsDefaultNum++;
            } else {
                item.goodsDefaultNum--;
                if (item.goodsDefaultNum <= 1) {
                    item.goodsDefaultNum = 1;
                }
            }
            this.totalMoney();
        },
        changeCheck: function(item) {
            if (item.goodsChecked == false) {
                item.goodsChecked = true;
            } else {
                item.goodsChecked = false;
            }
            this.totalMoney();
        },
        changeCheckAll: function() {
            if (this.checkAll == false) {
                this.checkAll = true;
                this.goodsList.body.forEach(function(value, index) {
                    value.goodsChecked = true;
                });
            } else {
                this.checkAll = false;
                this.goodsList.body.forEach(function(value, index) {
                    value.goodsChecked = false;
                });
            }
            this.totalMoney();
        },
        totalMoney: function() {
            var This = this;
            this.allMoney = 0;
            this.goodsList.body.forEach(function(value, index) {
                if (value.goodsChecked == true) {
                    This.allMoney += value.goodsPrice * value.goodsDefaultNum;
                }
            });
        },
        delList: function(item) {
            var This = this;
            var remindMe1 = new RemindMe({
                remindMark: true,
                remindBoxType: 'button',
                remindType: 'warn',
                remindTitle: '提示',
                remindInfo: '确认删除吗？',
                remindBtnNoText: '取消',
                remindBtnYesText: '确认',
                remindNOCallback: function() {

                },
                remindYesCallback: function() {
                    var index = This.goodsList.body.indexOf(item);
                    This.goodsList.body.splice(index, 1);
                    var remindMe2 = new RemindMe({
                        remindMark: false,
                        remindBoxType: 'noButton',
                        remindType: 'finish',
                        remindTitle: '提示',
                        remindInfo: '删除成功！'
                    });
                    if (item.goodsChecked == true) {
                        console.log(1);
                        This.totalMoney();
                    }
                }
            });
        },
        pay: function(ev) {
            var ev = ev || window.event;
            if (this.allMoney == 0) {
                ev.preventDefault();
                var remindMe3 = new RemindMe({
                    remindMark: false,
                    remindBoxType: 'noButton',
                    remindType: 'warn',
                    remindInfo: '请您选择商品!',
                });
            }
        }

    }
});
