const hacknews = require('../controls/hacknews')

const hacknewsRouter = require('koa-router')();

hacknewsRouter
  .get('/:id', hacknews.getList);

module.exports = hacknewsRouter;