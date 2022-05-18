import { ref } from "vue";


export default function useMiddleInteractive() {
  const currentShow = ref('cd')
  const middleLStyle = ref(null)
  const middleRStyle = ref(null)

  let currentView = 'cd'
  const touch = {}

  const onMiddleTouchStart = (e) => {
    touch.startX = e.touches[0].pageX
  }
  const onMiddleTouchMove = (e) => {
    const deltaX = e.touches[0].pageX - touch.startX
    const left = currentView === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
    touch.percent = Math.abs(offsetWidth / window.innerWidth)

    if (currentView === 'cd') {
      if (touch.percent > 0.2) {
        currentShow.value = 'lyric'
      } else {
        currentShow.value = 'cd'
      }
    } else {
      if (touch.percent < 0.8) {
        currentShow.value = 'cd'
      } else {
        currentShow.value = 'lyric'
      }
    }

    middleLStyle.value = {
      opacity: 1 - touch.percent
    }

    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`
    }
  }
  const onMiddleTouchEnd = (e) => {
    let offsetWidth
    let opacity
    if (currentShow.value === 'cd') {
      currentView = 'cd'
      offsetWidth = 0
      opacity = 1
    } else {
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }

    middleLStyle.value = {
      opacity,
      transitionDuration: `1000ms`
    }

    middleRStyle.value = {
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitionDuration: `1000ms`
    }
  }

  return {
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd,
    currentShow,
    middleLStyle,
    middleRStyle,
  }
}