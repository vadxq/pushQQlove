import { getInfoList } from '../controls/info';

const infoRouter = require('koa-router')();

infoRouter.get('/', getInfoList);

module.exports = infoRouter;