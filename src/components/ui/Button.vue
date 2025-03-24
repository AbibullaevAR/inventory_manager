<script setup lang="ts">

const props = withDefaults(defineProps<{
  appearance?: 'default' | 'danger'
}>(), {
  appearance: 'default'
});

</script>

<template>
  <button
    v-bind="$attrs"
    :class="[
      'btn',
      `btn_appearance-${appearance}`
    ]"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
@use '@/assets/styles/cursor' as cs;
.btn {
  @include cs.pointer-cursor;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 33px;
  border: none;
  font-family: 'SF Pro Display';
  font-weight: 400;
  font-size: 14px;
  width: 100%;

  &_appearance-default {
    background-color: var(--color-white);
    color: var(--color-black);
  }
  &_appearance-danger {
    background-color: #FA7272;
    color: var(--color-white);
  }
}
</style>