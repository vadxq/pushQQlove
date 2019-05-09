const hacknewsRouter = require('./hacknews');
const router = require('koa-router')();

router.use('/hacknews', hacknewsRouter.routes());

module.exports = router;