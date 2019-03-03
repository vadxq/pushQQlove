'use strict';

var _info = require('../controls/info');

var infoRouter = require('koa-router')();

infoRouter.get('/', _info.getInfoList).post('/', _info.saveInfo);

module.exports = infoRouter;