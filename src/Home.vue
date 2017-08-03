<template>
  <div class="home" @viewappear="pageShown" @viewdisappear="pageHide">
    <!--<text @click="navigateTo('/pages/Login.js')">Home</text>-->
    <app-header :data-state="state" data-title="新闻" :data-show-user-container="true"></app-header>
    <text>{{state.isLogin}}</text>
  </div>
</template>

<style scoped>
  .home {
    width: 750px;
    /*align-items: center;*/
    /*justify-content: center;*/
    background-color: #a986ff;
  }
  .header {

  }
</style>

<script>
  import * as types from './store/mutation-types'
//  import STORE from './store'

  import AppHeader from './parts/AppHeader.vue'

//  const animation = weex.requireModule('animation')
//  const dom = weex.requireModule('dom')
//  var modal = weex.requireModule('modal')
//  var navigator = weex.requireModule('navigator')
  const env = weex.config.env || WXEnvironment
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
      pageShown () {
        console.log('>>>>>>>> Home Shown')
      },
      pageHide () {
        console.log('>>>>>>> Home Hide')
      }
    },
    mounted () {
      this.$on('login-page-close', function () {
        console.log('####### login-page-close #######')
      })
    },
    components: {
      AppHeader
    }
  }
</script>
