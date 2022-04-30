import { ref, computed, nextTick } from 'vue'

export default function useShortcut(props, groupRef, currentIndex) {

  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  function onTouchStart(e) {
    let index = e.target.dataset.index;
    if(index) {
      const targetEl = groupRef.value.children[index]
      currentIndex.value = index
      targetEl.scrollIntoView({ behavior:'smooth' })
    }
  }

  return { shortcutList, onTouchStart }
}
