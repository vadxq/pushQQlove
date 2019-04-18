const util = require('util');
const exec = util.promisify(require('child_process').exec);
import mongoose from 'mongoose';
require('../mongo/schema/jxhong');
const Jxhong = mongoose.model('Jxhong');

// 新增宏
export const addHong = async (ctx, next) => {
  const body = ctx.request.body;
  const info = new Jxhong(body);
  const saveInfo = await info.save();

  if (saveInfo) {
    ctx.body = {
      status: 1,
      msg: saveInfo
    };
  } else {
    console.log(changeInfo);
    ctx.body = {
      status: 0
    };
  };
}

// 获取宏
export const getHong = async (ctx, next) => {
  const ele = ctx.query
  let data = await Jxhong.findOne({sect: ele.sect, dele: false})
  if (data) {
    ctx.body = {
      status: 1,
      data: data
    }
  } else {
    ctx.body = {
      status: 0
    }
  }
}

// 监听消息
export const postQQMsg = async (ctx, next) => {
  const body = ctx.request.body;
  console.log(body)
  if (body) {
    if (body.post_type === 'message' && body.message_type === 'group') {
      if (body.message === '开服查询姨妈') {
        let res = await getIsOpen('ping -c 4 121.14.64.155')
        let reply = '未开服'
        if (res) {
          reply = '已开服'
        }
        ctx.body = {
          reply: reply
        }
      } else if (body.message.length === 3 && (/^[\u4e00-\u9fa5]{2}[\u5b8f]/).test(body.message) === true) {
        // 宏
        let res = await getHong(body.message)
        let reply = '请输入正确心法'
        if (res) {
          reply = body.message + '\n' + res.qixue + '\n' + res.hong
        }
        ctx.body = {
          reply: '未查询到'
        }
      }
    }
  } else {
    ctx.body = null
  }
};