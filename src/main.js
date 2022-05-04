import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import { Swipe, SwipeItem, List, Cell, Card, Slider } from 'vant'
import loadingDirective from '@/components/loading/directives'

// 引入全局样式文件
import '@/assets/scss/index.scss'
const app = createApp(App);

app.config.globalProperties.$filters = {
  formatTime: (val) => {
    val = Math.floor(val)
    const minute = (Math.floor(val / 60) + '').padStart(2, '0')
    const second = (val % 60 + '').padStart(2, '0')
    return `${minute}:${second}`
  }
}

app.use(Swipe).use(SwipeItem).use(List).use(Cell).use(Card).use(Slider).directive('loading', loadingDirective).use(store).use(router).mount('#app')
