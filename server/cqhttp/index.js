const CQHttp = require('cqhttp');
import WordsDivid from './words';
import scheduleTime from './shcedule'

let schedule = new scheduleTime()
schedule.init()

const bot = new CQHttp({
  apiRoot: 'http://127.0.0.1:7187/'
});

bot.on('message', async context => {
  if (context.post_type === 'message') {
    if (context.message_type === 'private') {
      bot('send_msg', {
        ...context,
        message: '哈喽～'
      });
    } else if (context.message_type === 'group') {
      let wordsDivid = new WordsDivid(context.message)
      let reply = await wordsDivid.init()
      console.log(context)
      bot('send_group_msg_async', {
        group_id: context.group_id,
        message: reply
      }).catch(err => {
        console.log(err)
      });
    }
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
          if (context.group_id === 436976635) {
            bot('send_group_msg_async', {
              group_id: context.group_id,
              message: `欢迎${name}来到酒馆亲友帮~帮会yy39043，可以来yy领个马甲~欢迎常来唠嗑哟~`
            }).catch(err => { });
          } else {
            bot('send_group_msg_async', {
                group_id: context.group_id,
                message: `欢迎${name}～`
            }).catch(err => { });
          }
      }).catch(err => {
          console.log(err);
      });
  }
  // 忽略其它事件
});

bot.listen(7185);