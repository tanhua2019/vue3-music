import axios from 'axios'

const ERR_OK = 0
const baseUrl = '/'

axios.default.baseUrl = baseUrl

export function get(url, params) {
  return axios.get(url, {
    params
  }).then(res => {
    const serverData = res.data
    console.log(serverData, '999')
    if (serverData.code === ERR_OK) {
      return serverData.result
    }
  }).catch(e => {
    console.log(e)
  })
}
