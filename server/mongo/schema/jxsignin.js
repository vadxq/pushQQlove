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
  let month = nowDate.getMonth + 1
  let year = nowDate.getFullYear
  let day = nowDate.getDate()
  this.day =  year + '-' + month + '-' + day
  next()
})

jxsigninSchema.pre('update', function () {
  if (this.roll) {
  } else {
    let nowDate = new Date()
    let month = nowDate.getMonth + 1
    let year = nowDate.getFullYear
    let day = nowDate.getDate()
    this.day =  year + '-' + month + '-' + day
  }
  next()
});

mongoose.model('Jxsignin', jxsigninSchema);