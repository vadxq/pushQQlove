'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var spider = function () {
  function spider(city) {
    _classCallCheck(this, spider);

    this.id;
    this.city = city;
    // this.init();
  }

  _createClass(spider, [{
    key: 'init',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var word, weather, img, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('start browser');
                _context.next = 3;
                return _puppeteer2.default.launch();

              case 3:
                this.browser = _context.sent;

                console.log('start new page');
                _context.next = 7;
                return this.browser.newPage();

              case 7:
                this.page = _context.sent;
                _context.next = 10;
                return this.getId();

              case 10:
                _context.next = 12;
                return this.getWord();

              case 12:
                word = _context.sent;
                _context.next = 15;
                return this.getWeather();

              case 15:
                weather = _context.sent;
                _context.next = 18;
                return this.getImg();

              case 18:
                img = _context.sent;

                this.closeBrowser();
                data = {
                  word: word,
                  img: img,
                  weather: weather
                };

                console.log(data);
                return _context.abrupt('return', data);

              case 23:
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

    // get page id

  }, {
    key: 'getId',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var day;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                day = new _day2.default('2019-3-1');

                this.id = day.fn() + 2366;

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getId() {
        return _ref2.apply(this, arguments);
      }

      return getId;
    }()

    // get words

  }, {
    key: 'getWord',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var page, sText;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                page = this.page;
                _context3.next = 3;
                return page.goto('http://wufazhuce.com/one/' + this.id);

              case 3:
                _context3.prev = 3;
                _context3.next = 6;
                return page.$eval('.one-cita', function (el) {
                  var txt = el.innerText;
                  str = txt.replace(/^\s+|\s+$/g, '');
                  return str;
                });

              case 6:
                sText = _context3.sent;
                return _context3.abrupt('return', sText);

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](3);

                console.log('err:id=' + this.id + ',errmsg:' + _context3.t0);

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 10]]);
      }));

      function getWord() {
        return _ref3.apply(this, arguments);
      }

      return getWord;
    }()

    // get beautiful img

  }, {
    key: 'getImg',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _axios2.default.get('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN');

              case 3:
                data = _context4.sent;

                if (!(data.status === 200)) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt('return', data.data.images[0]);

              case 8:
                return _context4.abrupt('return');

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4['catch'](0);

                console.error(_context4.t0);

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 11]]);
      }));

      function getImg() {
        return _ref4.apply(this, arguments);
      }

      return getImg;
    }()

    // get weather

  }, {
    key: 'getWeather',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var data;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _axios2.default.get('http://t.weather.sojson.com/api/weather/city/' + this.city);

              case 3:
                data = _context5.sent;

                if (!(data.data.status === 200)) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt('return', data.data.data);

              case 8:
                return _context5.abrupt('return');

              case 9:
                _context5.next = 14;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5['catch'](0);

                console.error(_context5.t0);

              case 14:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 11]]);
      }));

      function getWeather() {
        return _ref5.apply(this, arguments);
      }

      return getWeather;
    }()

    // close browser

  }, {
    key: 'closeBrowser',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log('close browser');
                _context6.next = 3;
                return this.browser.close();

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function closeBrowser() {
        return _ref6.apply(this, arguments);
      }

      return closeBrowser;
    }()
  }]);

  return spider;
}();

exports.default = spider;