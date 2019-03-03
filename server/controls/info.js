import mongoose from 'mongoose';
require('../mongo/schema/info');
const Info = mongoose.model('Info');
import spider from './spider';
let spiders = new spider(101190901)
let spiderMsg = spiders.init()

// send msg
let content = `
`

// 添加文章(admin)
export const saveInfo = async (ctx, next) => {
  console.log(ctx.state)
  const body = ctx.state.infoMsg;
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
export const getInfoList = async (ctx, next) => {
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
