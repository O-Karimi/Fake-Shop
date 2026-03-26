import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  const addToCart = (product) => {
    const existingItem = items.value.find(item => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (productId) => {
    items.value = items.value.filter(item => item._id !== productId);
  };

  const clearCart = () => {
    items.value = [];
  };

  return { items, totalItems, cartTotal, addToCart, removeFromCart, clearCart };
});