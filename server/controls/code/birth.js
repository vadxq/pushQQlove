import axios from 'axios';

export default class getBirth {
  constructor() {
    this.username = ' '
    // this.init();
  }

  async init() {
    let list = await this.getBirthList()
    console.log(list)
    if (list) {
      for (let i = 0; i < list.length; i++) {
        this.username = this.username + list[i].truename + ' '
      }
      console.log(this.username)
      if (this.username!== ' ') {
        let reply = `今天是家园人${this.username}破壳诞生之日，让我们一起为他们庆祝！生日快乐~`
        return reply
      }
    }
  }

  // get Hacknews list
  async getBirthList () {
    try {
      let data = await axios.get(`https://us.ncuhomer.cn/api/user/birth`)
      if (data.status === 200) {
        let res = data.data
        if (res) {
          return res
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
}