var addressInfor = addressData;

var addressBox = new Vue({
    el: '.box',
    data: {
        addressList: addressInfor.body,
        beforeThree: [],
        lastRest: [],
        down: false,
        up: true
    },
    mounted: function() {
        var sevenList = [];
        var threeList = this.addressList.splice(0, 3);
        for (var i = 0; i < this.addressList.length; i++ ) {
            sevenList.push(this.addressList[i]);
        }
        this.beforeThree = threeList;
        this.lastRest = sevenList;
        this.addressList = threeList;
    },
    methods: {
        write: function(item) {
            var This = this;
            var extend = '<div class="ebox" style="width: 100%;">' +
                             '<p style="margin: 0 auto 10px auto;">收件人姓名：<input class="name" type="text"></p>' +
                             '<p style="margin: 0 auto 10px auto;">收件人地址：<input class="address" type="text"></p>' +
                             '<p style="margin: 0 auto 10px auto;">收件人电话：<input class="phone" type="text"></p>' +
                         '</div>';
            var remindMeExtend = new RemindMe({
                remindMark: true,
                remindBoxType: 'extend',
                remindInfo: '请您填写好相关信息并确认',
                remindTitle: '修改信息',
                remindExtendContent: extend,
                remindBoxWidth: 400,
                remindBtnNoText: '取消',
                remindBtnYesText: '确认',
                remindNOCallback: function() {},
                remindYesCallback: function() {
                    var box = document.getElementsByClassName('remMe-extend')[0];
                    var name = box.getElementsByClassName('name')[0].value;
                    var address = box.getElementsByClassName('address')[0].value;
                    var phone = box.getElementsByClassName('phone')[0].value;
                    if (name != '') {
                        item.username = name;
                    }
                    if (address != '') {
                        item.useraddress = address;
                    }
                    if (phone != '') {
                        item.userphone = phone;
                    }
                    This.addressList = This.beforeThree.concat(This.lastRest);
                    var remindMe2 = new RemindMe({
                        remindMark: false,
                        remindBoxType: 'noButton',
                        remindType: 'finish',
                        remindTitle: '提示',
                        remindInfo: '修改成功！'
                    });
                }
            });
        },
        addAddress: function() {
            var This = this;
            var extend = '<div class="ebox" style="width: 100%;">' +
                             '<p style="margin: 0 auto 10px auto;">收件人姓名：<input class="name" type="text"></p>' +
                             '<p style="margin: 0 auto 10px auto;">收件人地址：<input class="address" type="text"></p>' +
                             '<p style="margin: 0 auto 10px auto;">收件人电话：<input class="phone" type="text"></p>' +
                         '</div>';
            var remindMeExtend = new RemindMe({
                remindMark: true,
                remindBoxType: 'extend',
                remindInfo: '请您填写好相关信息并确认',
                remindTitle: '添加地址',
                remindExtendContent: extend,
                remindBoxWidth: 400,
                remindBtnNoText: '取消',
                remindBtnYesText: '确认',
                remindNOCallback: function() {},
                remindYesCallback: function() {
                    var box = document.getElementsByClassName('remMe-extend')[0];
                    var name = box.getElementsByClassName('name')[0].value;
                    var address = box.getElementsByClassName('address')[0].value;
                    var phone = box.getElementsByClassName('phone')[0].value;
                    var data = {
                        username: name,
                        useraddress: address,
                        userphone: phone,
                        isDefaultAddress: false,
                        addressId:This.addressList.length + 1
                    }
                    This.lastRest.push(data);
                    This.addressList = This.beforeThree.concat(This.lastRest);
                    var remindMe2 = new RemindMe({
                        remindMark: false,
                        remindBoxType: 'noButton',
                        remindType: 'finish',
                        remindTitle: '提示',
                        remindInfo: '添加成功！'
                    });
                }
            });
        },
        delet: function(index) {
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
                    if (This.up == true) {
                        This.beforeThree.splice(index, 1);// 从3个里删除一个
                        var threeDel = This.beforeThree;
                        var newConcat = threeDel.concat(This.lastRest);// 连接最后剩余的成新数组
                        var agin = newConcat.splice(0, 3);
                        This.beforeThree = agin;
                        This.lastRest = newConcat;
                        This.addressList = agin;
                    } else {
                        var downDel = This.beforeThree.concat(This.lastRest);
                        downDel.splice(index, 1);
                        var dT = downDel.splice(0, 3);
                        var recive = [];
                        for (var i = 0; i < downDel.length; i++) {
                            recive.push(downDel[i]);
                        }
                        This.lastRest = recive;
                        This.beforeThree = dT;
                        This.addressList = dT.concat(recive);
                    }
                    var remindMe2 = new RemindMe({
                        remindMark: false,
                        remindBoxType: 'noButton',
                        remindType: 'finish',
                        remindTitle: '提示',
                        remindInfo: '删除成功！'
                    });
                }
            });

        },
        more: function() {
            if (this.down == false) {
                this.down = true;
                this.up = false;
                this.addressList = this.beforeThree.concat(this.lastRest);
            }
        },
        setDef: function(item) {
            if (item.isDefaultAddress == true) {
                return;
            }
            this.addressList.forEach(function(value, index) {
                value.isDefaultAddress = false;
            });
            item.isDefaultAddress = true;
            var remindMe2 = new RemindMe({
                remindMark: false,
                remindBoxType: 'noButton',
                remindType: 'finish',
                remindTitle: '提示',
                remindInfo: '设置默认成功！'
            });
        }
    }
});
