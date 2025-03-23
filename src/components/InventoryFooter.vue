<script lang="ts" setup>
import Skeleton from '@/components/ui/Skeleton.vue';
</script>

<template>
  <div class="inventory-footer">
    <Skeleton :width="'80%'" :height="'36px'" />
  </div>
</template>

<style lang="scss">
.inventory-footer {
  padding: 18px;
  border: 1px solid var(--color-grey);
  border-radius: 12px;
}
</style>