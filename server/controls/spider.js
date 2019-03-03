import axios from 'axios';
import dayComputed from './day';
import cheerio from 'cheerio';

export default class spider {
  constructor(city) {
    this.id
    this.city = city
    // this.init();
  }

  async init() {
    await this.getId();
    let word = await this.getWord();
    let weather = await this.getWeather()
    let img = await this.getImg();
    this.closeBrowser()
    let data = {
      word,
      img,
      weather
    }
    console.log(data)
    return data
  }

  // get page id
  async getId() {
    let day = new dayComputed('2019-3-1')
    this.id = day.fn() + 2366
  }

  // get words
  async getWord() {
    try {
      // get word
      let page = await axios(`http://wufazhuce.com/one/${this.id}`)
      let ele = await cheerio('.one-cita', page.data).text()
      str = ele.replace(/^\s+|\s+$/g, '')
      console.log(str)
      return str
    } catch (err) {
      console.log(`err:id=${this.id},errmsg:${err}`)
    }
  }

  // get beautiful img
  async getImg() {
    try {
      let data = await axios.get(`https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN`)
      if (data.status === 200) {
        // console.log(`https://www.bing.com/${data.data.images[0].url}`, data.data.images[0].copyright)
        return data.data.images[0]
      } else {
        return 
      }
    } catch (error) {
      console.error(error)
    }
  }

  // get weather
  async getWeather() {
    // china weather city code,not name
    try {
      let data = await axios.get(`http://t.weather.sojson.com/api/weather/city/${this.city}`)
      if (data.data.status === 200) {
        return data.data.data
      } else {
        return 
      }
    } catch (error) {
      console.error(error)
    }
  }
}