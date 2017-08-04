<template>
  <div class="wrapper">
    <!--<embed-->
            <!--v-for="(item , i) in tabItems"-->
            <!--:data-src="item.src"-->
            <!--:key="i"-->
            <!--type="weex"-->
            <!--:style="{ visibility: item.visibility }"-->
            <!--class="content"-->
    <!--&gt;</embed>-->
    <div class="tabbar" append="tree">
      <tabitem
              v-for="item in tabItems"
              :key="item.index"
              :index="item.index"
              :icon="item.icon"
              :title="item.title"
              :titleColor="item.titleColor"
              :src="item.src"
              @tabItemOnClick="tabItemOnClick"
      ></tabItem>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    width: 750px;
    height: 88px;
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
  }
  /*.content {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*margin-top: 0;*/
    /*margin-bottom: 88px;*/
  /*}*/
  .tabbar {
    flex-direction: row;
    /*position: fixed;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    width: 750px;
    height: 88px;
  }
</style>

<script>
  import * as types from '../store/mutation-types'
  const env = weex.config.env || WXEnvironment
  module.exports = {
    props: {
      tabItems: { default: [] },
      selectedColor: { default: '#ff0000' },
      unselectedColor: { default: '#000000' }
    },
    data: function () {
      return {
        selectedIndex: 0
      }
    },
    components: {
      tabitem: require('./tabitem.vue')
    },
    created: function () {
      let STORE
      if (env.platform.toLowerCase() === 'web') {
        STORE = this.$store
      } else {
        STORE = global.store
      }
      STORE.commit(types.SET_HEADER_TITLE, {
        title: this.tabItems[this.selectedIndex].title
      })
      this.select(this.selectedIndex);
    },
    methods: {
      tabItemOnClick: function (e) {
        this.selectedIndex = e.index;
        this.select(e.index);
        this.$emit('tabBarOnClick', e);
      },
      select: function(index) {
        for(var i = 0; i < this.tabItems.length; i++) {
          var tabItem = this.tabItems[i];
          if(i == index){
            tabItem.icon = tabItem.selectedImage;
            tabItem.titleColor = this.selectedColor;
            tabItem.visibility = 'visible';
          }
          else {
            tabItem.icon = tabItem.image;
            tabItem.titleColor = this.unselectedColor;
            tabItem.visibility = 'hidden';
          }
        }
      },
    }
  }
</script>