<template>
  <div class="music-list">
    <div class="back" @click="router.back()">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" ref="bgImage" :style="bgImageStyle">
      <div class="filter"></div>
    </div>
    <div class="song-list-wrapper" v-loading="!songs.length">
      <song-list :songs="songs" @select="selectItem"></song-list>
    </div>
  </div>
</template>

<script setup>
import SongList from "@/components/song-list/song-list.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore, mapActions } from 'vuex'
const router = useRouter()
const store = useStore()
const props = defineProps({
  songs: {
    type: Array,
    default: () => [],
  },
  title: String,
  pic: String,
});

const imageHeight = ref(0);
const bgImage = ref(null);
onMounted(() => {
  imageHeight.value = bgImage.value.clientHeight;
});
const bgImageStyle = computed(() => {
  return { backgroundImage: `url(${props.pic})` };
});

const selectItem = ({ song, index }) => {
  store.dispatch('selectPlay', {
    list: props.songs,
    index
  })
}

</script>
<style lang="scss" scoped>
.music-list {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    background-size: cover;
    height: 250px;
    // .play-btn-wrapper {
    //   position: absolute;
    //   bottom: 20px;
    //   z-index: 10;
    //   width: 100%;
    //   .play-btn {
    //     box-sizing: border-box;
    //     width: 135px;
    //     padding: 7px 0;
    //     margin: 0 auto;
    //     text-align: center;
    //     border: 1px solid $color-theme;
    //     color: $color-theme;
    //     border-radius: 100px;
    //     font-size: 0;
    //   }
    //   .icon-play {
    //     display: inline-block;
    //     vertical-align: middle;
    //     margin-right: 6px;
    //     font-size: $font-size-medium-x;
    //   }
    //   .text {
    //     display: inline-block;
    //     vertical-align: middle;
    //     font-size: $font-size-small;
    //   }
    // }
    // .filter {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   background: rgba(7, 17, 27, 0.4);
    // }
  }

  .song-list-wrapper {
    flex: 1;
    padding: 20px 30px;
    background: $color-background;
    overflow: scroll;
  }
}
</style>
