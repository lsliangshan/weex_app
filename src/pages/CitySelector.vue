<template>
  <div>
    <scroller class="city-selector-scroller" offset-accuracy="10" @scroll="cityScroll" ref="cityScroll" :style="{height: (state.platform == 'web' ? (state.device.height - 20 - 96) / state.device.dpr : (750 / state.device.width * state.device.height - 20 - 96)) + 'px'}">
      <div class="city-wrapper" v-for="(item, index) in groupNames" :key="item" v-if="cities.hasOwnProperty(item)">
        <div class="group-title" :ref="item" :data-dpr="state.device.dpr" :data-scroll-y="cityScrollY" :data-top="groupNameStyle.hasOwnProperty(item) && (groupNameStyle[item].top - scrollTop) * state.device.width / 750 / state.device.dpr" :class="(groupNameStyle.hasOwnProperty(item) && (cityScrollY + (groupNameStyle[item].top - scrollTop) * state.device.width / 750 / state.device.dpr < 0)) ? 'group-sticky' : ''">
          <text class="group-title-text">{{item}}</text>
        </div>
        <div class="city-container">
          <div class="city-item" v-for="(itm, idx) in cities[item]" :key="itm.code">
            <text class="city-name">{{itm.name}}</text>
          </div>
        </div>
      </div>
    </scroller>
    <div class="city-nav" :style="{height: (state.platform == 'web' ? (state.device.height - 20 - 96) / state.device.dpr : (750 / state.device.width * state.device.height - 20 - 96)) + 'px'}">
      <div class="city-wrapper" v-for="(item, index) in groupNames" :key="item" v-if="cities.hasOwnProperty(item)">
        <div class="city-title">
          <text>{{item}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .city-selector-scroller {
    /*background-color: red;*/
    /*padding-top: 30px;*/
    padding-bottom: 30px;
  }
  .group-title {
    /*width: 690px;*/
    background-color: #f5f5f5;
    padding-left: 30px;
    padding-right: 30px;
  }
  .group-title-text {
    height: 64px;
    line-height: 64px;
    font-size: 30px;
    font-weight: bold;
    color: #282828;
  }
  .city-item {
    background-color: #ffffff;
    padding-left: 30px;
    padding-right: 30px;
  }
  .city-item:active {
    background-color: #f8f8f8;
  }
  .city-name {
    height: 64px;
    line-height: 64px;
    color: #666666;
    font-size: 28px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #f8f8f8;
  }
  .city-nav {
    position: absolute;
    width: 64px;
    right: 0;
    bottom: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .group-sticky {
    position: sticky;
    top: 0;
    left: 0;
  }
</style>

<script>
  import { fetch } from '../store/fetch'
  const env = weex.config.env || WXEnvironment
  const dom = weex.requireModule('dom')
  export default {
    data () {
      const that = this
      fetch({
        url: 'https://static.dei2.com/resources/city.json',
        callback: function (res) {
          if (Number(res.status) === 200) {
            that.cities = res.data

            setTimeout(function () {
              for (let i = 0; i < that.groupNames.length; i++) {
//                console.log('....', that.$refs['A'][0])
                if (that.$refs.hasOwnProperty(that.groupNames[i])) {
                  dom.getComponentRect(that.$refs[that.groupNames[i]][0], function (option) {
                    that.groupNameStyle[that.groupNames[i]] = {
                      top: option.size.top
                    }
                    console.log('===' + that.groupNames[i] + '===', that.$refs[that.groupNames[i]][0])
                  })
                }
              }

              dom.getComponentRect(that.$refs.cityScroll, function (option) {
                that.scrollTop = option.size.top
              })
            }, 0)

          }
        }
      })
      return {
        cities: {},
        groupNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        groupNameStyle: {

        },
        cityScrollY: 0,
        scrollTop: 0
      }
    },
    computed: {
      state () {
        return (env.platform.toLowerCase() === 'web' ? this.$store.state : global.store._vm._data.$$state)
      }
    },
    mounted () {
      const that = this
      for (let i = 0; i < that.groupNames.length; i++) {
//                console.log('....', that.$refs['A'][0])
        if (that.$refs.hasOwnProperty(that.groupNames[i])) {
          dom.getComponentRect(that.$refs[that.groupNames[i]][0], function (option) {
            that.groupNameStyle[that.groupNames[i]] = {
              top: option.size.top
            }
          })
        }
      }
      console.log('======', that.groupNameStyle)
    },
    methods: {
      cityScroll (evt) {
        this.cityScrollY = Number(evt.contentOffset.y)
//        console.log('.....', evt.contentOffset.y, '>>>>>>>>', )
      }
    }
  }
</script>
