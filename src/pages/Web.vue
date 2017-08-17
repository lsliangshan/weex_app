<template>
  <div class="web-container">
    <app-header :data-state="state" data-title="" :data-can-go-back="true" :data-show-user-container="false"></app-header>
    <div class="web-main">
      <web ref="webview" :src="url" :style="{height: (state.platform == 'web' ? (state.device.height - 120) / state.device.dpr : (750 / state.device.width * state.device.height - 120)) + 'px'}" class="webview" @pagestart="start" @pagefinish="finish" @error="error"></web>
      <div class="loading-container" v-if="showInitLoading" ref="loadingContainer" :style="{height: (state.platform == 'web' ? (state.device.height - 120) / state.device.dpr : (750 / state.device.width * state.device.height - 120)) + 'px'}">
        <div class="loading-wrapper">
          <image src="https://static.dei2.com/app/loading06.gif" resize="cover" class="loading-image"></image>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .web-container {
    width: 750px;
    background-color: #f5f5f5;
  }
  .web-main {
    width: 750px;
  }
  .webview {
    width: 750px;
  }
  .loading-container {
    position: absolute;
    width: 750px;
    left: 0;
    top: 0;
    opacity: 0;
    background-color: #ffffff;
    align-items: center;
    justify-content: center;
  }
  .loading-wrapper {
    width: 400px;
    height: 400px;
  }
  .loading-image {
    width: 400px;
    height: 400px;
  }
</style>

<script>
  import AppHeader from '../parts/AppHeader.vue'
  import * as types from '../store/mutation-types'
  //  import STORE from '../store'
  import router from '../router'

  const env = weex.config.env || WXEnvironment
  const webview = weex.requireModule('webview')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')
  const storage = weex.requireModule('storage')
  const dom = weex.requireModule('dom')
  const modal = weex.requireModule('modal')
  export default {
    data () {
      return {
        showInitLoading: true
      }
    },
    computed: {
      state () {
        return (env.platform.toLowerCase() === 'web' ? this.$store.state : global.store._vm._data.$$state)
      },
      url () {
        let _u = ''
        if (env.platform.toLowerCase() === 'web') {
          _u = this.$route.query.d
        } else {
          _u = this.state.pageParams.d
        }
        return decodeURIComponent(_u)
      }
    },
    methods: {
      reload (event) {
        console.log('will reload webview')
        modal.toast({ message: 'reload' })
        webview.reload(this.$refs.webview)
      },
      start (event) {
        animation.transition(this.$refs.loadingContainer, {
          styles: {
            opacity: 1
          },
          duration: 800,
          timingFunction: 'ease-in-out',
          delay: 0
        }, function () {
        })
//        modal.toast({ message: 'pagestart' })
      },
      finish (event) {
        const that = this
        setTimeout(function () {
          animation.transition(that.$refs.loadingContainer, {
            styles: {
              opacity: 0
            },
            duration: 800,
            timingFunction: 'ease-in-out',
            delay: 0
          }, function () {
            that.showInitLoading = false
          })
        }, 1000)

//        modal.toast({ message: 'pagefinish' })
      },
      error (event) {
//        console.log('error', event)
//        modal.toast({ message: 'error' })
      }
    },
    components: {
      AppHeader
    }
  }
</script>
