import { computed, ref, watch } from "vue";
import { createLogger, useStore } from "vuex";
import { getLyric } from "@/service/song";
import Lyric from "lyric-parser";

export default function useLyric({ songReady, currentTime, playLyric, stopLyric }) {
  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)
  const currentLyric = ref(null)
  const currentLineNum = ref(0)
  const lyricListRef = ref(null)
  const playingLyric = ref('')

  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return
    }
    stopLyric.value()
    currentLineNum.value = 0
    currentLyric.value = null
    playingLyric.value = ''

    const lyric = await getLyric(newSong)
    store.commit('addSongLyric', { song: newSong, lyric })
    currentLyric.value = new Lyric(lyric, handleLyric);
    if (songReady.value) {
      playLyric.value()
    }

  })

  playLyric.value = () => {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  stopLyric.value = () => {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  const handleLyric = ({ lineNum, txt }) => {
    playingLyric.value = txt
    currentLineNum.value = lineNum
    const listEl = lyricListRef.value
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      lineEl.scrollIntoView({ behavior:'smooth' })
    } else {
      listEl.scrollIntoView()
    }
  }

  

  return {
    currentLyric,
    currentLineNum,
    lyricListRef,
    playingLyric
  }
}