<script setup>
import { useCartStore } from '../stores/cart';
import { RouterLink } from 'vue-router';

const cartStore = useCartStore();
</script>

<template>
  <div class="cart-container">
    <h2>Your Shopping Cart</h2>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Your cart is currently empty.</p>
      <RouterLink to="/products" class="shop-btn">Continue Shopping</RouterLink>
    </div>

    <div v-else class="cart-layout">
      
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="item._id" class="cart-item">
          <img :src="item.imageUrl" :alt="item.title" />
          
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p class="price">${{ item.price.toFixed(2) }}</p>
          </div>
          
          <div class="item-actions">
            <span class="quantity">Qty: {{ item.quantity }}</span>
            <button @click="cartStore.removeFromCart(item._id)" class="remove-btn">
              Remove
            </button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Items:</span>
          <span>{{ cartStore.totalItems }}</span>
        </div>
        <div class="summary-row total-row">
          <span>Total:</span>
          <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
        </div>
        
        <RouterLink to="/checkout" class="checkout-btn">Proceed to Checkout</RouterLink>
        
        <button @click="cartStore.clearCart" class="clear-btn">Empty Cart</button>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  max-width: 1000px;
  margin: 0 auto;
}
.empty-cart {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.cart-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}
.cart-items {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}
.item-info {
  flex: 1;
}
.item-info h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
}
.price {
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}
.item-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.remove-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  text-decoration: underline;
}
.cart-summary {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  position: sticky;
  top: 20px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
}
.total-row {
  font-size: 20px;
  font-weight: bold;
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-bottom: 20px;
}
.checkout-btn, .shop-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  margin-bottom: 10px;
}
.clear-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
</style>