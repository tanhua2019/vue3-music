import { useStore } from "vuex";
import { computed, watch, ref } from "vue";

export default function usePlay() {
  const store = useStore();
  const audioRef = ref();
  const fullScreen = computed(() => store.state.fullScreen);
  // 获取当前播放音乐
  const currentSong = computed(() => store.getters.currentSong);
  // 获取playing播放状态
  const playing = computed(() => store.state.playing);
  // 获取当前播放的index
  const currentIndex = computed(() => store.state.currentIndex);
  // 获取当前播放列表
  const playlist = computed(() => store.state.playlist);
  // 歌曲是否准备好
  const songReady = ref(false)

  // 监听playing播放状态控制audio播放暂停
  watch(playing, (newPlaying) => {
    if (!songReady.value) return
    newPlaying ? audioRef.value.play() : audioRef.value.pause();
  });

  // 监听当前播放音乐
  watch(currentSong, (newSong) => {
    if (!newSong.id || !newSong.url) {
      return;
    }
    songReady.value = false
    audioRef.value.src = newSong.url;
    audioRef.value.play();
  });


  // 当audio自己暂停的时候，同步将playState改成false
  const pause = () => {
    store.commit("setPlayingState", false);
  };

  // 上一首
  const prev = () => {
    if (!songReady.value || !playlist.value.length) return;
    if (playlist.value == 1) {
      loop()
    } else {
      let index = currentIndex.value - 1;
      if (index == -1) {
        index = playlist.value.length - 1;
      }
      setCurrentIndex(index)
    }

  };

  //下一首
  const next = () => {
    if (!songReady.value || !playlist.value.length) return;
    if (playlist.value == 1) {
      loop()
    } else {
      let index = currentIndex.value + 1;
      if (index == playlist.value.length) {
        index = 0;
      }
      setCurrentIndex(index)
    }
  };

  // 设置当前index
  const setCurrentIndex = (index) => {
    store.commit("setCurrentIndex", index);
    // 如果是暂停状态的时候，切换下一首继续播放
    if (!playing.value) {
      store.commit("setPlayingState", true);
    }
  }

  const loop = () => {
    audioRef.value.currentTime = 0
    audioRef.value.play()
  }

  // 当audio play执行之后，可以播放时会执行canplay方法
  const ready = () => {
    if (songReady.value) return
    songReady.value = true
  }

  const goBack = () => {
    store.commit('setFullScreen', false)
  }

  return {
    fullScreen,
    currentSong,

    pause,
    prev,
    next,
    ready,
    audioRef,
    goBack
  }
}