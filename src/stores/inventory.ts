import { defineStore } from "pinia";
import type { InventoryItem } from "./types";
import { computed, ref } from "vue";
import GreenItemImg from '@/assets/images/green-item.png';
import BrownItemImg from '@/assets/images/brown-item.png';
import PurpleItemImg from '@/assets/images/purple-item.png';

const ITEMS_KEY_IN_STORE = 'inventory-items';
const ITEMS_BY_DEFAULT = [
  {
    id: 1,
    count: 3,
    image: GreenItemImg,
    position: 1
  },
  {
    id: 2,
    count: 7,
    image: BrownItemImg,
    position: 7
  },
  {
    id: 3,
    count: 2,
    image: PurpleItemImg,
    position: 2
  }
];

export const useInventoryStore = defineStore('inventory', () => {
  const items = localStorage.getItem(ITEMS_KEY_IN_STORE) ? 
    ref<InventoryItem[]>(JSON.parse(localStorage.getItem(ITEMS_KEY_IN_STORE) || '')) : 
    ref(ITEMS_BY_DEFAULT);

  const positionItemMap = computed(() => {
    const positionMap = {} as Record<number, InventoryItem>;

    items.value.forEach(item => {
      positionMap[item.position] = item;
    });

    return positionMap;
  });

  const setItems = (value: InventoryItem[]) => {
    items.value = value;
    localStorage.setItem(ITEMS_KEY_IN_STORE, JSON.stringify(value));
  }

  return { items, positionItemMap, setItems };
});