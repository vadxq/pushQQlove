import puppeteer from 'puppeteer';
import axios from 'axios';
import dayComputed from './day'

export default class spider {
  constructor(city) {
    this.id
    this.city = city
    this.init();
  }

  async init() {
    console.log('start browser');
    this.browser = await puppeteer.launch();
    console.log('start new page');
    this.page = await this.browser.newPage();
    await this.getId();
    let word = await this.getWord();
    let weather = await this.getWeather()
    let img = await this.getImg();
    this.closeBrowser()
    return {
      word,
      img,
      weather
    }
  }

  // get page id
  async getId() {
    let day = new dayComputed('2019-3-1')
    this.id = day.fn() + 2367
  }

  // get words
  async getWord() {
    let page = this.page;
    await page.goto(`http://wufazhuce.com/one/${this.id}`);
    try {
      // get word
      let sText = await page.$eval('.one-cita', el => {
        let txt = el.innerText
        str = txt.replace(/^\s+|\s+$/g, '')
        return str;
      });
     
      // save
      await console.log(sText)

    } catch (err) {
      console.log(`err:id=${this.id},errmsg:${err}`)
    }
  }

  // get beautiful img
  async getImg() {
    try {
      let data = await axios.get(`https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN`)
      if (data.status === 200) {
        console.log(`https://www.bing.com/${data.data.images[0].url}`, data.data.images[0].copyright)
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

  // close browser
  async closeBrowser() {
    console.log('close browser');
    await this.browser.close();
  }
}