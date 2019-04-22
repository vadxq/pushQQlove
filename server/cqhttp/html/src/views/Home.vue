<template>
  <section class="home">
    <div class="container is-fulld">
      <div class="notification">
        This is a project about <strong>PQQL</strong> with nodejs.
      </div>
      <!-- Main container -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              Now <strong>{{ total }}</strong> posts
            </p>
          </div>
          <!-- <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="Find a post">
              </p>
              <p class="control">
                <button class="button">
                  Search
                </button>
              </p>
            </div>
          </div> -->
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item"><a class="button is-success" @click="changeShow('#newPostModel')">New Post</a></p>
        </div>
      </nav>

      <section>
        <nav class="panel">
          <p class="panel-heading " >
            All Posts
          </p>
          <!-- <p class="panel-tabs">
            <a class="is-active">all</a>
            <a>public</a>
            <a>private</a>
            <a>sources</a>
            <a>forks</a>
          </p> -->
          <a class="panel-block" v-for="(item, key) in data" :key="key" :id=item._id @click="openDetail(item)">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            {{item.context}}
          </a>
          <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth">
              More posts
            </button>
          </div>
        </nav>
      </section>
    </div>

    <!-- Model -->
    <div class="modal" id="newPostModel">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add new</p>
          <button class="delete" aria-label="close" @click="changeShow('#newPostModel')"></button>
        </header>
        <section class="modal-card-body">
          

          <div class="field">
            <label class="label">选择前缀类别</label>
            <div class="control">
              <div class="select">
                <select v-model="msg.front">
                  <option v-for="(item, key) in lb" :key=key>{{item}}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">关键词</label>
            <div class="control">
              <input class="input" v-model="msg.end" type="text" placeholder="Text input">
            </div>
            <p class="small">最终关键词：{{msg.front + msg.end}}</p>
          </div>

          <div class="field">
            <label class="label">Message</label>
            <div class="control">
              <textarea class="textarea" v-model="msg.reply" placeholder="Textarea"></textarea>
            </div>
            <p class="small">请使用\n换行</p>
          </div>

          <div class="field">
            <label class="label">你的昵称/江湖称号（游戏id）</label>
            <div class="control">
              <input class="input" v-model="msg.username" type="text" placeholder="Text input">
            </div>
          </div>

          <div class="field">
            <label class="label">你的qq号</label>
            <div class="control">
              <input class="input" type="text" v-model="msg.userid" placeholder="Text input">
            </div>
          </div>
          <div>
            <p>说明：</p>
            <p></p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="postMsg()">Save</button>
          <button class="button" @click="changeShow('#newPostModel')">Cancel</button>
        </footer>
      </div>
    </div>

    <div class="modal" id="detailModel">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{activeItem.context}}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              {{activeItem.reply}}
              <br>
              <!-- <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
              提供者：{{activeItem.username}}
            </div>
          </div>
          <footer class="card-footer">
            <!-- <a href="#" class="card-footer-item">Save</a>
            <a href="#" class="card-footer-item">Edit</a> -->
            <a href="#" class="card-footer-item" @click="changeShow('#detailModel')">close</a>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      total: 0,
      data: [
        {
            "createtime": "2019-04-21T20:44:20.164Z",
            "check": true,
            "dele": false,
            "_id": "5cbd78b207f3eb476754d754",
            "context": "呀婉言是谁",
            "reply": "曾经是个七秀，现在是个猪萝",
            "type": 1,
            "__v": 0
        },
        {
            "createtime": "2019-04-21T20:44:20.164Z",
            "check": true,
            "dele": false,
            "_id": "5cbcd7f307f3eb476754d752",
            "context": "呀玺臣是谁",
            "reply": "咕咕咕~咕咕咕~",
            "type": 1,
            "__v": 0
        },
        {
            "createtime": "2019-04-21T20:44:20.164Z",
            "check": true,
            "dele": false,
            "_id": "5cbcd76007f3eb476754d751",
            "context": "呀奇遇平生心愿",
            "reply": "奇遇平生心愿\n触发方式\n1.抄书\n2.读碑\n无CD，无前置条件\n奖励：监本",
            "type": 1,
            "__v": 0
        }
      ],
      page: 0,
      pagecontext: '呀',
      activeItem: {},
      lb: [
        '呀',
        '呀奇遇',
        '呀吃鸡',
        '呀配装',
        '呀外观'
      ],
      msg: {
        front: null,
        end: null,
        reply: null,
        username: null,
        userid: null
      }
    }
  },
  methods: {
    changeShow (e) {
      let ele = document.querySelector(e)
      if (ele.style.display !== 'block') {
        ele.style.display = 'block'
      } else {
        ele.style.display = 'none'
      }
    },
    async getTotal () {
      this.total = await axios.get('/api/accept/totalview')
    },
    async getMoreList () {
      let url = encodeURI(`/api/accept/allview?page=${this.page}&context=${this.pagecontext}`)
      let res = await axios.get(url)
      if (res.data.status) {
        this.page += 1
        this.data.push(res.data.data)
      }
    },
    async openDetail(e) {
      this.activeItem = e
      let ele = document.querySelector('#detailModel')
      if (ele.style.display !== 'block') {
        ele.style.display = 'block'
      } else {
        ele.style.display = 'none'
      }
    },
    async postMsg () {
      let postdata = {
        context: this.msg.front + msg.end, // 内容
        reply: this.msg.reply, // 回复
        type: 1, // 1,完全匹配
        username: this.msg.username,
        userid: this.msg.userid, // QQ号
      }
      let res = await axios.post('/api/accept/view', postdata)
      if (res.data.status) {
        this.changeShow('#newPostModel')
        this.page = 0
        this.data = []
        this.getMoreList()
      }
    }
  },
  created() {
    this.getMoreList()
  },
}
</script>

<style scoped>
#detailModel .modal-card, #detailModel .modal-content {
  width: 100%;
  margin: 3vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
#detailModel .card {
  width: 90%;
}

#newPostModel .modal-card, #newPostModel .modal-content {
  width: 100%;
  margin: 3vh 0;
  display: flex;
}
</style>
