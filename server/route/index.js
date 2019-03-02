const infoRouter = require('./info');
const router = require('koa-router')();

router.use('/api/info', infoRouter.routes());

module.exports = router;