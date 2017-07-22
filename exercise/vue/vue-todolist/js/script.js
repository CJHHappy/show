(function () {
  window.onload = function() {
    var formModule = new Vue({
      el: '#formModule',
      data: {
        dataGroup: [],
        mes: {
          name: '',
          age: '',
          sex: '',
          meg: '' 
        }
      },
      methods: {
        add: function() {
          this.dataGroup.push(this.$data.mes);
          this.$data.mes = {
          name: '',
          age: '',
          sex: '',
          meg: ''
          };
        },
        cancel: function() {
          this.$data.mes = {
          name: '',
          age: '',
          sex: '',
          meg: ''
          };
        }
      }
    });
    var tableModule = new Vue({
      el: '#tableInfor',
      data: {
        userData: formModule.$data.dataGroup
      },
      methods: {
        deleteAll: function() {
          this.$data.userData.splice(0, this.$data.userData.length);
        },
        d: function(n) {
          this.$data.userData.splice(n, 1);
        }
      }
    });
  }
})()