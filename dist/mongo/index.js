'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.database = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('./schema/info');

var database = exports.database = function database() {
  _mongoose2.default.set('debug', true);

  _mongoose2.default.connect(_config.dbPath);

  _mongoose2.default.connection.on('disconnected', function () {
    _mongoose2.default.connect(_config.dbPath);
  });

  _mongoose2.default.connection.on('error', function (err) {
    return console.log(err);
  });

  _mongoose2.default.connection.on('open', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', console.log('mongo:', _config.dbPath));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
};

database();