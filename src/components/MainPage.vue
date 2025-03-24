<script setup lang="ts">
import { computed, ref } from 'vue';
import InventoryItemAsideMenu from '@/components/InventoryItemAsideMenu.vue';
import InventoryView from '@/components/InventoryView.vue';
import InventoryInfoPanel from '@/components/InventoryInfoPanel.vue';
import InventoryFooter from '@/components/InventoryFooter.vue';
import { useInventoryStore } from '@/stores/inventory';

const inventoryStore = useInventoryStore();
const selectedItemId = ref<number>(1);
const showAsideItemMenu = ref(false);
const selectedItem = computed(() => inventoryStore.items.find(item => item.id === selectedItemId.value));

const handelUpdateSelectedItemId = (value: number) => {
  selectedItemId.value = value;
  showAsideItemMenu.value = true;
}

</script>

<template>
  <div class="main-page">
    <InventoryInfoPanel class="main-page__info-panel" />
    <div class="main-page__inventory">
      <InventoryView
        @update:selected-item-id="handelUpdateSelectedItemId"
      />
      <InventoryItemAsideMenu
        v-if="selectedItem"
        v-model:show="showAsideItemMenu"
        :item="selectedItem"
      />
    </div>
    <InventoryFooter class="main-page__footer" />
  </div>
</template>

<style lang="scss">
.main-page {
  display: grid;
  grid-template-rows: 501px auto;
  grid-template-columns: 236px 1fr;
  gap: 24px;
  grid-template-areas: 
  "info-panel inventory"
  "footer footer";
  height: 600px;
  width: 785px;
  position: relative;
  overflow: hidden;

  &__info-panel {
    grid-area: info-panel;
  }
  &__inventory {
    grid-area: inventory;
    overflow: hidden;
  }
  &__footer {
    grid-area: footer;
  }
}
</style>
