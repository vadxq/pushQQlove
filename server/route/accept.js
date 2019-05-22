import { addHong, getHong } from '../controls/jx3';
import {
  addJxview,
  getJxview,
  getAllJxview,
  getTotalJxview
} from '../controls/jxall/jxview'
import { addJxsignin, postRoll, getQunList } from '../controls/jxall/jxsignin'

const acceptRouter = require('koa-router')();

acceptRouter
  .get('/hong', getHong)
  .post('/hong', addHong)
  .get('/view', getJxview)
  .post('/view', addJxview)
  .get('/allview', getAllJxview)
  .get('/totalview', getTotalJxview)
  .post('/jxsignin', addJxsignin)
  .post('/jxsignroll', postRoll)
  .post('/jxsignlist', getQunList);

module.exports = acceptRouter;