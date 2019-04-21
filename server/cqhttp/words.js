import Axios from "axios";

// 群消息处理
export default class WordsDivid {
  constructor (context) {
    this.context = context
  }
  async init () {
      // 多重判断
      // 数据库设置
      // {
      //   word: '',
      //   reply: '',
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

      // 先不做模糊和特殊群体功能，后期再加
      
      await this.solveGroup()
  }

  async solveGroup () {
    if ((/^[\u5440][A-Za-z0-9_\-\u4e00-\u9fa5]+/).test(this.context) === true) {
      let url = encodeURI('http://127.0.0.1:7192/api/accept/view?context=' + this.context)
      let res = await Axios.get(url)
      if (res.data.status) {
        let data = res.data.data
        if (data.type === 0) {
          // 处理函数调用
          this.soleMethod(data)
        } else if (data.type === 1) {
          // 直接回复数据库内容
          return data.reply
        }
      }
    } else {
      await this.soleMethod()
    }
  }

  async soleMethod () {
    if (this.context === '开服查询姨妈') {
      let res = await getIsOpen('ping -c 4 121.14.64.155')
      return res
    }
    if (this.context.length === 3 && (/^[\u4e00-\u9fa5]{2}[\u5b8f]/).test(this.context) === true) {
      // 宏
      let url = encodeURI('http://127.0.0.1:7192/api/accept/hong?sect=' + this.context)
      let reply
      let res = await Axios.get(url)
      if (res.data.status) {
        reply = this.context + '\n' + res.data.data.qixue + '\n' + res.data.data.hong
        console.log(reply)
      } else {
        reply = '请输入正确心法'
      }
      return reply
    }
    if (this.context.length === 1 && (/^[\u8089]/).test(this.context) === true) {
      let roll = Math.ceil(Math.random()*100)
      let reply = '你roll到了' + roll + '点。'
      return reply
    }
  }

  // 获取开服查询
  async getIsOpen (ele) {
    const { stdout, stderr } = await exec(ele)
    if (stderr) {
      console.error(`error: ${stderr}`)
      return '未开服'
    } else {
      console.log(`Number of files ${stdout}`)
      return '已开服'
    }
  }
}
// 私聊消息处理