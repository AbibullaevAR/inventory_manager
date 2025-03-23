<script lang="ts" setup>
import type { InventoryItem } from '@/stores/types';

export type Position = {
  x: number,
  y: number
}

withDefaults(defineProps<{
  item: InventoryItem,
  position?: Position,
  isDragging?: boolean
}>(), {
  isDragging: false,
  position: () => {
    return {
      x: 0,
      y: 0
    }
  }
});

const emit = defineEmits<{
  (e: 'mousedown', event: MouseEvent): void
}>()

</script>

<template>
  <div
    :class="[
      'item',
      {
        'item_dragging': isDragging
      }
    ]"
    @mousedown="emit('mousedown', $event)"
    :style="`top: ${position.y}px; left: ${position.x}px;`"
  >
  <div class="item__wrapper">
    <img :src="item.image" alt="Item image">
    <div
      class="item__count"
      :style="`display: ${isDragging ? 'none': 'flex'};`"
    >
      {{ item.count }}
    </div>
  </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/cursor' as cs;
.item {
  width: 105px;
  height: 100px;

  &__wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    @include cs.pointer-cursor;
  }

  &_dragging {
    position: absolute;
    pointer-events: none;
    border: 1px solid var(--color-grey);
    border-radius: 24px;
    transform: translate(-50%, -50%);
  }

  &__count {
    position: absolute;
    bottom: 0;
    right: 0;
    border-top: 1px solid var(--color-grey);
    border-left: 1px solid var(--color-grey);
    border-top-left-radius: 6px;
    color: var(--color-white);
    width: 16px;
    height: 16px;
    font-weight: 500;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>