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
    let nowDate = getLocalTime(8)
    let today = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`
    if (today == data.day) {
      let getListDatail = await getList(body.group_id, body.user_id)
      if (getListDatail) {
        ctx.body = {
          status: 1,
          data: `[CQ:at,qq=${body.user_id}]你今天已经修炼过啦，当前修为值${data.boom}，本群排名第${getListDatail}位`
        }
      } else {
        ctx.body = {
          status: 0,
          data: '查询失败'
        }
      }
    } else {
      // 签到获取
      let newboom = await getSign(+data.roll, data.context)
      body.boom = data.boom + newboom.num
      body.context += newboom.context
      body.day = today
      let res = await postSign(body)
      if (res.status) {
        ctx.body = {
          status: 1,
          data: `[CQ:at,qq=${body.user_id}]${newboom.context}修为值达到：${data.boom += newboom.num}`
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
    let newboom = await getSign(0, '')
    let nowDate = getLocalTime(8)
    let today = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`

    body.boom = newboom.num
    body.context = newboom.context
    body.day = today

    const info = new Jxsignin(body)
    const saveInfo = await info.save();

    if (saveInfo) {
      ctx.body = {
        status: 1,
        data: `[CQ:at,qq=${body.user_id}]${newboom.context}修为值达到：${newboom.num}`
      };
    } else {
      // console.log(changeInfo);
      ctx.body = {
        status: 0,
        data: '签到失败'
      };
    };
  }
}

export const getQunList = async (ctx, next) => {
  const body = ctx.request.body;
  let data = await Jxsignin.find({group_id: body.group_id}).sort({boom: -1})
  console.log(data)
  if (data.length) {
    // data.
    let topdata = data.slice(0, 5)
    let top = '本群前五名分别是：'
    topdata.map((e,i)=>{
      if (e.card) {
        top += `\n${i + 1}.${e.card},修为：${e.boom}`
      } else {
        top += `\n${i + 1}.[CQ:at,qq=${e.user_id}],修为：${e.boom}`
      }
    })
    ctx.body = {
      status: 1,
      data: top
    };
  } else {
    ctx.body = {
      status: 0,
      data: '查询失败'
    };
  }
}

// 随机增加
const getSign = (roll) => {
  // 签到获取
  let newroll = Math.ceil(Math.random()*100)
  let getroll = Math.abs(newroll - roll)
  let newboom = {
    num: 120 + roll,
    context: '你的修为增加了120。'
  }
  newboom.num += Math.ceil(Math.random()*10)
  newboom.context = `你的修为增加了${newboom.num}。`
  if(getroll === 0) {
    newboom = {
      num: newboom.num += 200,
      context: newboom.context += '由于你最近的roll点数运气，触发了《醉生梦死》奇遇，修为额外增加了200。'
    }
  } else if (getroll === 47) {
    newboom = {
      num: newboom.num += 300,
      context: newboom.context += '由于你最近的roll点数运气，触发了《生死判》奇遇，修为额外增加了300。'
    }
  } else if (getroll === 66) {
    newboom = {
      num: newboom.num += 500,
      context: newboom.context += '由于你最近的roll点数运气，触发了《阴阳两界》奇遇，修为额外增加了500。'
    }
  } else if (getroll === 23) {
    newboom = {
      num: newboom.num += 230,
      context: newboom.context += '由于你最近的roll点数运气，触发了《雪山恩仇》奇遇，修为额外增加了230。'
    }
  } else if (getroll === 45) {
    newboom = {
      num: newboom.num += 450,
      context: newboom.context += '由于你最近的roll点数运气，触发了《乱世舞姬》奇遇，修为额外增加了450。'
    }
  } else if (getroll === 13) {
    newboom = {
      num: newboom.num += 130,
      context: newboom.context += '由于你最近的roll点数运气，触发了《少年行》奇遇，修为额外增加了130。'
    }
  } else if (getroll === 51) {
    newboom = {
      num: newboom.num += 510,
      context: newboom.context += '由于你最近的roll点数运气，触发了《天涯无归》奇遇，修为额外增加了510。'
    }
  } else if (getroll === 34) {
    newboom = {
      num: newboom.num += 340,
      context: newboom.context += '由于你最近的roll点数运气，触发了《护佑苍生》奇遇，修为额外增加了340。'
    }
  } else if (getroll === 33) {
    newboom = {
      num: newboom.num += 330,
      context: newboom.context += '由于你最近的roll点数运气，触发了《三山四海》奇遇，修为额外增加了330。'
    }
  } else if (getroll === 7) {
    newboom = {
      num: newboom.num += 470,
      context: newboom.context += '由于你最近的roll点数运气，触发了《茶馆奇缘》奇遇，修为额外增加了470。'
    }
  }
  
  // console.log(newboom + 'getSign')
  return newboom
}

// 修改
const postSign = async (newboom) => {
  let data = await Jxsignin.findOneAndUpdate({user_id: newboom.user_id, group_id: newboom.group_id}, {$set: {
    boom: newboom.boom,
    context: newboom.context,
    day: newboom.day,
    card: newboom.card
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
  console.log(data)
  if (data.length) {
    // data.
    let index = data.findIndex(function (x) {
      return x.user_id === user_id
    })
    return index += 1
  } else {
    return false
  }
}

// 修改roll值
export const postRoll = async (ctx, next) => {
  const body = ctx.request.body;
  let data = await Jxsignin.findOneAndUpdate({user_id: body.user_id, group_id: body.group_id}, {$set: {
    roll: body.roll
  }}, {multi: false});
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

const getLocalTime = function (i) {
  if (typeof i !== 'number') return;
  var d = new Date();
  //得到1970年一月一日到现在的秒数
  var len = d.getTime();
  //本地时间与GMT时间的时间偏移差
  var offset = d.getTimezoneOffset() * 60000;
  //得到现在的格林尼治时间
  var utcTime = len + offset;
  return new Date(utcTime + 3600000 * i);
}