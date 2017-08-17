<template>
  <div class="login-container">
    <image class="bg-image" src="https://static.dei2.com/app/bg.jpg" ref="bgImage" @load="imageLoaded" resize="cover" :class="state.platform=='web'?'shown':''" :style="{height: (state.platform=='web'?(state.device.height / state.device.dpr):(750 / state.device.width * state.device.height)) + 'px'}"></image>
    <div class="login-content" :style="{height: (state.platform=='web'?(state.device.height / state.device.dpr):(750 / state.device.width * state.device.height)) + 'px'}">
      <div class="poetry-container" ref="poetryContainer">
        <div class="poetry-item-container" ref="poetryItem" v-for="(item, index) in poetry.split(';').reverse()" :key="item">
          <text class="poetry-item" ref="poetryItemText">{{item}}</text>
        </div>
      </div>
      <div class="login-form-container">
        <div class="login-form" id="slick-login">
          <div class="login-form-item" ref="formPhonenum">
            <input type="text" autofocus class="form-item phonenum placeholder" placeholder="请输入手机号" return-key-type="next" @return="formNext" v-model="loginInfo.phonenum"/>
          </div>
          <div class="login-form-item" ref="formPassword">
            <input type="password" ref="inputPassword" class="form-item password placeholder" placeholder="请输入密码" return-key-type="go" @return="formSubmit" v-model="loginInfo.password" />
          </div>
          <div class="login-form-item btn-login" ref="formBtn">
            <text class="btn-login-text" @click="doLogin">登录</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .login-container {
    width: 750px;
    /*height: 1036px;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }
  .bg-image {
    width: 750px;
    opacity: 0;
    -webkit-transition: all .4s ease-in-out;
    -moz-transition: all .4s ease-in-out;
    -ms-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }
  .bg-image.shown {
    opacity: 1;
  }
  .login-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 750px;
    background-color: transparent;
  }
  .poetry-container {
    position: absolute;
    right: 30px;
    top: 50px;
    width: 320px;
    /*min-height: 500px;*/
    flex-direction: row;
    justify-content: flex-end;

    opacity: 1;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -ms-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    /*background-color: rgba(234, 242, 3, 0.4);*/
  }
  .poetry-item-container {
    width: 60px;
    height: 0;
    overflow: hidden;
    /*-webkit-transform: scaleY(0);*/
    /*-moz-transform: scaleY(0);*/
    /*-o-transform: scaleY(0);*/
    /*transform: scaleY(0);*/
    -webkit-transform-origin: 50% 0;
    -moz-transform-origin: 50% 0;
    -o-transform-origin: 50% 0;
    transform-origin: 50% 0;
    -webkit-transition: all .8s ease-in-out;
    -moz-transition: all .8s ease-in-out;
    -o-transition: all .8s ease-in-out;
    transition: all .8s ease-in-out;
  }
  .poetry-item {
    color: rgb(95, 169, 212);
    font-size: 40px;
    width: 60px;
    text-align: center;
  }
  .login-form-container {
    position: absolute;
    left: 30px;
    top: 400px;
    /*width: 500px;*/
    padding: 30px;
    /*min-height: 400px;*/
    border-radius: 8px;
    background-color: transparent;
  }
  .login-form-item {
    /*width: 500px;*/
    height: 68px;
    margin-top: 14px;
    flex-direction: row;
    opacity: 0;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
  .btn-login {
    padding: 0;
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
  }
  .btn-login-text {
    line-height: 66px;
    width: 400px;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(110, 169, 192, 0.6);
    color: rgb(95, 169, 212);
    border-radius: 8px;
  }
  .btn-login-text:active {
    background-color: rgb(95, 169, 212);
    color: #ffffff;
  }
  .form-item {
    width: 400px;
    height: 68px;
    font-size: 28px;
    color: rgba(110, 169, 192, 1);
    placeholder-color: rgba(110, 169, 192, 0.6);
    outline: none;
    background-color: transparent;
    /*border: 1px solid rgba(110, 169, 192, 0.8);*/
    border-width: 1px;
    border-style: solid;
    border-color: rgba(100, 169, 192, 0.6);
    padding-left: 20px;
    border-radius: 6px;
  }
</style>

<script>
  import * as types from '../store/mutation-types'
//  import STORE from '../store'
  import router from '../router'
  import { fetch } from '../store/fetch'

  const env = weex.config.env || WXEnvironment
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')
  const dom = weex.requireModule('dom')
  const modal = weex.requireModule('modal')
  export default {
    data () {
      return {
        poetryHeight: 0,
//        poetry: 'IE 在文字排版方面一直是先驱;用来将文本按照指定的样式渲染出来;如果需要保留头尾空白;暂时只能通过数据绑定写头尾空格',
        poetry: '锄禾日当午;汗滴禾下土;谁知盘中餐;粒粒皆辛苦',
        loginInfo: {
          phonenum: '',
          password: ''
        }
      }
    },
    computed: {
      state () {
        return (env.platform.toLowerCase() === 'web' ? this.$store.state : global.store._vm._data.$$state)
      },
      STORE () {
        let _store
        if (env.platform.toLowerCase() === 'web') {
          _store = this.$store
        } else {
          _store = global.store
        }
        return _store
      }
    },
    methods: {
      imageLoaded: function (e) {
        const that = this

        if (this.state.platform === 'web') {
          e.target.style.opacity = 1
          setTimeout(function () {
            that.pageLoaded()
          }, 400)
        } else {
          animation.transition(this.$refs.bgImage, {
            styles: {
              opacity: 1
            },
            duration: 400,
            timingFunction: 'ease-in-out',
            delay: 0
          }, function () {
            that.pageLoaded()
          })
        }
      },
      pageLoaded: function () {
        const that = this
        if (this.state.platform === 'web') {
          this.$refs.poetryContainer.$el.style.opacity = 1
        } else {
          this.$refs.poetryContainer.style.opacity = 1
        }

        function poetryRun () {
          let allPoetryItems = that.$refs.poetryItem
          for (let i = allPoetryItems.length - 1; i >= 0; i--) {
            setTimeout(function () {
//              if (that.state.platform === 'web') {
//                allPoetryItems[i].$el.style.height = that.$refs.poetryItemText[i].$el.getBoundingClientRect().height + 'px'
//              } else {
//                allPoetryItems[i].style.height = '800'
//                that.poetryHeight = 800
                dom.getComponentRect(that.$refs.poetryItemText[i], option => {
                  animation.transition(allPoetryItems[i], {
                    styles: {
                      height: Number(option.size.height)
                    },
                    duration: 800,
                    timingFunction: 'ease-in-out',
                    delay: 0
                  }, function () {
                  })
                })
//              }
            }, (allPoetryItems.length - 1 - i) * 800)
          }
        }
        
        function formInit () {
          animation.transition(that.$refs['formPhonenum'], {
            styles: {
              opacity: 1
            },
            duration: 400,
            timingFunction: 'ease-in-out',
            delay: 200
          }, function () {
          })
          animation.transition(that.$refs['formPassword'], {
            styles: {
              opacity: 1
            },
            duration: 400,
            timingFunction: 'ease-in-out',
            delay: 2 * 200
          }, function () {
          })
          animation.transition(that.$refs['formBtn'], {
            styles: {
              opacity: 1,
              transform: 'scale(1)'
            },
            duration: 400,
            timingFunction: 'cubic-bezier(.215,.61,.355,1)',
            delay: 3 * 200
          }, function () {
          })
        }

        setTimeout(function () {
          formInit()
          poetryRun()
        }, 800)
      },
      formNext: function (evt) {
        console.log('>>> 表单下一步 >>>', evt)
        this.$refs['inputPassword'].focus()
      },
      formSubmit: function (evt) {
        console.log('>>> 表单提交 >>>>', evt)
        this.doLogin()
      },
      doLogin: function (evt) {
        const that = this
        if (this.loginInfo.phonenum.trim() === '') {
          // 手机号不能为空
          modal.toast({
            message: '手机号不能为空',
            duration: 0.8
          })
        } else if (!/^1[35789]\d{9}$/.test(this.loginInfo.phonenum)) {
          // 手机号不合法
          modal.toast({
            message: '手机号不合法',
            duration: 0.8
          })
        } else if (this.loginInfo.password.trim() === '') {
          // 密码不能为空
          modal.toast({
            message: '密码不能为空',
            duration: 0.8
          })
        } else {
          // 登录
          fetch({
            url: this.state.baseRequestUrl + 'login?username=' + this.loginInfo.phonenum + '&password=' + this.loginInfo.password,
//            data: {
//              username: this.loginInfo.phonenum,
//              password: this.loginInfo.password
//            },
            callback: function (res) {
              if (Number(res.data.code) === 200) {
                modal.toast({
                  message: '登录成功',
                  duration: 0.8
                })

//                let STORE
//                if (env.platform.toLowerCase() === 'web') {
//                  STORE = that.$store
//                } else {
//                  STORE = global.store
//                }
                that.STORE.commit(types.LOGIN, {
                  userInfo: res.data.data
                })
              } else {
                modal.toast({
                  message: '登录失败',
                  duration: 0.8
                })
              }
            }
          })
        }
      }
    }
  }
</script>
