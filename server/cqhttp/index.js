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
        message: 'hi~小可爱\n你可以随意加机器人去你们想要玩的群哟，完全免费，具体可以去定制功能页面https://qq.vadxq.com查看。\n如果觉得好玩，有能力的参与捐赠，记得留名哟嘻嘻(捐赠功能也在那个页面)\n这个最初版(v1.0.0)是为了给情缘缘推送每日早安天气的，后来发展成群功能了，后续会增加更多有趣功能\n在这感谢我最最最可爱的缘缘~'
      });
    } else if (context.message_type === 'group') {
      let wordsDivid = new WordsDivid(context.message, context.user_id, context.group_id, context.sender.card)
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
              message: `欢迎${name}来到酒馆亲友帮~帮会yy523700，可以来yy领个马甲~欢迎常来唠嗑哟~`
            }).catch(err => { });
          } else if (context.group_id === 335604283) {
            bot('send_group_msg_async', {
              group_id: context.group_id,
              message: `欢迎[CQ:at,qq=${context.user_id}]来到南昌大学新生总群~记得改备注哦：未录取新生群备注：年份-省份/文理-昵称，录取新生群备注：年份-专业-昵称，在校生群备注：年份-专业-昵称。改完备注后请仔细阅读群文件，或者是和机器人交互，群内发送消息：呀南昌大学答疑。还有不懂可以提问。祝水群愉快！`
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