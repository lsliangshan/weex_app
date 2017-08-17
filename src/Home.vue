<template>
  <div class="home">
    <!--<text @click="navigateTo('/pages/Login.js')">Home</text>-->
    <!--<app-header :data-state="state" data-title="新闻" :data-show-user-container="true"></app-header>-->
    <scroller class="home-scroller" offset-accuracy="10" @loadmore="loadMore" :style="{height: (state.platform == 'web' ? (state.device.height) / state.device.dpr : (750 / state.device.width * state.device.height)) + 'px'}">
      <!--<list class="joke-items">-->
      <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
        <text class="indicator">刷新中 ...</text>
      </refresh>
      <div class="cell joke-item" v-for="(item, index) in allJokes" @click="itemClickHandler">
        <!--<text>{{item.content}}</text>-->
        <text class="joke-text" v-for="(c, idx) in item.content.split('<br>')">{{c.trim()}}</text>
        <div class="user-info">
          <text class="joke-time">{{item.time}}</text>
          <div class="user-container">
            <text class="user-name">{{item.username}}</text>
            <image class="user-avatar" :src="item.icon" resize="cover" @click="showImage"></image>
          </div>
        </div>
      </div>
      <!--</list>-->
      <!--<loading class="loading" @loading="onloading" :display="showLoading">-->
        <!--<text class="indicator">加载中 ...</text>-->
      <!--</loading>-->
    </scroller>

  </div>
</template>

<style scoped>
  .home {
    width: 750px;
    /*align-items: center;*/
    /*justify-content: center;*/
    /*background-color: #a986ff;*/
  }
  .header {

  }
  .joke-item {
    min-height: 150px;
    padding: 30px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #f5f5f5;
  }
  .joke-item:active {
    background-color: #f5f5f5;
  }
  .joke-text {
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
//  import * as types from './store/mutation-types'
  import { fetch } from './store/fetch'
//  import STORE from './store'

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
        currentPage: 1,
        allJokes: []
      }
    },
    computed: {
      state () {
        return (env.platform.toLowerCase() === 'web' ? this.$store.state : global.store._vm._data.$$state)
      }
    },
    methods: {
      onrefresh (event) {
        const that = this
        this.refreshing = true
        this.refreshPage(function (res) {
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
        this.loadPage(this.currentPage, function (res) {
          modal.toast({ message: '已经加载', duration: 1 })
          that.showLoading = false
        })
      },
      loadPage (page, callback) {
        const that = this
        fetch({
          url: this.state.baseRequestUrl + 'fetchBuDeJie?page=' + page,
          callback: function (res) {
            if (Number(res.data.code) === 200) {
              that.currentPage = page + 1
              that.allJokes = that.allJokes.concat(res.data.data.list)
            }
            callback && callback(res)
          }
        })
      },
      refreshPage (callback) {
        const that = this
        fetch({
          url: this.state.baseRequestUrl + 'fetchBuDeJie?page=1',
          callback: function (res) {
            if (Number(res.data.code) === 200) {
              that.currentPage = 2
              that.allJokes = res.data.data.list
            }
            callback && callback(res)
          }
        })
      },
      itemClickHandler () {
        console.log('item click handler')
      },
      showImage (path) {
        console.log('.....')
      }
    },
    mounted () {
      this.loadPage(this.currentPage)
    },
    components: {
//      AppHeader
//      ,
//      Html
    }
  }
</script>
