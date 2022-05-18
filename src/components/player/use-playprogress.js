import { computed, ref, watch } from "vue"
import { useStore } from "vuex"

export default function usePlayProgress(audioRef, playLyric, stopLyric) {
  const store = useStore()
  const currentTime = ref(0)
  // 获取playing播放状态
  const playing = computed(() => store.state.playing);
  // 获取当前播放音乐
  const currentSong = computed(() => store.getters.currentSong);
  const progress = computed(() => currentTime.value / currentSong.value.duration)

  let progressChange = false
  const updateTime = (e) => {
    if (!progressChange) {
      currentTime.value = e.target.currentTime
    }
  }

  // 切换音乐的时候currentTime为0
  watch(currentSong, () => currentTime.value = 0)



  const progressChanging = (progress) => {
    progressChange = true
    currentTime.value = currentSong.value.duration * progress
    
    playLyric.value()
    stopLyric.value()
  }

  const progressChanged = (progress) => {
    progressChange = false
    audioRef.value.currentTime = currentTime.value = currentSong.value.duration * progress
    if (!playing.value) {
      store.commit('setPlayingState', true)
    }
    playLyric.value()
  }
  return {
    progress,
    currentTime,
    updateTime,
    progressChanged,
    progressChanging
  }
}