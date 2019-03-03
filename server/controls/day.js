export default class dayComputed {
  constructor (startDay, endDay) {
    // 格式 2019-3-1
    // 第一个参数必须传
    this.startDay = startDay
    this.endDay = endDay
    // this.fn()
  }
  fn () {
    // 计算函数
    console.log('day computed')
    let start = new Date(this.startDay.split('-')[0], this.startDay.split('-')[1] - 1, this.startDay.split('-')[2]).getTime()
    if (this.endDay) {
      let end = new Date(this.endDay.split('-')[0], this.endDay.split('-')[1] - 1, this.endDay.split('-')[2]).getTime()
      console.log((end - start)/(60*60*24*1000))
      return (end - start)/(60*60*24*1000)
    } else {
      let endDay = new Date()
      let end = new Date(endDay.getFullYear(), endDay.getMonth(), endDay.getDate()).getTime()
      console.log((end - start)/(60*60*24*1000))
      return (end - start)/(60*60*24*1000)
    }
  }
}
