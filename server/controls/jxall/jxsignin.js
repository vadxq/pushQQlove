import mongoose from 'mongoose';
require('../../mongo/schema/jxsignin');
const Jxsignin = mongoose.model('Jxsignin');

// 新增关键词
export const addJxsignin = async (ctx, next) => {
  const body = ctx.request.body;
  let data = await Jxsignin.findOne({user_id: body.user_id, dele: false, group_id: body.group_id})
  // 是否有记录
  if (data) {
    // 是，则看今天是否签到过
    let nowDate = new Date()
    let today = `${nowDate.getFullYear}-${nowDate.getMonth + 1}-${nowDate.getDate()}`
    if (today === data.day) {
      let getListDatail = await getList(data.group_id, data.user_id)
      if (getListDatail) {
        ctx.body = {
          status: 1,
          data: `[CQ:at,qq=${data.user_id}]你今天已经修炼过啦，当前修为值${data.boom},排名${getListDatail}位`
        }
      } else {
        ctx.body = {
          status: 0,
          data: '查询失败'
        }
      }
    } else {
      // 签到获取
      let newboom = await getSign(data.roll)
      body.boom = newboom.num
      body.context += newboom.context
      let res = await postSign(body)
      if (res.status) {
        ctx.body = {
          status: 1,
          data: `[CQ:at,qq=${data.user_id}]${newboom.context},修为值达到：${data.boom += newboom.num}`
        }
      } else {
        ctx.body = {
          status: 0,
          data: '签到失败'
        }
      }
    }
  } else {
    // 新增
    let newboom = await getSign()
    body.boom = newboom.num
    body.context = newboom.context

    const info = new Jxsignin(body)
    const saveInfo = await info.save();

    if (saveInfo) {
      ctx.body = {
        status: 1,
        data: `[CQ:at,qq=${body.user_id}]${newboom.context},修为值达到：${newboom.num}`
      };
    } else {
      console.log(changeInfo);
      ctx.body = {
        status: 0,
        data: '签到失败'
      };
    };
  }
}

// 随机增加
const getSign = (roll) => {
  // 签到获取
  let newroll = Math.ceil(Math.random()*100)
  let getroll = Math.abs(newroll - roll)
  let newboom = {
    num: 120,
    context: '你的修为增加了120。'
  }
  newboom.num += Math.ceil(Math.random()*10)
  newboom.context = `你的修为增加了${newboom.num}。`
  if(getroll === 0) {
    newboom = {
      num: newboom.num += 200,
      context: newboom.context += '由于你最近的roll点数运气，触发了《醉生梦死》奇遇，修为额外增加了200。'
    }
  } else if (getroll === 7) {
    newboom = {
      num: newboom.num += 300,
      context: newboom.context += '由于你最近的roll点数运气，触发了《生死判》奇遇，修为额外增加了300。'
    }
  } else if (getroll === 66) {
    newboom = {
      num: newboom.num += 500,
      context: newboom.context += '由于你最近的roll点数运气，触发了《阴阳两界》奇遇，修为额外增加了500。'
    }
  }
  console.log(newboom + 'getSign')
  return newboom
}

// 修改
const postSign = async (newboom) => {
  let data = await Jxsignin.findOneAndUpdate({user_id: newboom.user_id, group_id: newboom.group_id}, {$set: {
    boom: newboom.boom,
    context: newboom.context
  }}, {multi: false});
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

// get 排名
const getList = async (group_id, user_id) => {
  let data = await Jxsignin.find({group_id: group_id}).sort({boom: -1})
  console.log(data + 'paiming')
  if (data) {
    return data.indexOf(user_id) + 1
  } else {
    return false
  }
}