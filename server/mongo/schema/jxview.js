import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jxviewSchema = new Schema({
  createtime: { // 创建时间
    type: Date,
    default: Date.now()
  },
  context: String, // 内容
  reply: String, // 回复
  isOne: String, // 特殊群体回复
  type: Number, // 1,完全匹配直接回复 0，调用函数，2.模糊匹配
  username: String,
  userid: Number, // QQ号
  check: { // 审核
    type: Boolean,
    default: false
  },
  dele: {
    type: Boolean, // 删除状态
    default: false
  }
  // toWho: [
  //   {
  //     isGroup:
  //     users: []
  //   }
  // ]
});

mongoose.model('Jxview', jxviewSchema);