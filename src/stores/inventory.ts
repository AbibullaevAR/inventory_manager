import { defineStore } from "pinia";
import { InventoryItem } from "./types";
import { computed } from "vue";

const ITEMS_KEY_IN_STORE = 'inventory-items';

export const useInventoryStore = defineStore('inventory', () => {
  const items = computed(() => JSON.parse(localStorage.getItem(ITEMS_KEY_IN_STORE || '[]')) as InventoryItem[]);

  const setItems = (items: InventoryItem[]) => {
    localStorage.setItem(ITEMS_KEY_IN_STORE, JSON.stringify(items));
  }

  return { items, setItems };
});