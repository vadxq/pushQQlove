'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInfoList = exports.saveInfo = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('../mongo/schema/info');
var Info = _mongoose2.default.model('Info');

// 添加文章(admin)
var saveInfo = exports.saveInfo = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    var body, info, saveInfo;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(ctx.state);
            body = ctx.request.body;
            info = new Info(body);
            _context.next = 5;
            return info.save();

          case 5:
            saveInfo = _context.sent;


            if (saveInfo) {
              ctx.body = {
                status: 1,
                msg: saveInfo
              };
            } else {
              console.log(changeInfo);
              ctx.body = {
                status: 0
              };
            };

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function saveInfo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// 获取列表
var getInfoList = exports.getInfoList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
    var info;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(spiderMsg);
            _context2.next = 3;
            return Info.find({
              dele: false
            }, {
              _id: 1,
              channel: 1,
              createtime: 1,
              content: 1,
              img: 1
            });

          case 3:
            info = _context2.sent;

            console.log(info);

            if (info.length) {
              ctx.body = {
                status: 1,
                info: info
              };
            } else {
              ctx.body = {
                status: 0
              };
            };

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getInfoList(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();