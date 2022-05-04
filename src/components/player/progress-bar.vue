<template>
  <div class="progress-bar" ref="progressBarRef" @click="handleClick">
    <div class="progress-line">
      <div class="progress" :style="styleCls" ref="progressRef"></div>
      <div
        class="progress-btn-wrapper"
        :style="styleBtn"
        @touchstart.prevent="touchstart"
        @touchmove.prevent="touchmove"
        @touchend.prevent="touchend"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref, nextTick } from "vue";
const props = defineProps({
  progress: [String, Number],
});
const emit = defineEmits(["progress-changing", "progress-changed"]);
const progressBarRef = ref();
const progressRef = ref();
const offset = ref(0);

watch(
  () => props.progress,
  (newprogress) => {
    offset.value = (progressBarRef.value.clientWidth - 15) * newprogress;
  }
);

const styleCls = computed(() => `width: ${offset.value}px`);
const styleBtn = computed(() => `transform: translate(${offset.value}px)`);
const startOffset = ref(0);
const startBar = ref(0);
const touchstart = (e) => {
  startOffset.value = e.touches[0].pageX;
  startBar.value = progressRef.value.clientWidth;
};
const touchmove = (e) => {
  const tempWidth = startBar.value + (e.touches[0].pageX - startOffset.value);
  const barWidth = progressBarRef.value.clientWidth - 15;
  const progress = Math.min(1, Math.max(0, tempWidth / barWidth));
  emit("progress-changing", progress);
};
const touchend = () => {
  const barWidth = progressBarRef.value.clientWidth - 15;
  const progress = progressRef.value.clientWidth / barWidth;
  emit("progress-changed", progress);
};

const handleClick = (e) => {
  const rect = progressBarRef.value.getBoundingClientRect()
  const barWidth = progressBarRef.value.clientWidth - 15;
  const offsetWidth = e.pageX - rect.left
  const progress = offsetWidth / barWidth;
  emit("progress-changed", progress); 
}
</script>

<style lang='scss' scoped>
.progress-bar {
  height: 30px;
  .progress-line {
    height: 4px;
    position: relative;
    top: 13px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      background: $color-theme;
      height: 100%;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
