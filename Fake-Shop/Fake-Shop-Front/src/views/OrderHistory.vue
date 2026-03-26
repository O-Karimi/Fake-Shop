<script setup>
import { ref } from 'vue';
import api from '../api';

const email = ref('');
const orders = ref([]);
const loading = ref(false);
const error = ref('');
const hasSearched = ref(false);

const fetchOrders = async () => {
  if (!email.value.trim()) return;
  
  loading.value = true;
  error.value = '';
  hasSearched.value = true;
  orders.value = [];

  try {
    const response = await api.get(`/orders/${email.value}`);
    orders.value = response.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      error.value = "No orders found for this email address.";
    } else {
      error.value = "Failed to fetch orders. Please try again later.";
      console.error(err);
    }
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <div class="orders-container">
    <h2>Track Your Orders</h2>
    <p>Enter the email address you used during checkout to view your order history.</p>

    <form @submit.prevent="fetchOrders" class="search-form">
      <input 
        type="email" 
        v-model="email" 
        placeholder="Enter your email (e.g., buyer@sandbox.com)" 
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Searching...' : 'Find Orders' }}
      </button>
    </form>

    <div v-if="error" class="error-box">{{ error }}</div>

    <div v-if="hasSearched && !loading && orders.length > 0" class="orders-list">
      
      <div v-for="order in orders" :key="order._id" class="order-card">
        <div class="order-header">
          <span class="order-id">Order #{{ order._id }}</span>
          <span class="order-date">{{ formatDate(order.createdAt) }}</span>
        </div>
        
        <div class="order-details">
          <p><strong>Transaction ID:</strong> {{ order.paypalTransactionId }}</p>
          <p><strong>Total Paid:</strong> ${{ order.totalAmount.toFixed(2) }}</p>
        </div>

        <div class="order-products">
          <h4>Items Purchased:</h4>
          <ul>
            <li v-for="item in order.products" :key="item.product._id">
              {{ item.product.title }} (Qty: {{ item.quantity }})
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.orders-container { max-width: 800px; margin: 0 auto; }
.search-form { display: flex; gap: 10px; margin-bottom: 30px; }
.search-form input { flex: 1; padding: 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; }
.search-form button { padding: 12px 24px; background-color: #3498db; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; font-weight: bold; }
.search-form button:disabled { background-color: #95a5a6; }
.error-box { background-color: #ffebee; color: #c62828; padding: 15px; border-radius: 4px; text-align: center; font-weight: bold; }
.orders-list { display: flex; flex-direction: column; gap: 20px; }
.order-card { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
.order-header { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px; }
.order-id { font-weight: bold; color: #2c3e50; }
.order-date { color: #7f8c8d; font-size: 14px; }
.order-details p { margin: 5px 0; }
.order-products { margin-top: 15px; background-color: #f9f9f9; padding: 15px; border-radius: 4px; }
.order-products h4 { margin-top: 0; margin-bottom: 10px; }
.order-products ul { margin: 0; padding-left: 20px; }
</style>