
import axios from 'axios';

export default class getItnews {
  constructor() {
    this.data = '早日科技新闻\n'
    // this.init();
  }

  async init() {
    let list = await this.getItnewsList()
    if (list) {
      for (let i = 0; i < list.length; i++) {
        // this.data.push(list[i].title)
        if (list[i].lapinid) {
        } else {
          this.data += `${list[i].title}\n`
        }
      }
      // console.log(this.data)
      return this.data
    }
  }

  // get Hacknews list
  async getItnewsList () {
    try {
      // let data = await axios.get(`https://o.go2yd.com/open-api/sample/channel?appid=beHVtAOPwVoppZTmjcmD5Qaz&timestamp=1557510409&nonce=39534&secretkey=9f047c2a6f2a05ade876a51bbe56d868b6bf1324&channel=%E7%A7%91%E6%8A%80`)
      let data = await axios.get('https://api.ithome.com/json/newslist/news?r=0')
      // console.log(data.data)
      if (data.status === 200) {
        let res = data.data.newslist
        if (res) {
          return res
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
}