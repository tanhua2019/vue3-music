import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default function useCd() {
  const store = useStore()
  const cdRef = ref(null)
  const cdImageRef = ref(null)

  const cdClass = computed(() => {
    return store.state.playing ? 'playing' : ''
  })

  watch(() => store.state.playing, (newPlaying) => {
    if(!newPlaying) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  const syncTransform = (wrapper, inner) => {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : wrapperTransform.concat('', innerTransform)
  }

  return {
    cdClass,
    cdRef,
    cdImageRef
  }
}