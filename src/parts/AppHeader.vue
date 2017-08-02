<template>
  <div class="app-header-container" :style="{'background-color': state.appHeader.theme}">
    <text class="app-header" :style="{'color': state.appHeader.color}">{{dataTitle || state.app.name}}</text>
    <div class="nav-back-container" v-if="canGoBack" @click="back">
      <image class="nav-back" src="http://static.dei2.com/imgs/icon-back.png" resize="cover"></image>
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
  import STORE from '../store'
const navigator = weex.requireModule('navigator')
  export default {
    props: ['dataState', 'dataTitle', 'dataCanGoBack', 'dataShowUserContainer'],
    data () {
      return {
//        state: this.dataState || this.$store.state
      }
    },
    computed: {
      state () {
        console.log('...........................')
        return STORE.state
      },
      canGoBack () {
        if (this.$route) {
          return !this.$route.fullPath.match(/^\/home/)
        } else {
          return this.dataCanGoBack
        }
      }
    },
//    created () {
//      console.log('In AppHeader: ', this.$store.state)
//      this.state = this.dataState || this.$store.state
//    },
    methods: {
      back () {
        if (this.$router) {
          this.$router.back()
        } else {
          if (this.state.platform.toLowerCase() !== 'web') {
            navigator.pop({
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
          navigator.push({
            url: weex.config.bundleUrl.replace(/^(.*bundlejs).*$/, '$1') + to,
            animated: "true"
          }, event => {
          })
        }
      }
    }
  }
</script>
