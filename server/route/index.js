const viewRouter = require('./view');
const router = require('koa-router')();

router.use('/api/view', viewRouter.routes());

module.exports = router;