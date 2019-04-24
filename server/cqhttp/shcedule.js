import timingTask from '../controls/jxall/isTime'
import hackNews from '../controls/code/hacknews'
import schedule from 'node-schedule'

// 定时任务
export default class scheduleTime {
  constructor () {
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
    schedule.scheduleJob('10 01 04 * * *', () => {
      this.postHacknews('newstories')
    })
    schedule.scheduleJob('59 10 04 * * *', () => {
      this.postHacknews('topstories')
    })
  }

  async postHacknews (x) {
      let hacknews = new hackNews()
      let hacknewdata = await hacknews.init(x)
      let data = ''
      let date = new Date()
      let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      hacknewdata.map(x => {
        data += `\n${x.title} by ${x.by}\n ${x.url}\n`
      })
      data = `Hack News ${x} ${time}\n` + data
      let timings = new timingTask(data, 894815833)
      timings.postMsg()
  }
}