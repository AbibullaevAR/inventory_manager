<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  width?: string,
  height?: string,
  borderRadius?: string
}>(), {
  width: '100%',
  height: '20px',
  borderRadius: '4px'
});

const style = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.borderRadius
}));
</script>

<template>
  <div class="skeleton" :style="style"></div>
</template>

<style scoped>
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(51, 51, 51, 1) 0%,
    rgba(60, 60, 60, 1) 50%,
    rgba(68, 68, 68, 1) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 3s infinite linear;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200%;
  }
  100% {
    background-position: -200%;
  }
}
</style>