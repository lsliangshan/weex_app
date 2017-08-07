<template>
  <div class="tabB">
    <!--<text @click="navigateTo('/pages/Login.js')">Home</text>-->
    <!--<app-header :data-state="state" data-title="新闻" :data-show-user-container="true"></app-header>-->
    <scroller class="home-scroller" offset-accuracy="10" :style="{height: (state.platform == 'web' ? (state.device.height - 120 - 88) / state.device.dpr : (750 / state.device.width * state.device.height - 120 - 88)) + 'px'}">
      <!--<list class="joke-items">-->
      <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
        <text class="indicator">刷新中 ...</text>
      </refresh>
      <div class="cell news-item" v-for="(item, index) in allNews" :key="item.group_id">
        <news-item :item="item" :type="item.hasOwnProperty('image_list') ? 1 : 0"></news-item>
        <!--<text>{{item.title}}</text>-->
        <!--<text class="news-text" v-for="(c, idx) in item.content.split('<br>')">{{c.trim()}}</text>-->
        <!--<div class="user-info">-->
          <!--<text class="news-time">{{item.time}}</text>-->
          <!--<div class="user-container">-->
            <!--<text class="user-name">{{item.username}}</text>-->
            <!--<image class="user-avatar" :src="item.icon" resize="cover"></image>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </scroller>

  </div>
</template>

<style scoped>
  .tabB {
    width: 750px;
    overflow: hidden;
  }
  .news-item {
    min-height: 150px;
    padding: 30px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #f5f5f5;
  }
  .news-item:active {
    background-color: #f5f5f5;
  }
  .news-text {
    color: #282828;
    font-size: 28px;
    line-height: 42px;
  }
  .user-info {
    /*width: 750px;*/
    height: 96px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
  .joke-time {
    font-size: 24px;
    color: #888888;
  }
  .user-container {
    flex-direction: row;
    align-items: center;
  }
  .user-avatar {
    width: 96px;
    height: 96px;
    border-radius: 48px;
    border-width: 1px;
    border-style: solid;
    border-color: #e5e5e5;
  }
  .user-name {
    font-size: 24px;
    color: #666666;
  }
  .loading {
    justify-content: center;
  }
  .refresh {
    justify-content: center;
  }
  .indicator {
    width: 750px;
    color: #888888;
    font-size: 28px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
</style>

<script>
  import * as types from '../store/mutation-types'
  import { fetch } from '../store/fetch'
  //  import STORE from './store'

  import NewsItem from '../parts/NewsItem.vue'

  //  import AppHeader from './parts/AppHeader.vue'

  //  import Html from './components/html.bak.vue'

  //  const animation = weex.requireModule('animation')
  //  const dom = weex.requireModule('dom')
  var modal = weex.requireModule('modal')
  var navigator = weex.requireModule('navigator')
  const env = weex.config.env || WXEnvironment
  export default {
    data () {
      return {
        refreshing: false,
        showLoading: false,
        nextTimeStamp: 0,
        allNews: [],
        groupIds: []
      }
    },
    computed: {
      state () {
        return (env.platform.toLowerCase() === 'web' ? this.$store.state : global.store._vm._data.$$state)
      }
    },
    methods: {
      deDuplication (d) {
        let data = JSON.parse(JSON.stringify(d))
        for (let i = 0; i < data.length; i++) {
          if (this.groupIds.indexOf(data[i].group_id) > -1) {
            data.splice(i, 1)
            i--
          }
        }
        return data
      },
      onrefresh (event) {
        const that = this
        this.refreshing = true
        this.loadPage(this.nextTimeStamp, function (res) {
          modal.toast({
            message: '已经刷新',
            duration: 1
          })
          that.refreshing = false
        })
      },
      loadMore (event) {
        const that = this
        this.showLoading = 'show'
        this.loadPage(this.nextTimeStamp, function (res) {
          modal.toast({ message: '已经加载', duration: 1 })
          that.showLoading = false
        })
      },
      loadPage (ts, callback) {
        const that = this
        fetch({
          url: this.state.baseRequestUrl + 'fetchTouTiao?min_behot_time=' + ts,
          callback: function (res) {
            console.log('>>>>>>>>.', res)
            if (Number(res.data.code) === 200) {
              that.nextTimeStamp = res.data.data.data[0].behot_time
              that.allNews = res.data.data.data.concat(that.allNews)
              console.log('....3333..', that.deDuplication(res.data.data.data))
            }
            callback && callback(res)
          }
        })
      },
      refreshPage (callback) {
        const that = this
        fetch({
          url: this.state.baseRequestUrl + 'fetchTouTiao?min_behot_time=0',
          callback: function (res) {
            if (Number(res.data.code) === 200) {
              that.nextTimeStamp = res.data.data.data[0].behot_time
              that.allNews = res.data.data.data.concat(that.allNews)
            }
            callback && callback(res)
          }
        })
      }
    },
    mounted () {
      this.loadPage(this.nextTimeStamp)
    },
    components: {
      NewsItem
//      AppHeader
//      ,
//      Html
    }
  }
</script>
