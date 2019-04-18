import { postQQMsg } from '../controls/jx3';

const acceptRouter = require('koa-router')();

acceptRouter
  .post('/', postQQMsg);

module.exports = acceptRouter;