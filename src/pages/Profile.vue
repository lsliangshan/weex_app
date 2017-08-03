<template>
  <div class="profile-container">
    <app-header :data-state="state" data-title="我" :data-can-go-back="true" :data-show-user-container="false"></app-header>
    <div class="profile-main" :style="{height: (state.platform=='web'?((state.device.height - 120) / state.device.dpr):(750 / state.device.width * state.device.height)) + 'px'}">
      <div class="user-info-container">
        <div class="user-icon">
          <image class="avatar" :src="state.userInfo.icon" resize="cover"></image>
        </div>
        <div class="user-info">
          <div>
            <text class="user-name">{{state.userInfo.nickname}}</text>
          </div>
          <div>
            <text class="user-phonenum">手机号：{{state.userInfo.phonenum}}</text>
          </div>
        </div>
      </div>

      <div class="logout-container" @click="logout">
        <text class="logout">退出登录</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .profile-container {
    width: 750px;
    background-color: #f5f5f5;
  }
  .profile-main {
  }
  .user-info-container {
    width: 750px;
    margin-top: 30px;
    padding: 30px;
    background-color: #ffffff;
    flex-direction: row;
  }
  .avatar {
    width: 128px;
    height: 128px;
    border-radius: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: #f5f5f5;
  }
  .user-info {
    width: 542px;
    height: 128px;
    margin-left: 20px;
    justify-content: center;
  }
  .user-name {
    line-height: 48px;
    color: #282828;
  }
  .user-phonenum {
    line-height: 48px;
    color: #666666;
  }

  /* 退出 */
  .logout-container {
    width: 750px;
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 30px;
    background-color: #ffffff;
  }
  .logout-container:active {
    background-color: #e5e5e5;
  }
  .logout {
    color: #282828;
    text-align: center;
    line-height: 96px;
  }
  /* 退出 */
</style>

<script>
  import AppHeader from '../parts/AppHeader.vue'
  import * as types from '../store/mutation-types'
//  import STORE from '../store'
  import router from '../router'
  import { fetch } from '../store/fetch'

  const env = weex.config.env || WXEnvironment
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')
  const storage = weex.requireModule('storage')
  const dom = weex.requireModule('dom')
  const modal = weex.requireModule('modal')
  export default {
    data () {
      return {

      }
    },
    computed: {
      state () {
        return (env.platform.toLowerCase() === 'web' ? this.$store.state : global.store._vm._data.$$state)
      }
    },
    methods: {
      logout () {
        let STORE
        if (env.platform.toLowerCase() === 'web') {
          STORE = this.$store
        } else {
          STORE = global.store
        }
        STORE.commit(types.LOGOUT)
        STORE.commit(types.NAVIGATE_BACK)
      }
    },
    components: {
      AppHeader
    }
  }
</script>
