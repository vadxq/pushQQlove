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
      let wordsDivid = new WordsDivid(context.message, context.user_id, context.group_id)
      let reply = await wordsDivid.init()
      // console.log(context)
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

bot.on('request', context => {
  if (context.request_type === 'group') {
      // 处理加群请求
      if (context.sub_type === 'invite') {
        bot('set_group_add_request', {
          flag: context.flag,
          sub_type: 'invite',
          approve: true
        }).catch(err => { });
      }
  }
  if (context.request_type === 'friend') {
    // 处理加好友请求
    bot('set_friend_add_request', {
      flag: context.flag,
      approve: true
    }).catch(err => { });
  }
  // 忽略其它类型的请求
});

bot.listen(7185);