const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const routes = require('./route')

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(json());

router.use('', routes.routes());

app
.use(router.routes())
.use(router.allowedMethods());

app.listen(7180)

console.log(`app run in 7180`)