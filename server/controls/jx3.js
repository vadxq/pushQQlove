const util = require('util');
const exec = util.promisify(require('child_process').exec);
import mongoose from 'mongoose';
require('../mongo/schema/jxhong');
const Jxhong = mongoose.model('Jxhong');

// 获取开服查询
export const getIsOpen = async (ele) => {
    const { stdout, stderr } = await exec(ele);
    if (stderr) {
      console.error(`error: ${stderr}`);
      return 0
    } else {
      console.log(`Number of files ${stdout}`);
      return 1
    }
    
  // let hosts = 'ping 121.14.64.155'
};

// 获取宏
export const getHong = async (ele) => {
  let data = await Jxhong.findOne({sect: ele, dele: false})
  if (data) {
    return {
      status: 1,
      data: data
    }
  } else {
    return {
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
        let res = await getIsOpen('ping 121.14.64.155')
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