import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jxsigninSchema = new Schema({
  createtime: { // 创建时间
    type: Date,
    default: Date.now()
  },
  context: String, // 内容
  roll: {
    type: String, // rol状态
    default: '0'
  },
  group_id: Number, // 群hao
  user_id: Number, // QQ号
  boom: {
    type: Number,
    default: 0
  }, // xiuwei
  day: String, // 最后签到日期 auto
  dele: {
    type: Boolean, // 删除状态
    default: false
  }
});

jxsigninSchema.pre('save', function (next) {
  let nowDate = new Date()
  this.day = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`
  next()
})

jxsigninSchema.pre('update', function () {
  if (this.roll) {
  } else {
    let nowDate = new Date()
    this.day = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`
  }
  next()
});

mongoose.model('Jxsignin', jxsigninSchema);