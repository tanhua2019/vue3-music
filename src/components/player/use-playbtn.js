import { useStore } from "vuex";
import { computed } from 'vue'

export default function usePlayBtn() {
  const store = useStore();
  // 获取playing播放状态
  const playing = computed(() => store.state.playing);
  // 根据播放状态计算icon
  const playIcon = computed(() => (playing.value ? "icon-pause" : "icon-play"));

  // 切换播放状态
  const togglePlay = () => {
    store.commit("setPlayingState", !playing.value);
  };

  return {
    playIcon,
    togglePlay
  }
}