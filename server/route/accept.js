import { addHong, getHong } from '../controls/jx3';

const acceptRouter = require('koa-router')();

acceptRouter
  .get('/hong', getHong)
  .post('/hong', addHong);

module.exports = acceptRouter;