<script lang="ts" setup>
import Skeleton from '@/components/ui/Skeleton.vue';
</script>

<template>
  <div class="inventory-info-panel">
    <picture class="inventory-info-panel__image">
      <img src="../assets/images/Blur.png">
    </picture>
    <div class="inventory-info-panel__content">
      <Skeleton :width="'190px'" :height="'26px'"/>
      <Skeleton :width="'155px'" :height="'10px'"/>
      <Skeleton :width="'190px'" :height="'10px'"/>
      <Skeleton :width="'170px'" :height="'10px'"/>
      <Skeleton :width="'160px'" :height="'10px'"/>
      <Skeleton :width="'140px'" :height="'10px'"/>
      <Skeleton :width="'80px'" :height="'10px'"/>
    </div>
  </div>
</template>

<style lang="scss">
.inventory-info-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 18px 14px 24px 14px;
  border: 1px solid var(--color-grey);
  border-radius: 12px;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    :first-child {
      margin-bottom: 16px;
    }
    :last-child {
      margin-top: 16px;
    }
  }
}
</style>