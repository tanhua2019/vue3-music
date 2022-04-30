import { ref, watch, nextTick, computed, onUnmounted } from 'vue'

export default function useFixed(props) {

  const groupRef = ref(null)
  const listHeights = ref([0])
  const scrollY = ref(0)
  // 当前固定的索引
  const currentIndex = ref(0)
  
  // 观测数据变化, 需要等dom渲染完才可以计算高度
  watch(() => props.data, async () => {
    await nextTick()
    calcHeight()
  })

  // 求列表高度
  function calcHeight() {
    const list = groupRef.value.children
    // 记录区间的高度
    let height = 0
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeights.value.push(height)
    }
  }

  const fixedTitle = computed(() => {
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  // TODO: 有空做个节流优化
  // 监听滚动，获取dom距离顶部可视窗口的距离
  const scrollYListener = function() {
    scrollY.value = -(groupRef.value.getBoundingClientRect().top - 88)
  }
  document.addEventListener('mousewheel', scrollYListener)
  onUnmounted(() => {
    document.removeEventListener('mousewheel', scrollYListener)
  })
  // 监听scroll变量的高度
  watch(scrollY, (newY) => {
    for (let i = 0; i < listHeights.value.length - 1; i++) {
      const heightTop = listHeights.value[i]
      const heightBottom = listHeights.value[i + 1]
      //在区间内改变当前的currentIndex
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i;
      }
    }
  })

  return {
    groupRef,
    fixedTitle,
    currentIndex
  }
}