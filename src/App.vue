<template>
  <Header></Header>
  <Tab></Tab>
  <router-view></router-view>
  <Player></Player>
</template>

<script setup>
import Header from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
import Player from '@/components/player/player.vue'
</script>

<style lang="scss">
</style>
