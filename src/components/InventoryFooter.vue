<script lang="ts" setup>
import Skeleton from '@/components/ui/Skeleton.vue';
import CloseButton from '@/components/ui/CloseButton.vue';
</script>

<template>
  <div class="inventory-footer">
    <CloseButton class="inventory-footer__close-button" />
    <Skeleton :width="'95%'" :height="'36px'" />
  </div>
</template>

<style lang="scss">
.inventory-footer {
  padding: 18px;
  border: 1px solid var(--color-grey);
  border-radius: 12px;
  position: relative;

  &__close-button {
    position: absolute;
    top: 8px;
    right: 8px;
  }
}
</style>