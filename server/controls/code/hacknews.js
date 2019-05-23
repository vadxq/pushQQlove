import axios from 'axios';

export default class hacknews {
  constructor() {
    this.data = []
    // this.init();
  }

  async init(x) {
    let list = await this.getHacknewsList(x)
    for (let i = 0; i < list.length; i++) {
      let data = await this.getOne(list[i])
      this.data.push(data)
    }
    return this.data
  }

  async getOne (x) {
    let res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${x}.json?print=pretty`)
    if (res.status === 200) {
      return {
        id: res.data.id,
        title: res.data.title,
        url: res.data.url,
        time: res.data.time,
        type: res.data.type,
        by: res.data.by
      }
    }
  }

  // get Hacknews list
  async getHacknewsList (x) {
    try {
      let data = await axios.get(`https://hacker-news.firebaseio.com/v0/${x}.json?print=pretty`)
      if (data.status === 200) {
        let res = data.data.slice(0, 7)
        // console.log(res)
        return res
      } else {
        return 
      }
    } catch (error) {
      console.error(error)
    }
  }
}