const infoRouter = require('./info');
const acceptRouter = require('./accept');
const router = require('koa-router')();

router.use('/api/info', infoRouter.routes());
router.use('/api/accept', acceptRouter.routes());

module.exports = router;