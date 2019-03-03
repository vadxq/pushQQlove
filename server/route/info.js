import { getInfoList, saveInfo } from '../controls/info';

const infoRouter = require('koa-router')();

infoRouter
  .get('/', getInfoList)
  .post('/', saveInfo);

module.exports = infoRouter;