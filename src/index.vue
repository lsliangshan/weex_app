<template>
  <div class="wrapper">
    <div @androidback="back">
      <router-view style="flex: 1;" :style="{height: (state.platform=='web'?(state.device.height / state.device.dpr):(state.device.height)) + 'px'}"></router-view>
    </div>
  </div>
</template>

<style>
  .nav {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  .wrapper { align-items: center; }
  .title { padding-top:40px; padding-bottom: 40px; font-size: 48px; }
  .logo { width: 360px; height: 156px; }
  .desc { padding-top: 20px; color:#888; font-size: 24px;}
</style>

<script>
  import STORE from './store'
  const animation = weex.requireModule('animation')
  export default {
    data () {
      return {
        logoUrl: 'http://img1.vued.vanthink.cn/vued08aa73a9ab65dcbd360ec54659ada97c.png',
        target: 'World3'
      }
    },
    computed: {
      state () {
        return STORE.state
      }
    },
    methods: {
      back: function () {
        this.$router.back()
      }
    },
    components: {
    }
  }
</script>