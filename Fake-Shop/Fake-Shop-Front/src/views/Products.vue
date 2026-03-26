<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import api from '../api'; // This is the Axios setup we made earlier

const products = ref([]);
const loading = ref(true);
const error = ref(null);

// This runs automatically when the page loads
onMounted(async () => {
  try {
    const response = await api.get('/products');
    products.value = response.data;
  } catch (err) {
    error.value = 'Failed to load products.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="product-page">
    <h2>All Products</h2>
    
    <div v-if="loading">Loading products...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="products.length === 0">No products found. Add some!</div>
    
    <div v-else class="product-grid">
      <div v-for="product in products" :key="product._id" class="product-card">
        <img :src="product.imageUrl" :alt="product.title" />
        <h3>{{ product.title }}</h3>
        <p class="price">${{ product.price.toFixed(2) }}</p>
        
        <RouterLink :to="`/products/${product._id}`" class="btn">View Details</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}
.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  width: 220px;
  text-align: center;
  background: white;
}
.product-card img {
  max-width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}
.price {
  font-weight: bold;
  color: #2c3e50;
}
.btn {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
.error { color: red; }
</style>