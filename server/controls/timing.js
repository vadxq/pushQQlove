import spider from './spider';
import dayComputed from './day';
import axios from 'axios';
import { group_id, user_id } from '../config/index'

// 定时任务
export default class timingTask {
  constructor() {
    this.spiderMsg
    // this.init()
  }

  async init () {
    await this.getSpiderMsg()
    let msg = await this.getContent()
    // console.log('111')
    await this.postMsg(msg)
  }

  
  // good morning
  async postMsg (msg) {
    try {
      let data = await axios.post(`http://0.0.0.0:7187/send_group_msg`, {
        group_id: group_id,
        message: msg,
        auto_escape: false
      })
      // let data = await axios.post(`http://0.0.0.0:7187/send_private_msg`, {
      //   user_id: user_id,
      //   message: msg,
      //   auto_escape: false
      // })
      console.log(data.data)
      if (data.status === 200) {
        let data = {
          content: msg[0].data.text,
          img: msg[1].data.file
        }
        let mongodata = await axios.post('http://127.0.0.1:7192/api/info', data)
        console.log(mongodata)
      } else {
        return 
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 获取爬虫数据
  async getSpiderMsg () {
    // 城市编码，按照国家的来
    let spiders = new spider(101190901)
    this.spiderMsg = await spiders.init()
  }

  async getContent () {
    // let time = new Date().getFullYear
    let day = new dayComputed('2018-8-31')
    return [
      {
        type: 'text',
        data: {
          text: `早呀！缘缘~\n
          今天是${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日.
          我已经想了你${day.fn()}天。\n
          缘缘，此刻外面温度为${this.spiderMsg.weather.wendu}°，${this.spiderMsg.weather.ganmao},
          今天${this.spiderMsg.weather.forecast[0].high},${this.spiderMsg.weather.forecast[0].low},
          湿度${this.spiderMsg.weather.shidu},
          PM2.5: ${this.spiderMsg.weather.pm25},空气质量: ${this.spiderMsg.weather.quality},
          ${this.spiderMsg.weather.forecast[0].notice}。\n
          今日语录：${this.spiderMsg.word}
          `
        }
      },
      // {
      //   type: 'text',
      //   data: {
      //     text: `
      //     缘缘，此刻外面温度为${this.spiderMsg.weather.wendu}°，${this.spiderMsg.weather.ganmao},
      //     今天${this.spiderMsg.weather.forecast[0].high},${this.spiderMsg.weather.forecast[0].low},
      //     湿度${this.spiderMsg.weather.shidu},
      //     PM2.5${this.spiderMsg.weather.pm25},空气质量${this.spiderMsg.weather.quality},
      //     ${this.spiderMsg.weather.forecast[0].notice}。`
      //   }
      // },
      {
        type: 'image',
        data: {
          file: `https://www.big.com${this.spiderMsg.img.url}`
        }
      }
      // },
      // {
      //   type: 'text',
      //   data: {
      //     text: this.spiderMsg.word
      //   }
      // }
    ]
  }
}

