'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _spider = require('./spider');

var _spider2 = _interopRequireDefault(_spider);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 定时任务
var timingTask = function () {
  function timingTask() {
    _classCallCheck(this, timingTask);

    this.spiderMsg;
    // this.init()
  }

  _createClass(timingTask, [{
    key: 'init',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var msg;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getSpiderMsg();

              case 2:
                _context.next = 4;
                return this.getContent();

              case 4:
                msg = _context.sent;
                _context.next = 7;
                return this.postMsg(msg);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()

    // good morning

  }, {
    key: 'postMsg',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(msg) {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _axios2.default.post('http://127.0.0.1:7187/send_group_msg', {
                  group_id: 851970427,
                  message: msg,
                  auto_escape: false
                });

              case 3:
                data = _context2.sent;

                // let data = await axios.post(`http://127.0.0.1:7187/send_private_msg`, {
                //   user_id: 862235971,
                //   message: msg,
                //   auto_escape: false
                // })
                console.log(data);

                if (!(data.status === 200)) {
                  _context2.next = 9;
                  break;
                }

                _axios2.default.post('http://127.0.0.1/7192/api/post', msg);
                _context2.next = 10;
                break;

              case 9:
                return _context2.abrupt('return');

              case 10:
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2['catch'](0);

                console.error(_context2.t0);

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 12]]);
      }));

      function postMsg(_x) {
        return _ref2.apply(this, arguments);
      }

      return postMsg;
    }()

    // 获取爬虫数据

  }, {
    key: 'getSpiderMsg',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var spiders;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                spiders = new _spider2.default(101190901);
                _context3.next = 3;
                return spiders.init();

              case 3:
                this.spiderMsg = _context3.sent;

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getSpiderMsg() {
        return _ref3.apply(this, arguments);
      }

      return getSpiderMsg;
    }()
  }, {
    key: 'getContent',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var day;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // let time = new Date().getFullYear
                day = new _day2.default('2018-8-31');
                return _context4.abrupt('return', [{
                  type: 'text',
                  data: {
                    text: '\u65E9\u5440\uFF01\u7F18\u7F18~\n\n          \u4ECA\u5929\u662F' + new Date().getFullYear() + '\u5E74' + (new Date().getMonth() + 1) + '\u6708' + new Date().getDate() + '\u65E5.\n          \u6211\u5DF2\u7ECF\u60F3\u4E86\u4F60' + day.fn() + '\u5929\u3002\n\n          \u7F18\u7F18\uFF0C\u6B64\u523B\u5916\u9762\u6E29\u5EA6\u4E3A' + this.spiderMsg.weather.wendu + '\xB0\uFF0C' + this.spiderMsg.weather.ganmao + ',\n          \u4ECA\u5929' + this.spiderMsg.weather.forecast[0].high + ',' + this.spiderMsg.weather.forecast[0].low + ',\n          \u6E7F\u5EA6' + this.spiderMsg.weather.shidu + ',\n          PM2.5' + this.spiderMsg.weather.pm25 + ',\u7A7A\u6C14\u8D28\u91CF' + this.spiderMsg.weather.quality + ',\n          ' + this.spiderMsg.weather.forecast[0].notice + '\u3002\n\n          \u4ECA\u65E5\u8BED\u5F55\uFF1A' + this.spiderMsg.word + '\n          '
                  }
                },
                // {
                //   type: 'text',
                //   data: {
                //     text: `
                //     缘缘，此刻外面温度为${this.spiderMsg.weather.wendu}°，${this.spiderMsg.weather.ganmao},
                //     今天${this.spiderMsg.weather.forecast[0].high},${this.spiderMsg.weather.forecast[0].low},
                //     湿度${this.spiderMsg.weather.shidu},
                //     PM2.5${this.spiderMsg.weather.pm25},空气质量${this.spiderMsg.weather.quality},
                //     ${this.spiderMsg.weather.forecast[0].notice}。`
                //   }
                // },
                {
                  type: 'image',
                  data: {
                    file: 'https://www.big.com' + this.spiderMsg.img.url
                  }
                  // },
                  // {
                  //   type: 'text',
                  //   data: {
                  //     text: this.spiderMsg.word
                  //   }
                  // }
                }]);

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getContent() {
        return _ref4.apply(this, arguments);
      }

      return getContent;
    }()
  }]);

  return timingTask;
}();

exports.default = timingTask;