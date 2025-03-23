<script setup lang="ts">
import Item from './Item.vue';
import { ref } from 'vue';
import { useInventoryStore } from '@/stores/inventory';
import type { InventoryItem } from '@/stores/types';

const inventoryStore = useInventoryStore();
const draggedItem = ref<null | InventoryItem>(null);
const position = ref({
  x: 0,
  y: 0
});

const mousemoveHandler = (event: MouseEvent) => {
  position.value.x = event.x;
  position.value.y = event.y;
}

const onDragStart = (item: InventoryItem) => {
  draggedItem.value = {...item};
};

const onDrop = (inventorySlotIndex: number) => {
  if (draggedItem.value){
    const itemInDroppedSlot = inventoryStore.items.find(item => item.position === inventorySlotIndex);
    if (itemInDroppedSlot) swapItemsPosition(itemInDroppedSlot, draggedItem.value);

    draggedItem.value.position = inventorySlotIndex;
    
    inventoryStore.setItems([
      draggedItem.value,
      ...inventoryStore.items.filter(item => item.id !== draggedItem.value?.id)
    ]);
  }
  draggedItem.value = null;
};

const swapItemsPosition = (item1: InventoryItem, item2: InventoryItem) => {
  const temp = item1.position;
  item1.position = item2.position;
  item2.position = temp;
}
</script>

<template>
  <div
    :class="[
      'inventory-view',
      {
        'inventory-view_action': !!draggedItem
      }
    ]"
    @mousemove="mousemoveHandler"
  >
    <div
      v-for="index in 25"
      :key="index"
      @mouseup="onDrop(index)"
      class="inventory-view__cell"
    >
      <Item
        v-if="inventoryStore.positionItemMap[index]"
        @mousedown="onDragStart(inventoryStore.positionItemMap[index])"
        :item="inventoryStore.positionItemMap[index]"
        :is-dragging="inventoryStore.positionItemMap[index]?.id === draggedItem?.id"
        :position="position"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/cursor' as cs;
.inventory-view {
  display: grid;
  grid-template-columns: repeat(5, 105px);
  grid-template-rows: repeat(5, 100px);

  &_action {
    @include cs.grab-cursor;
  }

  &__cell {
    border: 1px solid var(--color-grey);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>