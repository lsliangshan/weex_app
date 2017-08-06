<template>
  <div class="news-item-container">
    <div class="item" v-if="type == 1">
      <div class="left">
        <image class="item-image" :src="item.image_list[0]" resize="cover"></image>
      </div>
      <div class="right">
        <text class="item-title">{{item.title}}</text>
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
  .left {
    width: 250px;
  }
  .item-image {
    width: 250px;
  }
  .right {

  }
  .item-title {
    color: #282828;
    font-size: 28px;
    lines: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-subtitle {
    color: #999999;
    font-size: 20px;
    line-height: 30px;
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
