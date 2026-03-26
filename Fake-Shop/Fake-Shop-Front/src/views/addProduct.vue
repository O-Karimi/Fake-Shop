<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();

const productData = ref({
  title: '',
  description: '',
  price: 0,
  imageUrl: '',
  category: ''
});

const isSubmitting = ref(false);
const errorMessage = ref('');

const submitProduct = async () => {
  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    await api.post('/products', productData.value);
    
    router.push('/products');
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to add product. Please try again.';
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="add-product-container">
    <h2>Add a New Product</h2>
    
    <div v-if="errorMessage" class="error-box">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="submitProduct" class="product-form">
      <div class="form-group">
        <label for="title">Product Title</label>
        <input type="text" id="title" v-model="productData.title" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="productData.description" required></textarea>
      </div>

      <div class="form-group">
        <label for="price">Price ($)</label>
        <input type="number" id="price" v-model="productData.price" step="0.01" min="0" required />
      </div>

      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input type="url" id="imageUrl" v-model="productData.imageUrl" required placeholder="https://..." />
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <input type="text" id="category" v-model="productData.category" required />
      </div>

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        {{ isSubmitting ? 'Saving...' : 'Add Product' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.add-product-container {
  max-width: 500px;
  margin: 0 auto;
}
.product-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.form-group {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 5px;
  font-weight: bold;
}
input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
textarea {
  resize: vertical;
  min-height: 80px;
}
.submit-btn {
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
}
.submit-btn:disabled {
  background-color: #9e9e9e;
}
.error-box {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}
</style>