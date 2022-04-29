<template>
  <div class="recommend" v-loading:[loadingText]="loading">
    <van-swipe :autoplay="3000" indicator-color="white" height="150">
      <van-swipe-item v-for="(image, index) in slider" :key="index">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
    <div class="singer" v-if="!loading">热门歌单推荐</div>
    <div class="card">
      <van-card
        v-for="(item, index) in album"
        :key="item.id"
        :desc="item.title"
        :title="item.username"
        :thumb="item.pic"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getRecommend } from "@/service/recommend";

const slider = ref();
const album = ref();
const loading = ref(true)
onMounted(async () => {
  const { sliders, albums } = await getRecommend();
  loading.value = false;
  slider.value = sliders;
  album.value = albums;
});
const loadingText = '正在加载中...'
</script>

<style lang='scss' scoped>
.recommend {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 88px);
  .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .singer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    color: #ffcd32;
    font-weight: bold;
  }
  .card {
    flex: 1;
    overflow: scroll;
    padding-bottom: 20px;
  }
  :deep(.van-card) {
    background: none;
    margin-top: 0;
    .van-card__header {
      height: 60px;
      width: 100%;
    }
    .van-card__thumb {
      height: 60px;
      width: 20%;
    }
    .van-card__content {
      min-height: 60px;
    }
    .van-image__img {
      height: 60px;
      width: 60px;
    }
    .van-card__title {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>
