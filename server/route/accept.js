import { postQQMsg, getHong } from '../controls/jx3';

const acceptRouter = require('koa-router')();

acceptRouter
  .get('/hong', getHong)
  .post('/', postQQMsg);

module.exports = acceptRouter;