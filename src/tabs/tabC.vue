<template>
  <div class="not-found-container">
    <text class="message">第三页</text>
  </div>
</template>

<style scoped>
  .not-found-container {
    /*background-color: red;*/
    align-items: center;
    justify-content: center;
  }
  .message {
    font-size: 50px;
    color: #ee3333;
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
    mounted () {
      if (env.platform.toLowerCase() === 'web') {

      } else {
//        const Nat = require('natjs')
//        Nat.geolocation.get((err, res) => {
//          console.log('....location', res)
//        })
      }

//      Nat.device.info((err, ret) => {
//        console.log(ret)
//      })
    },
    methods: {
    }
  }
</script>
