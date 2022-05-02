import { PLAY_MODE, SEARCH_KEY, FAVORITE_KEY } from '@/store/constant'

const state = {
  sequenceList: [],
  playlist: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [],
  searchHistory: JSON.parse(localStorage.getItem(SEARCH_KEY)) || [],
  playHistory: []
}

export default state
