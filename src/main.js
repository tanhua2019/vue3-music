import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import { Swipe, SwipeItem,List,Cell,Card } from 'vant'
import loadingDirective from '@/components/loading/directives'

// 引入全局样式文件
import '@/assets/scss/index.scss'

createApp(App).use(Swipe).use(SwipeItem).use(List).use(Cell).use(Card).directive('loading', loadingDirective).use(store).use(router).mount('#app')
