<template>
  <div class="loading">
    <div class="loading-content">
      <img width="24" height="24" src="./loading.gif">
      <p class="desc">{{title}}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const title = ref('正在载入...')
const setTitle = function(val) {
  title.value = val
}
defineExpose({
  setTitle
})
</script>

<style lang="scss" scoped>
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .loading-content {
      text-align: center;
      .desc {
        line-height: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
      }
    }
  }
</style>
