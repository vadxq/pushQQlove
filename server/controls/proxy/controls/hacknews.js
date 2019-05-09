// get 
const axios = require('axios')

//getone
const getOne = async(x) => {
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
// get list
const getHacknewsList = async (x) => {
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

exports.getList = async (ctx, next) => {
  const x = ctx.params
  let list = await getHacknewsList(x.id)
  let dataList = []
  for (let i = 0; i < list.length; i++) {
    let data = await getOne(list[i])
    dataList.push(data)
  }
  ctx.body = dataList
}
