<script setup lang="ts">
import Skeleton from '@/components/ui/Skeleton.vue';
import Button from '@/components/ui/Button.vue';
import type { InventoryItem } from '@/stores/types';
import { ref, toRefs, watch } from 'vue';
import { useInventoryStore } from '@/stores/inventory';
import CloseButton from '@/components/ui/CloseButton.vue';

const props = defineProps<{
  item: InventoryItem
  show: boolean
}>();
const { item } = toRefs(props);

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const inventoryStore = useInventoryStore();
const itemCount = ref(item.value.count);
const showDeleteActions = ref(false);

const countApplyHandler = () => {
  inventoryStore.updateItemCount(item.value.id, itemCount.value);
  showDeleteActions.value = false;
}

watch(item, () => {
  itemCount.value = item.value.count;
});

</script>

<template>
  <div
    :class="[
      'inventory-item-aside-menu',
      {
        'inventory-item-aside-menu_show': show
      }
    ]"
  >
    <CloseButton @click="emit('update:show', false)" class="inventory-item-aside-menu__close-button" />
    <picture class="inventory-item-aside-menu__image">
      <img :src="item.image" alt="Inventory item image">
    </picture>
    <div class="inventory-item-aside-menu__content">
      <Skeleton :height="'30px'" :width="'100%'" />
      <Skeleton :height="'10px'" :width="'100%'" />
      <Skeleton :height="'10px'" :width="'100%'" />
      <Skeleton :height="'10px'" :width="'100%'" />
      <Skeleton :height="'10px'" :width="'180px'" />
      <Skeleton :height="'10px'" :width="'80px'" />
    </div>
    <div class="inventory-item-aside-menu__footer">
      <Button @click="showDeleteActions = true" :appearance="'danger'">Удалить предмет</Button>
    </div>
    <div
      :class="[
        'inventory-item-aside-menu__delete-action',
        {
          'inventory-item-aside-menu__delete-action_show': showDeleteActions
        }
      ]"
    >
      <input v-model="itemCount" type="text" placeholder="Введите количество">
      <div class="inventory-item-aside-menu__action-buttons">
        <Button @click="showDeleteActions = false" :appearance="'default'">Отмена</Button>
        <Button @click="countApplyHandler" :appearance="'danger'">Подтвердить</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.inventory-item-aside-menu {
  position: absolute;
  right: 0;
  top: 0;
  $base-padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-grey);
  padding: $base-padding;
  overflow: hidden;
  transition: transform 0.3s;
  transform: translateX(100%);
  background-color: var(--color-black);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;

  &_show {
    transform: translateX(0);
  }
  &__close-button {
    position: absolute;
    top: 8px;
    right: 8px;
  }
  &__image {
    padding: calc(55px - $base-padding) calc(60px - $base-padding) 30px calc(60px - $base-padding);

    img {
      display: block;
      width: 130px;
      height: 130px;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 100%;
    border-top: 1px solid var(--color-grey);
    border-bottom: 1px solid var(--color-grey);
    padding: 16px 0 24px 0;

    :first-child {
      margin-bottom: 16px;
    }
  }
  &__footer {
    width: 100%;
    padding-top: 18px;
  }
  &__delete-action {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding: 20px;
    bottom: -100%;
    background-color: var(--color-black);
    border-top: 1px solid var(--color-grey);

    &_show {
      bottom: 0;
    }

    input {
      background-color: transparent;
      border-radius: 4px;
      padding: 12px;
      border: 1px solid var(--color-grey);
      color: var(--color-white);
      &::placeholder {
        color: var(--color-grey);
      }
    }
  }
  &__action-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
}
</style>