'use strict';

var infoRouter = require('./info');
var router = require('koa-router')();

router.use('/api/info', infoRouter.routes());

module.exports = router;