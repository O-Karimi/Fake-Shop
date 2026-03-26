<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import api from '../api';

const route = useRoute();
const product = ref(null);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const response = await api.get(`/products/${route.params.id}`);
    product.value = response.data;
  } catch (err) {
    error.value = 'Failed to load product details. It might have been deleted.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="details-container">
    <div v-if="loading" class="loading">Loading details...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else-if="product" class="product-layout">
      <div class="image-section">
        <img :src="product.imageUrl" :alt="product.title" />
      </div>
      
      <div class="info-section">
        <h2>{{ product.title }}</h2>
        <p class="category">Category: {{ product.category }}</p>
        <p class="price">${{ product.price.toFixed(2) }}</p>
        <p class="description">{{ product.description }}</p>
        
        <button class="add-to-cart-btn">Add to Cart</button>
        
        <br><br>
        <RouterLink to="/products" class="back-link">← Back to Products</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.product-layout {
  display: flex;
  gap: 30px;
}
.image-section img {
  max-width: 300px;
  border-radius: 8px;
  object-fit: cover;
}
.info-section {
  display: flex;
  flex-direction: column;
}
h2 {
  margin-top: 0;
  margin-bottom: 5px;
}
.category {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.price {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
}
.description {
  line-height: 1.6;
  margin-bottom: 30px;
}
.add-to-cart-btn {
  padding: 12px 24px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  width: fit-content;
}
.add-to-cart-btn:hover {
  background-color: #e67e22;
}
.back-link {
  color: #3498db;
  text-decoration: none;
}
.back-link:hover {
  text-decoration: underline;
}
</style>