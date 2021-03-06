import { get } from './base'

export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  return get('/api/getSongsUrl', {
    mid: songs.map(song => {
      return song.mid
    })
  }).then((res) => {
    const map = res.map;
    return songs.map((song) => {
      song.url = map[song.mid]
      return song
    }).filter(song => {
      return song.url.indexOf('vkey') > -1
    })
  })
}


export function getLyric(song) {
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }
  const mid = song.mid
  return get('/api/getLyric', { mid }).then(res => {
    return res ? res.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
  })
}