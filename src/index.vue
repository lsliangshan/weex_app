<template>
  <div class="wrapper" :style="{height: (state.platform=='web'?((state.device.height - 120 - 88) / state.device.dpr):(750 / state.device.width * state.device.height)) + 'px'}">
    <app-header :data-state="state" data-title="新闻" :data-show-user-container="true"></app-header>
    <div @androidback="back" class="view-container" :style="{height: (state.platform=='web'?((state.device.height - 120 - 88) / state.device.dpr):(750 / state.device.width * state.device.height - 120 - 88)) + 'px'}">
      <router-view style="flex: 1;"></router-view>
    </div>
    <div class="global-tabbar">
      <tabbar :tabItems="state.tabItems" :selected-color="state.appHeader.theme" @tabBarOnClick="tabBarOnClick"></tabbar>
    </div>
  </div>
</template>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  .wrapper {  }
  .view-container {
    /*position: absolute;*/
    /*top: 120px;*/
    /*width: 750px;*/
    /*margin-top: 5px;*/
    /*margin-top: 2px;*/
    left: 0;
  }
  .global-tabbar {
    /*position: fixed;*/
    /*left: 0;*/
    /*bottom: 0;*/
    /*margin-top: 5px;*/
    /*width: 750px;*/
    /*height: 88px;*/
    background-color: lightgray;
  }
</style>

<script>
  import AppHeader from './parts/AppHeader.vue'
  import Tabbar from './components/tabbar.vue'
//  import STORE from './store'
  const env = weex.config.env || WXEnvironment
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')
  export default {
    data () {
      return {
        logoUrl: 'http://img1.vued.vanthink.cn/vued08aa73a9ab65dcbd360ec54659ada97c.png',
        target: 'World3'
      }
    },
    computed: {
      state () {
        return (env.platform.toLowerCase() === 'web' ? this.$store.state : global.store._vm._data.$$state)
      }
    },
    methods: {
      back: function () {
        this.$router.back()
      },
      tabTo (to) {
        if (this.$router) {
          this.$router.push(to)
        } else {
          let router = require('./router')
          router.push(to)
        }
      },
      tabBarOnClick (e) {
        console.log('切换tab: ', e)
        this.tabTo(e.src)
      }
    },
    components: {
      AppHeader,
      Tabbar
    }
  }
</script>