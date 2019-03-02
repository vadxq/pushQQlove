import mongoose from 'mongoose';

const Schema = mongoose.Schema

const infoSchema = new Schema({
  createtime: { // 创建时间
    type: Date,
    default: Date.now()
  },
  channel: String, // 发送频道
  content: String, // 内容
  img: String, // 图片
  dele: {
    type: Boolean, // 删除状态
    default: false
  }
})

mongoose.model('Info', infoSchema);