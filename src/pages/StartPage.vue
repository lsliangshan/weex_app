<template>
  <div class="start-page-container" :style="{height: (state.platform == 'web' ? (state.device.height) / state.device.dpr : (750 / state.device.width * state.device.height)) + 'px'}">
    <slider class="start-page-slider" :infinite="false" :style="{height: (state.platform == 'web' ? (state.device.height) / state.device.dpr : (750 / state.device.width * state.device.height)) + 'px'}">
      <div class="start-page-item" v-for="(item, index) in state.startPage.resources">
        <image class="start-page-image" :style="{height: (state.platform == 'web' ? (state.device.height) / state.device.dpr : (750 / state.device.width * state.device.height)) + 'px'}" :src="item" resize="cover"></image>
      </div>
    </slider>
  </div>
</template>

<style scoped>
  .start-page-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 750px;
    background-color: #ffffff;
  }
  .start-page-image {
    width: 750px;
  }
</style>

<script>
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
    }
  }
</script>
