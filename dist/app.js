'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _index = require('./config/index');

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _timing = require('./controls/timing');

var _timing2 = _interopRequireDefault(_timing);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// new timing()
var timings = new _timing2.default();
_nodeSchedule2.default.scheduleJob('59 59 * * * *', function () {
  timings.init();
});

// 定时睡觉
_nodeSchedule2.default.scheduleJob('10 30 * * * *', function () {
  timings.postMsg('缘缘，到点啦，该睡啦，晚安哟~~');
});

require('./mongo');

var app = new _koa2.default();
var router = new _koaRouter2.default();

app.use((0, _koaBodyparser2.default)());
app.use((0, _koaJson2.default)());

router.use('', _route2.default.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(_index.port);

console.log('app run in ' + _index.port);