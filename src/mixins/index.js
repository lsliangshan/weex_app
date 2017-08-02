const navigator = weex.requireModule('navigator')
const modal = weex.requireModule('modal')
// const getBaseURL = require('../utils/base-url.js').getBaseURL
export default {
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    back () {
      if (this.$store.state.platform.toLowerCase() === 'web') {
        this.$router.back()
      } else {
        navigator.pop({
          animated: "true"
        }, event => {
        })
      }
    },
    navigateTo (to) {
      if (this.$store.state.platform.toLowerCase() === 'web') {
        this.jump(to.replace(/.*\/([a-zA-Z0-9_-]*)\.js$/,'$1').toLowerCase())
      } else {
        // modal.alert({
        //   message: weex.config.bundleUrl.replace(/^(.*bundlejs).*$/, '$1') + to
        //   // message: weex.config.bundleUrl.replace(/^(.*:\d{2,5})\/?.*$/, '$1/dist') + to
        // })
        navigator.push({
          url: weex.config.bundleUrl.replace(/^(.*bundlejs).*$/, '$1') + to,
          animated: "true"
        }, event => {
        })
      }
    },
    lsToast (opts) {
      modal.toast({
        message: opts.message,
        duration: opts.duration || 0.3
      })
    },
    lsAlert (opts) {
      modal.alert({
        message: opts.message,
        okTitle: opts.okTitle || '确认',
        duration: opts.duration || 0.3
      }, function (value) {
        opts.callback && opts.callback(value)
      })
    },
    lsConfirm (opts) {
      modal.confirm({
        message: opts.message,
        okTitle: opts.okTitle || '确认',
        cancelTitle: opts.cancelTitle || '取消',
        duration: opts.duration || 0.3
      }, function (value) {
        opts.callback && opts.callback(value)
      })
    },
    lsPrompt (opts) {
      modal.prompt({
        message: opts.message,
        duration: opts.duration || 0.3
      }, function (value) {
        opts.callback && opts.callback(value)
      })
    }
  }
}
