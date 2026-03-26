<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const userData = ref({ name: '', email: '', password: '' });
const isLoading = ref(false);
const error = ref('');
const successMessage = ref('');

const registerUser = async () => {
  isLoading.value = true;
  error.value = '';
  successMessage.value = '';

  try {
    await api.post('/users/register', userData.value);
    successMessage.value = 'Account created! You are officially a fake customer.';
    
    userData.value = { name: '', email: '', password: '' };
    
    setTimeout(() => router.push('/products'), 2000);
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to create account. The void is full.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="register-container">
    <h2>Join the Illusion</h2>
    <p>Create your fake account to start hoarding imaginary items.</p>

    <div v-if="error" class="error-box">{{ error }}</div>
    <div v-if="successMessage" class="success-box">{{ successMessage }}</div>

    <form @submit.prevent="registerUser" class="register-form">
      <div class="form-group">
        <label for="name">Fake Name</label>
        <input type="text" id="name" v-model="userData.name" required placeholder="John Doe" />
      </div>

      <div class="form-group">
        <label for="email">Burner Email</label>
        <input type="email" id="email" v-model="userData.email" required placeholder="john@example.com" />
      </div>

      <div class="form-group">
        <label for="password">Meaningless Password</label>
        <input type="password" id="password" v-model="userData.password" required placeholder="••••••••" />
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Creating...' : 'Create Account' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.register-container { max-width: 400px; margin: 40px auto; text-align: center; }
.register-form { display: flex; flex-direction: column; gap: 15px; background: white; padding: 30px; border-radius: 8px; border: 1px solid #ddd; text-align: left; }
.form-group { display: flex; flex-direction: column; }
label { margin-bottom: 5px; font-weight: bold; color: #2c3e50; }
input { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; }
button { padding: 12px; background-color: #8e44ad; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; font-weight: bold; margin-top: 10px; }
button:disabled { background-color: #bdc3c7; }
.error-box { background-color: #ffebee; color: #c62828; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
.success-box { background-color: #e8f8f5; color: #27ae60; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
</style>