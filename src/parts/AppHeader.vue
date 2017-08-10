<template>
  <div class="app-header-container" :style="{'background-color': state.appHeader.theme}">
    <text class="app-header" :style="{'color': state.appHeader.color}">{{dataTitle || state.appHeader.title}}</text>
    <div class="nav-back-container" v-if="canGoBack" @click="back">
      <image class="nav-back" src="http://static.dei2.com/imgs/icon-back.png" resize="cover"></image>
    </div>
    <div class="geolocation-container" v-else-if="dataShowLocation || state.geolocation.shown" @click="showPopup">
      <text class="location-text">{{state.geolocation.city || '全国'}}</text>
      <image class="arrow-down" src="http://static.dei2.com/app/arrow_down.png" v-if="state.geolocation.finished" resize="cover"></image>
      <image class="arrow-down" src="http://static.dei2.com/app/loading.gif" v-if="!state.geolocation.finished" resize="cover"></image>
    </div>
    <div class="user-container" v-if="dataShowUserContainer">
      <div class="has-login" v-if="state.isLogin" @click="navigateTo('/pages/Profile.js')">
        <image :src="state.userInfo.icon" class="user-icon" resize="cover"></image>
        <text class="has-login-text user-name">{{state.userInfo.nickname}}</text>
      </div>
      <div class="has-not-login" v-if="!state.isLogin" @click="navigateTo('/pages/Login.js')">
        <text class="user-login">登录/注册</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-header-container {
    height: 120px;
    width: 750px;
    justify-content: flex-end;
  }
  .app-header {
    text-align: center;
    height: 80px;
    line-height: 80px;
  }
  .nav-back-container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 80px;
    height: 80px;
    align-items: center;
    justify-content: center;
  }
  .nav-back {
    width: 48px;
    height: 48px;
    pointer-events: none;
  }
  .geolocation-container {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 80px;
    padding-left: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .location-text {
    color: #ffffff;
    font-size: 28px;
  }
  .arrow-down {
    width: 32px;
    height: 32px;
    margin-left: 10px;
  }
  .user-container {
    position: absolute;
    right: 0;
    bottom: 0;
    /*width: 200px;*/
    height: 80px;
    align-items: flex-end;
    padding-right: 30px;
  }
  .has-login {
    flex-direction: row;
  }
  .user-name {
    line-height: 80px;
    margin-left: 20px;
    color: #ffffff;
  }
  .user-icon {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
    border-radius: 40px;
  }
  .user-login {
    line-height: 80px;
    color: #ffffff;
  }
</style>

<script>
//  import STORE from '../store'
//  import amap from 'vue-amap'
  import * as types from '../store/mutation-types'
  import { fetch } from '../store/fetch'
  const env = weex.config.env || WXEnvironment
  const weexNavigator = weex.requireModule('navigator')

  export default {
    props: ['dataState', 'dataTitle', 'dataCanGoBack', 'dataShowUserContainer', 'dataShowLocation'],
    data () {
      return {
//        state: this.dataState || this.$store.state
        pos: [116.487, 40.00003]
      }
    },
    computed: {
      state () {
        return (env.platform.toLowerCase() === 'web' ? this.$store.state : global.store._vm._data.$$state)
      },
      canGoBack () {
        if (this.$route) {
          return !this.$route.fullPath.match(/^\/tab[A-Z]*/)
        } else {
          return this.dataCanGoBack
        }
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
    mounted () {
      this.location()
    },
    methods: {
      back () {
        if (this.$router) {
          this.$router.back()
        } else {
          if (this.state.platform.toLowerCase() !== 'web') {
            weexNavigator.pop({
              animated: "true"
            }, event => {
            })
          }
        }
      },
      navigateTo (to) {
        if (this.state.platform.toLowerCase() === 'web') {
          if (this.$router) {
            this.$router.push(to.replace(/.*\/([a-zA-Z0-9_-]*)\.js$/,'$1').toLowerCase())
          }
        } else {
          weexNavigator.push({
            url: weex.config.bundleUrl.replace(/^(.*bundlejs).*$/, '$1') + to,
            animated: "true"
          }, event => {
          })
        }
      },
      getLocationCity (opts) {
        fetch({
          url: 'http://talkapi.dei2.com/index/getCityInfoByLatLng?lat=' + opts.lat + '&lng=' + opts.lng,
          callback: function (res) {
            opts.callback && opts.callback(res)
          }
        })
      },
      location () {
        const that = this
        // 定位
        this.STORE.commit(types.START_LOCATION)

        if (env.platform.toLowerCase() === 'web') {
          let geolocation = new BMap.Geolocation()
          geolocation.getCurrentPosition(function (r) {
            that.getLocationCity({
              lat: r.point.lat,
              lng: r.point.lng,
              callback: function (res) {
                let _data = JSON.parse(res.data.data)
                if (Number(_data.StatusCode) === 200) {
                  that.STORE.commit(types.SET_LOCATION, {
                    finished: true,
                    lat: r.point.lat,
                    lng: r.point.lng,
                    city: _data.cityname
                  })
                }
              }
            })
          })
        } else {
          const Nat = require('natjs')
          Nat.geolocation.get((err, ret) => {
            that.getLocationCity({
              lat: ret.latitude,
              lng: ret.longitude,
              callback: function (res) {
                let _data = JSON.parse(res.data.data)
                if (Number(_data.StatusCode) === 200) {
                  that.STORE.commit(types.SET_LOCATION, {
                    finished: true,
                    lat: ret.latitude,
                    lng: ret.longitude,
                    city: _data.cityname
                  })
                }
              }
            })
          })
        }
      },
      showPopup () {
//        let STORE
//        if (env.platform.toLowerCase() === 'web') {
//          STORE = this.$store
//        } else {
//          STORE = global.store
//        }
        this.STORE.commit(types.SHOW_POPUP, {
          title: '选择城市',
          type: 1
        })
      },
      hidePopup () {
//        let STORE
//        if (env.platform.toLowerCase() === 'web') {
//          STORE = this.$store
//        } else {
//          STORE = global.store
//        }
        this.STORE.commit(types.HIDE_POPUP)
      }
    }
  }
</script>
