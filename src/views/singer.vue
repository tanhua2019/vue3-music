<template>
  <div class="singer" v-loading="loading">
    <IndexList :data="singerList" @select="handleSelect"></IndexList>
    <router-view v-slot="{ Component }" >
      <transition name="slide">
        <component :is="Component" :singer="selectSinger"/>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getSingerList } from "@/service/singer";
import { useRouter } from "vue-router";
import IndexList from "@/components/index-list/index-list.vue";
import { SINGER_KEY } from '@/store/constant'
const singerList = ref([]);
const loading = ref(true);
const selectSinger = ref([]);
const router = useRouter();
onMounted(async () => {
  const { singers } = await getSingerList();
  loading.value = false;
  singerList.value = singers;
});

const handleSelect = (singer) => {
  selectSinger.value = singer;
  sessionStorage.setItem(SINGER_KEY, JSON.stringify(singer));
  router.push({
    path: `/singer/${singer.mid}`,
  });
};
</script>

<style lang='scss' scoped>
.singer {
  position: relative;
  height: calc(100vh - 88px);
}
</style>
