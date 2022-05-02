
import { useStore } from "vuex";
import { computed } from "vue";

export default function useFavorite() {
  const store = useStore()
  const favoriteList = computed(() => store.state.favoriteList)

  const getFavoriteIcon = (song) => {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  const isFavorite = (song) => favoriteList.value.some((v) => v.id == song.id)
  const toggleFavorite = (song) => {
    if (isFavorite(song)) {
      remove(song)
    } else {
      save(song)
    }
  }

  const save = (song) => {
    const list = JSON.parse(localStorage.getItem('__favorite__')) || []
    list.unshift(song)
    localStorage.setItem('__favorite__', JSON.stringify(list))
    store.commit('setFavoriteList', list)
  }

  const remove = (song) => {
    const list = JSON.parse(localStorage.getItem('__favorite__')) || []
    const index = list.findIndex((i) => i.id == song.id)
    list.splice(index,1)
    localStorage.setItem('__favorite__', JSON.stringify(list))
    store.commit('setFavoriteList', list)
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}