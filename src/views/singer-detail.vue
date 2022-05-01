
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
const props = defineProps({
  singer: {
    type: Object,
    default: () => {},
  },
});
const songs = ref([]);
onMounted(async () => {
  const detail = await getSingerDetail(props.singer);
  songs.value = await processSongs(detail.songs);
});
console.log(props.singer,'111');
const pic = computed(() => props.singer && props.singer.pic);
const title = computed(() => props.singer && props.singer.name);

console.log(pic, title,'11111');
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
