<template>
  <div class="login-container">
    <image class="bg-image" src="http://static.dei2.com/app/bg.jpg" resize="cover" @load="imageLoaded" :style="{height: (state.platform=='web'?(state.device.height / state.device.dpr):(state.device.height * 2)) + 'px'}"></image>
    <div class="login-content" :style="{height: (state.platform=='web'?(state.device.height / state.device.dpr):(state.device.height * 2)) + 'px'}">
      <div class="poetry-container" ref="poetryContainer">
        <div class="poetry-item-container" ref="poetryItem" :style="{height: poetryHeight + 'px'}" v-for="(item, index) in poetry.split(';').reverse()" :key="item">
          <text class="poetry-item" ref="poetryItemText">{{item}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .login-container {
    width: 750px;
    align-items: center;
    justify-content: center;
  }
  .login-container .bg-image {
    width: 750px;
    opacity: 0;
    -webkit-transition: all .4s ease-in-out;
    -moz-transition: all .4s ease-in-out;
    -ms-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
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
    top: 30px;
    width: 320px;
    /*min-height: 500px;*/
    flex-direction: row;
    justify-content: flex-end;

    opacity: 0;
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
    color: rgb(33, 76, 142);
    font-size: 40px;
    width: 60px;
    text-align: center;
  }
  .poetry-item-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 100%;
    /*background-color: #a986ff;*/
  }
</style>

<script>
  import STORE from '../store'
  export default {
    data () {
      return {
        poetryHeight: 0,
        poetry: 'IE 在文字排版方面一直是先驱;用来将文本按照指定的样式渲染出来;如果需要保留头尾空白;暂时只能通过数据绑定写头尾空格'
//        poetry: '锄禾日当午;汗滴禾下土;谁知盘中餐;粒粒皆辛苦'
      }
    },
    computed: {
      state () {
        return STORE.state
      }
    },
    methods: {
      imageLoaded: function (e) {
        const that = this
        e.target.style.opacity = 1

        setTimeout(function () {
          that.pageLoaded()
        }, 400)
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
              if (that.state.platform === 'web') {
                allPoetryItems[i].$el.style.height = that.$refs.poetryItemText[i].$el.getBoundingClientRect().height + 'px'
              } else {
                console.log('...22..', that.$refs.poetryItemText[i])
//                allPoetryItems[i].style.height = '800'
                that.poetryHeight = 800
              }
            }, (allPoetryItems.length - i) * 800)
          }
        }

        setTimeout(function () {
          poetryRun()
        }, 800)
      }
    }
  }
</script>
