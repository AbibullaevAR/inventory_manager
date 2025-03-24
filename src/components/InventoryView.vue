<script setup lang="ts">
import Item from './Item.vue';
import { ref } from 'vue';
import { useInventoryStore } from '@/stores/inventory';
import type { InventoryItem } from '@/stores/types';


const emit = defineEmits<{
  (e: 'update:selectedItemId', value: number): void
}>();

const inventoryElement = ref<HTMLElement>();
const inventoryStore = useInventoryStore();
const draggedItem = ref<null | InventoryItem>(null);
const position = ref({
  x: 0,
  y: 0
});
let dragStartTimeout: number;

const itemMousedownHandler = (item: InventoryItem) => {
  dragStartTimeout = setTimeout(() => dragStart(item), 90);
}

const itemMouseupHandler = (selectedItemId: number) => {
  emit('update:selectedItemId', selectedItemId);
  clearTimeout(dragStartTimeout);
}

const mousemoveHandler = (event: MouseEvent) => {
  const rect = inventoryElement.value?.getBoundingClientRect() || { x: 0, y: 0 };
  position.value.x = event.x - rect?.x;
  position.value.y = event.y - rect?.y;
}

const dragStart = (item: InventoryItem) => {
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
    ref="inventoryElement"
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
        @mouseup="itemMouseupHandler(inventoryStore.positionItemMap[index].id)"
        @mousedown="itemMousedownHandler(inventoryStore.positionItemMap[index])"
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
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-grey);
  position: relative;

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