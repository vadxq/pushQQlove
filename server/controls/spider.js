import puppeteer from 'puppeteer';
// import request from 'request';


export default class spider {
  constructor() {
    this.init();
  }

  async init() {
    console.log('start browser');
    this.browser = await puppeteer.launch();
    console.log('start new page');
    this.page = await this.browser.newPage();
    await this.getWord(2367);
  }

  // get page id
  async getId() {
    
  }

  // get words
  async getWord(id) {
    let page = this.page;
    await page.goto(`http://wufazhuce.com/one/${id}`);
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
      console.log(`err:id=${id},errmsg:${err}`)
    }
  }

  async getImg() {

  }

  async getWeather() {

  }

  // close browser
  async closeBrowser() {
    console.log('close browser');
    await this.browser.close();
  }
}