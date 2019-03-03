'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dayComputed = function () {
  function dayComputed(startDay, endDay) {
    _classCallCheck(this, dayComputed);

    // 格式 2019-3-1
    // 第一个参数必须传
    this.startDay = startDay;
    this.endDay = endDay;
    // this.fn()
  }

  _createClass(dayComputed, [{
    key: 'fn',
    value: function fn() {
      // 计算函数
      console.log('day computed');
      var start = new Date(this.startDay.split('-')[0], this.startDay.split('-')[1] - 1, this.startDay.split('-')[2]).getTime();
      if (this.endDay) {
        var end = new Date(this.endDay.split('-')[0], this.endDay.split('-')[1] - 1, this.endDay.split('-')[2]).getTime();
        console.log((end - start) / (60 * 60 * 24 * 1000));
        return (end - start) / (60 * 60 * 24 * 1000);
      } else {
        var endDay = new Date();
        var _end = new Date(endDay.getFullYear(), endDay.getMonth(), endDay.getDate()).getTime();
        console.log((_end - start) / (60 * 60 * 24 * 1000));
        return (_end - start) / (60 * 60 * 24 * 1000);
      }
    }
  }]);

  return dayComputed;
}();

exports.default = dayComputed;