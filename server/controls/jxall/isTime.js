import axios from 'axios'
// 排队定时任务
export default class timingTask {
  constructor(data, group_id) {
    this.data = data
    this.group_id = group_id
    this.msg
  }

  async postMsg () {
    try {
      this.msg = {
        type: 'text',
        data: {
          text: this.data
        }
      }
      console.log(this.msg)
      await axios.post(`http://0.0.0.0:7187/send_group_msg`, {
        group_id: this.group_id,
        message: this.msg,
        auto_escape: false
      })
    } catch (error) {
      console.error(error)
    }
  }
}

