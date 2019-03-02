import mongoose from 'mongoose';
require('../mongo/schema/info');
const Info = mongoose.model('Info');

// 添加文章(admin)
export const saveArticle = async (ctx, next) => {
    const body = ctx.request.body;
    const info = new Info(body);
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
};

// 获取列表
export const fetchArticle = async (ctx, next) => {
  const info = await Info.find({
    dele: false
  }, {
    _id: 1,
    channel: 1,
    createtime: 1,
    content: 1,
    img: 1
  });
  console.log(info)

  if (info.length) {
    ctx.body = {
      status: 1,
      info: info
    };
  } else {
    ctx.body = {
      status: 0
    };
  };
};
