import timingTask from '../controls/jxall/isTime'
import getBirth from '../controls/code/birth'
import schedule from 'node-schedule'
import axios from 'axios'

// 定时任务
export default class scheduleTime {
  constructor () {
    // this.init()
  }

  async init () {
    this.gongfan()
    this.postHackTime()
  }

  async gongfan () {
    let timings = new timingTask('马上就要开始攻防排队了哟~~', 436976635)
    schedule.scheduleJob('16 20 19 * * 2,4', () => {
      timings.postMsg()
    })

    schedule.scheduleJob('16 50 17 * * 6,7', () => {
      timings.postMsg()
    })

    schedule.scheduleJob('16 50 11 * * 6,7', () => {
      timings.postMsg()
    })

    schedule.scheduleJob('16 50 11 * * 6,7', () => {
      timings.postMsg()
    })
  }

  async postHackTime () {
    schedule.scheduleJob('10 25 07 * * *', () => {
      this.postHacknews('newstories')
    })
    schedule.scheduleJob('59 30 22 * * *', () => {
      this.postHacknews('topstories')
    })
  }

  async postBirth () {
    let getBirthList = new getBirth()
    schedule.scheduleJob('01 01 00 * * *', () => {
      let data = getBirthList().init()
      let timings = new timingTask(data, 894815833)
      timings.postMsg()
    })
  }

  async postHacknews (x) {
    let url = encodeURI('https://proxy.imissu.top/hacknews/' + x)
    let res = await axios.get(url)
    // console.log(res)
    if (res.status) {
      let hacknewdata = res.data
      let data = ''
      let date = new Date()
      let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      hacknewdata.map(x => {
        data += `\n${x.title} by ${x.by}\n ${x.url}\n`
      })
      console.log('postHacknews')
      data = `Hack News ${x} ${time}\n` + data
      console.log(data)
      let timings = new timingTask(data, 894815833)
      timings.postMsg()
    }
  }
}