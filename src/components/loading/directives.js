import { addClass, removeClass } from '@/assets/js/dom'
import { createApp } from 'vue'
import Loading from './loading.vue'

const loadingDirective = {
  mounted(el, binding) {
    const title = binding.arg;
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    if(title) {
      instance.setTitle(title)
    }
    if (binding.value) {
      append(el)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

function append(el) {
  const style = getComputedStyle(el)
  if (!['absolute', 'fixed', 'relative'].includes(style.position)) {
    addClass(el, 'g-relative')
  }
  el.appendChild(el.instance.$el)
}

function remove(el) {
  removeClass(el, 'g-relative')
  el.removeChild(el.instance.$el)
}


export default loadingDirective;