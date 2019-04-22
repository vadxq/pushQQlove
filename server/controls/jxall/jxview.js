import mongoose from 'mongoose';
require('../../mongo/schema/jxview');
const Jxview = mongoose.model('Jxview');

// 新增关键词
export const addJxview = async (ctx, next) => {
  const body = ctx.request.body;
  let data = await Jxview.findOne({context: body.context, dele: false, check: true})
  if (data) {
    ctx.body = {
      status: 0,
      data: '已存在'
    }
  } else {
    const info = new Jxview(body);
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

// 获取关键词
export const getJxview = async (ctx, next) => {
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

// 获取列表
export const getAllJxview = async (ctx, next) => {
  const ele = ctx.query
  let data = await Jxview
                    .find({context: {$regex: ele.context}})
                    .skip(ele.page * 7)
                    .limit(7)
                    .sort({'_id':-1})
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

// 获取总数
export const getTotalJxview = async (ctx, next) => {
  const ele = ctx.query
  let data = await Jxview.countDocuments({check: true, dele: false})
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
