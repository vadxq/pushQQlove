import { addHong, getHong } from '../controls/jx3';
import { addJxview, getJxview } from '../controls/jxall/jxview'

const acceptRouter = require('koa-router')();

acceptRouter
  .get('/hong', getHong)
  .post('/hong', addHong)
  .get('/view', getJxview)
  .post('/view', addJxview);

module.exports = acceptRouter;