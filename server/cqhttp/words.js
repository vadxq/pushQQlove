import Axios from "axios";
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// 群消息处理
export default class WordsDivid {
  constructor (context, user_id, group_id) {
    this.context = context
    this.user_id = user_id
    this.group_id = group_id
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
      
      let reply = await this.solveGroup()
      return reply
  }

  async solveGroup () {
    if ((/^[\u5440][A-Za-z0-9_\-\u4e00-\u9fa5]+/).test(this.context) === true) {
      let url = encodeURI('http://127.0.0.1:7192/api/accept/view?context=' + this.context)
      let res = await Axios.get(url)
      // console.log(res)
      if (res.data.status) {
        let data = res.data.data
        // console.log('data' + data)
        if (data.type === 0) {
          // 处理函数调用
          this.soleMethod(data)
        } else if (data.type === 1) {
          // 直接回复数据库内容
          return data.reply
        }
      }
    } else {
      let data = await this.soleMethod()
      return data
    }
  }

  async soleMethod () {
    if (this.context === '开服查询姨妈' || this.context === '开服查询' || this.context === '开服查询 斗转星移') {
      let res = await this.getIsOpen('ping -c 4 121.14.64.155')
      return res
    }
    if (this.context === '签到' || this.context === 'qd') {
      let res = await this.qdSovle()
      return res
    }
    if (this.context.length === 3 && (/^[\u4e00-\u9fa5]{2}[\u5b8f]/).test(this.context) === true) {
      // 宏
      let url = encodeURI('http://127.0.0.1:7192/api/accept/hong?sect=' + this.context)
      let reply
      let res = await Axios.get(url)
      if (res.data.status) {
        reply = this.context + '\n' + res.data.data.qixue + '\n' + res.data.data.hong
        // console.log(reply)
      } else {
        reply = '请输入正确心法'
      }
      return reply
    }
    if (this.context.length === 1 && (/^[\u8089]/).test(this.context) === true) {
      let roll = Math.ceil(Math.random()*100)
      let reply = `你roll到了${roll}点。\n[CQ:at,qq=${this.user_id}]`
      if (this.user_id === 862235971 | this.user_id === 1044689145) {
        reply = `你roll到了99点。\n[CQ:at,qq=${this.user_id}]`
      }
      let postdata = {
        roll: roll,
        user_id: this.user_id,
        group_id: this.group_id
      }
      Axios.post('http://127.0.0.1:7192/api/accept/jxsignroll', postdata)
      return reply
    }
    if (this.context.length > 2 && (/^[\u4e00-\u9fa5]+[\u5206\u6570]$/).test(this.context) === true) {
      let roll = Math.ceil(Math.random()*100)
      if (roll<60) {
        roll += 30
      }
      let reply = `恭喜你，你的考试${this.context}将获得${roll}分。\n[CQ:at,qq=${this.user_id}]`
      if (this.user_id === 862235971 | this.user_id === 1044689145) {
        reply = `恭喜你，你的考试${this.context}将获得99分。\n[CQ:at,qq=${this.user_id}]`
      }
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

  async qdSovle () {
    // sign in 签到
    console.log(this.user_id, this.group_id)
    // 修改roll点
    // 修改签到修为
    // 算法
    // 奇遇点在与相差点数
    
    // 特定群
    let qunarr = [
      335604283,
      451189169,
      894815833
    ]
    // 设置允许时间

    if (qunarr.includes(this.group_id)) {
      let time = new Date().getHours()
      if (time > 22 || time < 9) {
        let postData = {
          user_id: this.user_id,
          group_id: this.group_id
        }
        let res = await Axios.post(`http://127.0.0.1:7192/api/accept/jxsignin`, postData)
        if (res.data.status) {
          console.log(res.data+ 'qdsovle')
          return res.data.data
        }
      }
    } else {
      let postData = {
        user_id: this.user_id,
        group_id: this.group_id
      }
      let res = await Axios.post(`http://127.0.0.1:7192/api/accept/jxsignin`, postData)
      if (res.data.status) {
        console.log(res.data+ 'qdsovle')
        return res.data.data
      }
    }
  }
}
// 私聊消息处理