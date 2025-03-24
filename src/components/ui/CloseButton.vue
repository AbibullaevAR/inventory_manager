<script setup lang="ts">
</script>

<template>
  <button
    class="close-button"
    v-bind="$attrs"
    :aria-label="'Закрыть'"
  >
    <span class="close-button__icon">&times;</span>
  </button>
</template>

<style lang="scss">
@use '@/assets/styles/cursor' as cs;
.close-button {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: transparent;
  @include cs.pointer-cursor;

  &__icon {
    font-size: 20px;
    color: white;
    line-height: 1;
  }
}
</style>
