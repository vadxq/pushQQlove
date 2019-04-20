import Axios from "axios";

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
      //   isOne: 0 // 特殊群体回复
      //   toWho: [
          //    {
          //      isGroup:
          //      users: []
          //    }
          //  ]
      // }
      // 模糊搜索,查询出多个结果的话，再做选择，先处理0，然后根据type优先匹配完全匹配
      // 没有的话，模糊匹配，最先匹配到跳出，
      
      

    }
  }

  async solveGroup () {
    let url = encodeURI('http://127.0.0.1:7192/api/accept/view?content=' + this.context.message)
    let res = await Axios.get(url)
    if (res.data.status) {
      let arr = res.data.data
      arr.map(e => {
        if (e.type === 0) {
          // 调用函数（主要是开服查询）
        } else if (e.type === 1) {

        }
      })
    }
  }
}
// 私聊消息处理