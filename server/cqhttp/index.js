const CQHttp = require('cqhttp');
const axios = require('axios');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// 获取开服查询
const getIsOpen = async (ele) => {
  const { stdout, stderr } = await exec(ele);
  if (stderr) {
    console.error(`error: ${stderr}`);
    return '未开服'
  } else {
    console.log(`Number of files ${stdout}`);
    return '已开服'
  }
};

const bot = new CQHttp({
  apiRoot: 'http://127.0.0.1:7187/'
});

bot.on('message', async context => {
  console.log(context)
  if (context.post_type === 'message' && context.message_type === 'group') {
    if (context.message === '开服查询姨妈') {
      let res = await getIsOpen('ping -c 4 121.14.64.155')
      bot('send_group_msg_async', {
        group_id: context.group_id,
        message: res
      }).catch(err => { });
    }
    if (context.message.length === 3 && (/^[\u4e00-\u9fa5]{2}[\u5b8f]/).test(context.message) === true) {
      // 宏
      
      let reply = '请输入正确心法'
      let res = await axios(`http://0.0.0.0:7192/api/accept?sect=${context.message}`)
      if (res) {
        reply = context.message + '\n' + res.qixue + '\n' + res.hong
      }
      bot('send_group_msg_async', {
        group_id: context.group_id,
        message: reply
      }).catch(err => {});
    }
  }
  if (context.post_type === 'message' && context.message_type === 'private') {
    bot('send_msg', {
      ...context,
      message: '哈喽～'
    });
  }
});

bot.on('notice', async context => {
  if (context.notice_type === 'group_increase') {
      // 处理群成员添加事件
      bot('get_group_member_info', {
          group_id: context.group_id,
          user_id: context.user_id
      }).then(data => {
          const name = data.nickname || '新人';
          bot('send_group_msg_async', {
              group_id: context.group_id,
              message: `欢迎${name}～`
          }).catch(err => { });
      }).catch(err => {
          console.log(err);
      });
  }
  // 忽略其它事件
});

bot.listen(7185);