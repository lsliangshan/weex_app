<template>
  <div class="news-item-container">
    <div class="item single-mode" v-if="item.single_mode">
      <div class="left">
        <image class="item-image" :src="item.image_url" resize="cover"></image>
      </div>
      <div class="right">
        <text class="item-title">{{item.title}}</text>
        <text class="item-subtitle">{{item.source}}</text>
      </div>
    </div>
    <div class="item" v-else>
      <div class="top">
        <text class="item-title">{{item.title}}</text>
      </div>
      <div class="middle" v-if="item.image_list && item.image_list.length > 0">
        <image class="middle-image" v-for="(item, index) in item.image_list" v-if="index < 3" :src="item.url" resize="cover"></image>
      </div>
      <div class="bottom">
        <text class="item-subtitle">{{item.source}}</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .news-item-container {
    /*width: 750px;*/
  }
  .item {
    width: 690px;
  }
  .single-mode {
    flex-direction: row;
    justify-content: space-between;
  }
  .left {
    width: 250px;
  }
  .item-image {
    width: 250px;
    height: 160px;
  }
  .right {
    width: 420px;
  }
  .item-title {
    color: #282828;
    font-size: 34px;
    line-height: 42px;
    lines: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-subtitle {
    color: #999999;
    margin-top: 12px;
    font-size: 20px;
    line-height: 30px;
  }
  .top {
    width: 690px;
  }
  .middle {
    width: 690px;
    height: 180px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .middle-image {
    width: 220px;
    height: 160px;
  }
</style>

<script>
  export default {
    props: {
      type: {
        default: 1
      },
      item: {
        default: {}
      }
    },
    data () {
      return {

      }
    },
    methods: {
    }
  }
</script>
