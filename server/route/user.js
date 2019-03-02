import {fetchArticle, getArticle} from '../controls/send';

const userRouter = require('koa-router')();

userRouter.get('/send', fetchArticle);

module.exports = userRouter;