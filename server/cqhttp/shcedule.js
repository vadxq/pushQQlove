import timingTask from '../controls/jxall/isTime'
import getBirth from '../controls/code/birth'
import schedule from 'node-schedule'
import axios from 'axios'
import getItnews from '../controls/code/itnews'

// 定时任务
export default class scheduleTime {
  constructor () {
    // this.init()
  }

  async init () {
    this.gongfan()
    this.postHackTime()
    this.postBirth()
    this.postItnews()
    this.postLastDay()
    this.postBirthday()
    // this.postDrinkWater()
  }

  async gongfan () {
    let timings = new timingTask('[CQ:at,all]马上就要开始攻防排队了哟~~攻防小指南请看酒馆宏哟~~', 436976635)
    schedule.scheduleJob('16 20 19 * * 2,4', () => {
      timings.postMsg()
    })

    schedule.scheduleJob('16 50 17 * * 6,7', () => {
      timings.postMsg()
    })

    schedule.scheduleJob('16 50 11 * * 6,7', () => {
      timings.postMsg()
    })

    // schedule.scheduleJob('16 50 11 * * 6,7', () => {
    //   timings.postMsg()
    // })
  }

  async postHackTime () {
    schedule.scheduleJob('10 30 10 * * *', () => {
      this.postHacknews('newstories')
    })
    schedule.scheduleJob('59 30 22 * * *', () => {
      this.postHacknews('topstories')
    })
  }

  async postBirth () {
    let getBirthList = new getBirth()
    let data = await getBirthList.init()
    schedule.scheduleJob('11 00 00 * * *', () => {
      let bdata = ''
      if (data) {
        for (let i = 0; i < data.length; i++) {
          bdata += data[i].truename;
        }
        if (bdata) {
          let timings = new timingTask(bdata, 451189169)
          timings.postMsg()
        }
      }
    })
  }

  async postItnews () {
    let getItnewsList = new getItnews()
    let data = await getItnewsList.init()
    schedule.scheduleJob('11 00 08 * * *', () => {
      console.log(data)
      let timings = new timingTask(data, 451189169)
      timings.postMsg()
    })
  }

  async postHacknews (x) {
    let url = encodeURI('https://proxy.imissu.top/hacknews/' + x)
    let res = await axios.get(url)

    
    // console.log(res)
    if (res.status) {
      let hacknewdata = res.data

      // 生成短链接
      for (let i = 0; i < hacknewdata.length; i++) {
        let res = await axios.post('https://t.vadxq.com', {long_url: hacknewdata[i].url})
        if (res.data) {
          hacknewdata[i].url = 'https://t.vadxq.com/' + res.data.msg.short_url
        }
      }

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

  async postLastDay () {
    let arrayList = [
      {
        time: '11 00 09 12 5 *',
        context: '今天是耿一琪拍毕业照的时间啦！让我们一起祝福她~一琪同学，毕业快乐哟~'
      },
      {
        time: '11 00 09 21 5 *',
        context: '今天是丛铭钰同学拍毕业照的时间啦！让我们一起祝福她~铭钰同学，毕业快乐哟~'
      },
      {
        time: '11 00 09 23 5 *',
        context: '今天是马英东同学拍毕业照的时间啦！让我们一起祝福她~英东同学，毕业快乐哟~'
      },
      {
        time: '16 00 09 23 5 *',
        context: '今天是陈苏佳同学拍毕业照的时间啦！让我们一起祝福她~苏佳同学，毕业快乐哟~'
      },
      {
        time: '20 00 09 23 5 *',
        context: '今天是周舟同学拍毕业照的时间啦！让我们一起祝福她~舟同学，毕业快乐哟~'
      },
      {
        time: '11 00 09 27 5 *',
        context: '今天是马英东同学拍毕业照的时间啦！让我们一起祝福她~英东同学，毕业快乐哟~'
      }
    ]
    for (let i = 0; i < arrayList.length; i++) {
      const ele = arrayList[i]
      schedule.scheduleJob(ele.time, () => {
        let timings = new timingTask(ele.context, 1026792589)
        timings.postMsg()
      })
    }
  }

  async postDrinkWater () {
    let arrayList = [
      {
        time: '11 00 10 * * *',
        context: '大家好，我是本群的提醒喝水小助手。希望此刻看到消息的人可以和我一-起来喝一杯水。及时排便洗手，记得关门。十一点的我继续提醒大家喝水，和我一起成为一天八杯水的人吧!'
      },
      {
        time: '11 00 11 * * *',
        context: '大家好，我是本群的提醒喝水小助手。希望此刻看到消息的人可以和我一-起来喝一杯水。及时排便洗手，记得关门。十二点的我继续提醒大家喝水，和我一起成为一天八杯水的人吧!'
      },
      {
        time: '16 00 12 * * *',
        context: '大家好，我是本群的提醒喝水小助手。希望此刻看到消息的人可以和我一-起来喝一杯水。及时排便洗手，记得关门。十四点的我继续提醒大家喝水，和我一起成为一天八杯水的人吧!'
      },
      {
        time: '20 00 14 * * *',
        context: '大家好，我是本群的提醒喝水小助手。希望此刻看到消息的人可以和我一-起来喝一杯水。及时排便洗手，记得关门。十五点的我继续提醒大家喝水，和我一起成为一天八杯水的人吧!'
      },
      {
        time: '11 00 15 * * *',
        context: '大家好，我是本群的提醒喝水小助手。希望此刻看到消息的人可以和我一-起来喝一杯水。及时排便洗手，记得关门。十六点的我继续提醒大家喝水，和我一起成为一天八杯水的人吧!'
      },
      {
        time: '11 00 16 * * *',
        context: '大家好，我是本群的提醒喝水小助手。希望此刻看到消息的人可以和我一-起来喝一杯水。及时排便洗手，记得关门。十七点的我继续提醒大家喝水，和我一起成为一天八杯水的人吧!'
      },
      {
        time: '11 00 17 * * *',
        context: '大家好，我是本群的提醒喝水小助手。希望此刻看到消息的人可以和我一-起来喝一杯水。及时排便洗手，记得关门。十八点的我继续提醒大家喝水，和我一起成为一天八杯水的人吧!'
      },
      {
        time: '11 00 18 * * *',
        context: '大家好，我是本群的提醒喝水小助手。希望此刻看到消息的人可以和我一-起来喝一杯水。及时排便洗手，记得关门。明天十点的我继续提醒大家喝水，和我一起成为一天八杯水的人吧!'
      }
    ]
    for (let i = 0; i < arrayList.length; i++) {
      const ele = arrayList[i]
      schedule.scheduleJob(ele.time, () => {
        let timings = new timingTask(ele.context, 894815833)
        timings.postMsg()
      })
    }
  }

  async postBirthday () {
    let data = '祝福一位美丽迷人、聪明大方、成熟端庄，又备受赞叹的妙人儿，我家的小缘缘，生日快乐~时光易逝，江湖路远，祝你365天，天天快乐幸福~越来越年轻漂亮！'
    schedule.scheduleJob('11 00 00 16 5 *', () => {
      let timings = new timingTask(data, 851970427)
      timings.postMsg()
    })
  }
}