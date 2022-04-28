<template>
  <van-swipe
    class="my-swipe"
    :autoplay="3000"
    indicator-color="white"
    height="200"
  >
    <van-swipe-item v-for="(image, index) in slider" :key="index">
      <img :src="image.pic" />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getRecommend } from "@/service/recommend";

const slider = ref();
onMounted(async () => {
  const { sliders } = await getRecommend();
  slider.value = sliders;
});
</script>

<style lang='scss' scoped>
.van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
