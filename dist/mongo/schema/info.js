'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var infoSchema = new Schema({
  createtime: { // 创建时间
    type: Date,
    default: Date.now()
  },
  channel: String, // 发送频道
  content: String, // 内容
  img: String, // 图片
  dele: {
    type: Boolean, // 删除状态
    default: false
  }
});

_mongoose2.default.model('Info', infoSchema);