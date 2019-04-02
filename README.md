# pushQQlove
weather and to remind of the time and others

#### dev 
npm start

#### build to es5
npm run build

#### serve
npm run serve

#### 功能
1. 计算纪念日天数
2. 爬取one一个每日语录
3. 获取心中的TA当地天气信息
4. 定时早安晚安
5. 发送qq消息问好，推送天气等信息

#### how to run 

1. 配置运行环境，本项目需要node v7.6.0+版本，mongodb数据库，pm2部署工具。

2. 进入目录，安装依赖
```
cd pushQQlove
npm i
```

#### 配置文件，(server/config/index.js)

```
// mongoose path
export const dbPath = '';

// server port
export const port = 7192;

// 群id
export const group_id = 851970427

// 个人id，需加好友
export const user_id = 862235971

```
dbPath: mongodb

port：项目运行端口

group_id: 需要发布消息的群号

user_id： 需要发布的对象qq号

#### 修改你需要定时提醒的服务(server/app.js)
```
// new timing()
let timings = new timingTask()
schedule.scheduleJob('16 58 06 * * *', () => {
  timings.init()
})

// 定时睡觉
schedule.scheduleJob('10 28 23 * * *', () => {
  timings.postMsg('缘缘，到点啦，该睡啦，晚安哟~~')
})

支持自定义文本内容，如上，第一个包含爬虫，可以自行编写代码。时间格式如下：
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

比如：``` 10 30 07 * * 1 ```表示在周一7：30：10时间发送。``` 10 30 07 * * * ```表示在每天7：30：10时间发送。

#### 关于酷Q api配置问题

本项目依赖酷Q的node-sdk进行qq发送消息，目前发现图片发送根据文档发送有所出路，正待解决。
可看官方文档 https://github.com/richardchien/cqhttp-node-sdk



#### 目录结构
```
pushQQlove/
   |
   ├──server/                * 主要代码目录
   │   │
   │   │──config             * 配置文件
   │   │
   │   │──controls/          * 业务逻辑主要代码
   │   │    │
   │   │    │──day           * 计算纪念日天数
   │   │    │
   │   │    │──info          * 用于保存项目和查询历史消息的api
   │   │    │
   │   │    │──spider        * 爬虫
   │   │    │
   │   │    └──timing        * 定时任务相关，包含发送qq消息相关
   │   │ 
   │   │──mongo/             * 数据库配置
   │   │ 
   │   │──route              * api路由
   │   │ 
   │   └──app                * 主入口文件
   │
   │──package.json           * 包信息
   │
   │──.babelrc               * Babel配置
   │
   └──.gitignore             * Git忽略文件配置
```

#### 配置无误后，本地运行
``` 
npm start 
```

服务器部署,需要先安装pm2
``` 
npm i -g pm2

// 直接运行编译
pm2 start 'npm start'

// 编译后运行
npm run build
cd dist
pm2 start app.js
```

#### 欢迎大家提出建议和意见，谢谢～

#### license：Apache Licens Version 2.0
