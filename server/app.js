import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { port, time } from './config/index';
import json from 'koa-json';
import routes from './route';
import timingTask from './controls/timing';
import schedule from 'node-schedule';

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

// new timing()
let timings = new timingTask()
schedule.scheduleJob(time, () => {
  timings.init()
})

// 定时睡觉
schedule.scheduleJob('10 28 23 * * *', () => {
  timings.postMsg('缘缘，到点啦，该睡啦，晚安哟~~')
})