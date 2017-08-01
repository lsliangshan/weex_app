<template>
  <div class="home">
    <text @click="navigateTo('/pages/Login.js')">Home</text>
  </div>
</template>

<style scoped>
  .home {
    width: 750px;
    align-items: center;
    justify-content: center;
    background-color: #a986ff;
  }
</style>

<script>
  import * as types from './store/mutation-types'
  import STORE from './store'

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
        return STORE.state
      }
    },
    methods: {

    },
    components: {
    }
  }
</script>
