// 群消息处理
export default class WordsDivid {
  constructor (context) {
    this.context = context
  }
  init () {
    if (this.context.message_type === 'group') {
      // 多重判断
      // 数据库设置
      // {
      //   word: '',
      //   replay: '',
      //   type: 1// 1,完全匹配直接回复 0，调用函数，2.模糊匹配
      // }
      

    }
  }

  async solveGroup () {

  }
}
// 私聊消息处理