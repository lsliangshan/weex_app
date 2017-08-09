<template>
  <div class="popup-container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" ref="popupContainer" :style="{height: (state.platform=='web'?(state.device.height / state.device.dpr):(state.device.height*2)) + 'px'}">
    <!--<div class="popup-mask" :style="{height: (state.device.height / state.device.dpr) + 'px'}"></div>-->
    <!--<transition name="popup-transition"-->
                <!--@before-enter="beforeEnter"-->
                <!--@enter="enter"-->
                <!--@before-leave="beforeLeave"-->
                <!--@leave="leave"-->
                <!--:css="false"-->
    <!--&gt;-->

    <!--</transition>-->
    <div class="popup-content" :style="{height: (state.platform=='web'?(state.device.height / state.device.dpr - 20):(state.device.height * 2 - 40)) + 'px'}">
      <div class="popup-header-container">
        <text class="popup-title">弹出窗口</text>
        <div class="popup-close-container" @click="hidePopup">
          <image class="popup-close" src="http://static.dei2.com/imgs/icon-close.png" resize="cover"></image>
          <!--<text class="popup-close">×</text>-->
        </div>
      </div>
      <div class="popup-body-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .popup-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 750px;
    z-index: 99999;
    /*-webkit-transition: all .3s ease-in-out;*/
    /*transition: all .3s ease-in-out;*/
  }
  .popup-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 750px;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .popup-content {
    position: absolute;
    width: 750px;
    background-color: #ffffff;
    top: 40px;
    left: 0;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
  .popup-header-container {
    width: 750px;
    height: 96px;
  }
  .popup-title {
    width: 750px;
    height: 96px;
    line-height: 96px;
    color: #333333;
    text-align: center;
    font-size: 32px;
    border-bottom: 1px solid #ccc;
  }
  .popup-close-container {
    position: absolute;
    width: 96px;
    height: 96px;
    left: 0;
    top: 0;
    align-items: center;
    justify-content: center;
  }
  .popup-close {
    /*font-size: 64px;*/
    /*line-height: 96px;*/
    /*color: #888888;*/
    /*text-align: center;*/
    width: 48px;
    height: 48px;
  }
</style>

<script>
  import STORE from '../store/index.js'
  import * as types from '../store/mutation-types'
  const animation = weex.requireModule('animation')
  //  const modal = weex.requireModule('modal')
  export default {
    data () {
      return {
        title: '',
        touchInfo: {
          startY: 0,
          startTime: 0,
          count: 0,
          identifier: -1
        },
        availableTouch: true
      }
    },
    computed: {
      state () {
        return STORE.state
      }
    },
    mounted () {
      console.log('popup mounted!!!!!')

    },
    methods: {
      touchStart (target) {
        let _touch = target.changedTouches[0]
        if (this.touchInfo.identifier === -1 && _touch.identifier !== this.touchInfo.identifier) {
          this.touchInfo.identifier = _touch.identifier
          this.touchInfo.startY = _touch.pageY
          this.touchInfo.startTime = target.timestamp
        } else {
          this.resetPopup()
          this.touchInfo.identifier = -1
          this.touchInfo.startY = 0
          this.touchInfo.startTime = 0
        }
      },
      touchMove (target) {
        let _touch = target.changedTouches[0]
        if (_touch.identifier === this.touchInfo.identifier) {
          animation.transition(this.$refs.popupContainer, {
            styles: {
              transform: 'translate(0, ' + (target.changedTouches[0].pageY - this.touchInfo.startY) + 'px)',
              transformOrigin: 'center top'
            },
            duration: 0,
            timingFunction: 'linear',
            delay: 0
          }, function () {
          })
        } else {
          this.resetPopup()
          this.touchInfo.identifier = -1
          this.touchInfo.startY = 0
          this.touchInfo.startTime = 0
        }
      },
      touchEnd (target) {
        let _touch = target.changedTouches[0]
        if (_touch.identifier === this.touchInfo.identifier) {
          let _startY = this.touchInfo.startY
          let _startTime = this.touchInfo.startTime
          let _endY = target.changedTouches[0].pageY
          let _endTime = target.timestamp
          if (_endTime - _startTime < 300) {
            if (_endY - _startY > 30) {
              this.hidePopup()
            } else {
              this.resetPopup()
              this.touchInfo.identifier = -1
              this.touchInfo.startY = 0
              this.touchInfo.startTime = 0
            }
          } else {
            if (_endY - _startY > 300) {
              this.hidePopup()
            } else {
              this.resetPopup()
              this.touchInfo.identifier = -1
              this.touchInfo.startY = 0
              this.touchInfo.startTime = 0
            }
          }
        } else {
          this.resetPopup()
          this.touchInfo.identifier = -1
          this.touchInfo.startY = 0
          this.touchInfo.startTime = 0
        }
      },
      showAlert (text) {
//        modal.alert({
//          message: text,
//          duration: 0.3
//        }, function (value) {
//          console.log('alert callback', value)
//        })
      },
      resetPopup () {
        animation.transition(this.$refs.popupContainer, {
          styles: {
            transform: 'translate(0, 0)',
            transformOrigin: 'center top'
          },
          duration: 500,
          timingFunction: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
          delay: 0
        }, function () {
        })
      },
      hidePopup () {
        animation.transition(this.$refs.popupContainer, {
          styles: {
            transform: 'translate(0, 3000px)',
            transformOrigin: 'center top'
          },
          duration: 1000,
          timingFunction: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
          delay: 100
        }, function () {
          STORE.commit(types.HIDE_POPUP)
        })
      }
    },
    components: {
    }
  }
</script>
