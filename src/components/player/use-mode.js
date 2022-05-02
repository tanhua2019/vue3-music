
import { useStore } from "vuex";
import { computed } from 'vue'

export default function useMode() {
  const store = useStore()
  const playMode = computed(() => store.state.playMode)

  const modeIcon = computed(() => {
    const param = {
      0: 'icon icon-sequence',
      1: 'icon-loop',
      2: 'icon-random'
    }
    return param[playMode.value]
  })
  
  const changeMode = () => {
    const mode = (playMode.value + 1) % 3
    store.dispatch('changeMode', mode)
  }
  return {
    modeIcon,
    changeMode
  }
}