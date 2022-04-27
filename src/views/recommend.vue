<template>
  <div>1</div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { getRecommend } from '@/service/recommend'
onBeforeMount(async () => {
  const result = await getRecommend()
  console.log(result)
})
</script>

<style lang='scss' scoped>
</style>
