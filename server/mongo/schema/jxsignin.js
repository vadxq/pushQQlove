import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jxsigninSchema = new Schema({
  createtime: { // 创建时间
    type: Date,
    default: Date.now()
  },
  context: String, // 内容
  roll: String, // 回复
  group_id: Number, // 群hao
  user_id: Number, // QQ号
  boom: Number, // xiuwei
  day: String, // 最后签到天数
  dele: {
    type: Boolean, // 删除状态
    default: false
  }
});

mongoose.model('Jxsignin', jxsigninSchema);