<template>
  <div class="home" :style="{height: (state.platform=='web'?(state.device.height / state.device.dpr):(state.device.height)) + 'px'}">
    <text>Home</text>
  </div>
</template>

<style scoped>
  .home {
    width: 750px;
    align-items: center;
    justify-content: center;
  }
</style>

<script>
  import * as types from './store/mutation-types'

  const animation = weex.requireModule('animation')
  const dom = weex.requireModule('dom')
  var modal = weex.requireModule('modal')
  var navigator = weex.requireModule('navigator')
  export default {
    data () {
      return {
      }
    },
    computed: {
      state () {
        return this.$store.state
      }
    },
    methods: {

    },
    components: {
    }
  }
</script>
