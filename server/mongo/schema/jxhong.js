import mongoose from 'mongoose';

const Schema = mongoose.Schema

const jxhongSchema = new Schema({
  createtime: { // 创建时间
    type: Date,
    default: Date.now()
  },
  content: String, // 内容
  hong: String, // 宏
  qixue: String, // 奇穴
  sect: String, // 门派心法
  dele: {
    type: Boolean, // 删除状态
    default: false
  }
})

mongoose.model('Jxhong', jxhongSchema);