import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { port } from './config/index';
import json from 'koa-json';
import routes from './route';

require('./mongo');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(json());

router.use('', routes.routes());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port)

console.log(`app run in ${port}`)