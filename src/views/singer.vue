<template>
  <div class="singer" v-loading='loading'>
    <IndexList :data="singerList"></IndexList>
  </div>
</template>

<script setup>
import { onMounted,ref } from 'vue'
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list.vue'
const singerList = ref([])
const loading = ref(true)

onMounted(async () => {
  const { singers } = await getSingerList()
  loading.value = false
  singerList.value = singers
})
</script>

<style lang='scss' scoped>
.singer {
  position: relative;
  height: calc(100vh - 88px);
}
</style>
