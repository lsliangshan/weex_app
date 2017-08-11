<template>
  <div class="wrapper" :style="{height: (state.platform=='web'?((state.device.height - 120 - 88) / state.device.dpr):(750 / state.device.width * state.device.height)) + 'px'}">
    <app-header :data-state="state" v-if="!state.startPage.shown" :data-show-user-container="true"></app-header>
    <div @androidback="back" v-if="!state.startPage.shown" class="view-container" :style="{height: (state.platform=='web'?((state.device.height - 120 - 88) / state.device.dpr):(750 / state.device.width * state.device.height - 120 - 88)) + 'px'}">
      <router-view style="flex: 1;"></router-view>
    </div>
    <div class="global-tabbar" v-if="!state.startPage.shown">
      <tabbar :tabItems="state.tabItems" :unselected-color="'#aaaaaa'" :selected-color="state.appHeader.theme" @tabBarOnClick="tabBarOnClick"></tabbar>
    </div>
    <transition name="popup-transition"
                @before-enter="beforeEnter"
                @enter="enter"
                :css="false"
    >
      <popup ref="globalPopup" v-if="state.popup.shown">
      </popup>
    </transition>
    <transition
            name="start-page-transition"
            @before-enter="beforeEnterStartPage"
            @enter="enterStartPage"
            :css="false"
    >
      <start-page ref="startPage" v-if="state.startPage.shown"></start-page>
    </transition>
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
  import Popup from './components/Popup.vue'
  import StartPage from './pages/StartPage.vue'
  import * as types from './store/mutation-types'
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
      },
      STORE () {
        let _store
        if (env.platform.toLowerCase() === 'web') {
          _store = this.$store
        } else {
          _store = global.store
        }
        return _store
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
      beforeEnter (el) {
        if (this.state && this.state.platform === 'web') {
          el.style.position = 'fixed'
          el.style.transform = 'translate(0, 3000px)'
          el.style.transformOrigin = 'center top'
          el.style.transition = 'all .8s cubic-bezier(0.215, 0.610, 0.355, 1.000)'
        }
      },
      enter (el, done) {
        if (this.state && this.state.platform === 'web') {
          el.style.transform = 'translate(0, 0)'
          done()
        } else {
          animation.transition(el, {
            styles: {
              transform: 'translate(0, 3000px)',
              transformOrigin: 'center top'
            },
            duration: 1,
            timingFunction: 'linear',
            delay: 0
          }, function () {
            console.log('entered333333:', el)
            animation.transition(el, {
              styles: {
                transform: 'translate(0, 0)',
                transformOrigin: 'center top'
              },
              duration: 600,
              timingFunction: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
              delay: 0
            }, done)
          })
        }
      },
      beforeEnterStartPage (el) {
        if (this.state && this.state.platform === 'web') {
          el.style.position = 'fixed'
          el.style.opacity = 0
          el.style.transition = 'all .8s cubic-bezier(0.215, 0.610, 0.355, 1.000)'
        }
      },
      enterStartPage (el, done) {
        if (this.state && this.state.platform === 'web') {
          el.style.transform = 1
          done()
        } else {
          animation.transition(el, {
            styles: {
              opacity: 0
            },
            duration: 1,
            timingFunction: 'linear',
            delay: 1000
          }, function () {
            animation.transition(el, {
              styles: {
                opacity: 1
              },
              duration: 600,
              timingFunction: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
              delay: 0
            }, done)
          })
        }
      },
      tabBarOnClick (e) {
        this.STORE.commit(types.SET_HEADER_TITLE, {
          title: e.title
        })
        this.tabTo(e.src)
      }
    },
    components: {
      AppHeader,
      Tabbar,
      Popup,
      StartPage
    }
  }
</script>