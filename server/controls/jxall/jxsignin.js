import mongoose from 'mongoose';
require('../../mongo/schema/jxsignin');
const Jxsignin = mongoose.model('Jxsignin');

// 新增关键词
export const addJxsignin = async (ctx, next) => {
  const body = ctx.request.body;
  let data = await Jxsignin.findOne({user_id: body.user_id, dele: false, group_id: body.group_id})
  if (data) {
    let nowDate = new Date()
    let today = `${nowDate.getFullYear}-${nowDate.getMonth + 1}-${nowDate.getDate()}`
    if (today === data.day) {
      let getListDatail = getList()
      if (getListDatail) {
        ctx.body = {
          status: 1,
          data: `[CQ:at,qq=${data.user_id}]你今天以及修炼过啦，当前修为值${data.boom},排名${getListDatail}位`
        }
      } else {
        ctx.body = {
          status: 0,
          data: '查询失败'
        }
      }
    }
    let newroll = Math.ceil(Math.random()*100)
    let getroll = Math.abs(newroll - data.roll)
    let newboom = {
      num: 0,
      data: ''
    }
    if(getroll === 0) {
      newboom = {
        num: 200,
        data: '由于你最近的roll点数运气，触发了《醉生梦死》奇遇，修为额外增加了200'
      }
    } else if (getroll === 7) {
      newboom = {
        num: 300,
        data: '由于你最近的roll点数运气，触发了《生死判》奇遇，修为额外增加了300'
      }
    } else if (getroll === 66) {
      newboom = {
        num: 500,
        data: '由于你最近的roll点数运气，触发了《阴阳两界》奇遇，修为额外增加了500'
      }
    }
    
    ctx.body = {
      status: 1,
      data: `[CQ:at,qq=${data.user_id}]修为增加`
    }
  } else {
    const info = new Jxsignin(body);
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
}

// 修改roll点
export const jxRoll = async (ctx, next) => {
  const ele = ctx.query
  let data = await Jxview.findOne({context: ele.context, dele: false, check: true})
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

// // 获取列表
// export const getAllJxview = async (ctx, next) => {
//   const ele = ctx.query
//   let data = await Jxview
//                     .find({context: {$regex: ele.context}})
//                     .skip(ele.page * 7)
//                     .limit(7)
//                     .sort({'_id':-1})
//   if (data) {
//     ctx.body = {
//       status: 1,
//       data: data
//     }
//   } else {
//     ctx.body = {
//       status: 0
//     }
//   }
// }

// // 获取总数
// export const getTotalJxview = async (ctx, next) => {
//   const ele = ctx.query
//   let data = await Jxview.countDocuments({check: true, dele: false})
//   if (data) {
//     ctx.body = {
//       status: 1,
//       data: data
//     }
//   } else {
//     ctx.body = {
//       status: 0
//     }
//   }
// }


// get 排名
const getList = async (group_id, user_id) => {
  let data = await Jxsignin.find({group_id: group_id}, {sort:{boom: -1 }})
  if (data) {
    return data.indexOf(user_id) + 1
  } else {
    return false
  }
}