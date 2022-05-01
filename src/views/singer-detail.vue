
<template>
  <div class="singer-detail">
    <MusicList :songs="songs" :title="title" :pic="pic"></MusicList>
  </div>
</template>

<script setup>
import { getSingerDetail } from "@/service/singer";
import { processSongs } from "@/service/song";
import MusicList from "@/components/music-list/music-list.vue";
import { onMounted, ref, computed } from "vue";
import { SINGER_KEY } from '@/assets/js/constant'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  singer: {
    type: Object,
    default: () => {},
  },
});

const router = useRouter()
const route = useRoute()
const songs = ref([]);
onMounted(async () => {
  if (!computedSinger.value) {
    const path = route.matched[0].path;
    router.push(path)
    return
  }
  const detail = await getSingerDetail(computedSinger.value);
  songs.value = await processSongs(detail.songs);
});

const pic = computed(() => computedSinger.value && computedSinger.value.pic);
const title = computed(() => computedSinger.value && computedSinger.value.name);
const computedSinger = computed(() => {
  let ret = null;
  const singer = props.singer.value
  if(singer) {
    ret = singer
  } else {
    let key = JSON.parse(sessionStorage.getItem('SINGER_KEY'))
    if(key && route.params.id === key.mid) {
      ret = key;
    }
  }
  return ret
})

</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
