<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import api from '../api';

const authStore = useAuthStore();
const router = useRouter();

const orders = ref([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  try {
    const response = await api.get(`/orders/${authStore.user.email}`);
    orders.value = response.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      error.value = "You haven't bought any imaginary items yet.";
    } else {
      error.value = "Failed to fetch orders. The void is uncooperative today.";
      console.error(err);
    }
  } finally {
    loading.value = false;
  }
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <div class="orders-container">
    <h2>Your Imaginary Haul</h2>
    <p>Welcome back, {{ authStore.user.name }}. Here is a list of things that don't exist.</p>

    <div v-if="loading" class="loading-box">Summoning your order history...</div>

    <div v-else-if="error" class="error-box">{{ error }}</div>

    <div v-else-if="orders.length > 0" class="orders-list">
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
.loading-box { text-align: center; font-size: 18px; color: #8e44ad; padding: 20px; }
.error-box { background-color: #ffebee; color: #c62828; padding: 15px; border-radius: 4px; text-align: center; font-weight: bold; }
.orders-list { display: flex; flex-direction: column; gap: 20px; margin-top: 20px; }
.order-card { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
.order-header { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px; }
.order-id { font-weight: bold; color: #2c3e50; }
.order-date { color: #7f8c8d; font-size: 14px; }
.order-details p { margin: 5px 0; }
.order-products { margin-top: 15px; background-color: #fdf2e9; padding: 15px; border-radius: 4px; }
.order-products h4 { margin-top: 0; margin-bottom: 10px; color: #d35400; }
.order-products ul { margin: 0; padding-left: 20px; }
</style>