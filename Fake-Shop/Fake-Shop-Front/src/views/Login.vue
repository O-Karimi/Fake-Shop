<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref('');

const handleLogin = async () => {
  isLoading.value = true;
  error.value = '';

  const result = await authStore.login(email.value, password.value);

  if (result.success) {
    router.push('/products');
  } else {
    error.value = result.message;
  }
  
  isLoading.value = false;
};
</script>

<template>
  <div class="login-container">
    <h2>Re-enter the Illusion</h2>
    <p>Log in to access your imaginary cart and non-existent orders.</p>

    <div v-if="error" class="error-box">{{ error }}</div>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Burner Email</label>
        <input type="email" id="email" v-model="email" required placeholder="john@example.com" />
      </div>

      <div class="form-group">
        <label for="password">Meaningless Password</label>
        <input type="password" id="password" v-model="password" required placeholder="••••••••" />
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Entering...' : 'Log In' }}
      </button>
    </form>
    
    <p class="signup-prompt">
      Don't have a fake account yet? <RouterLink to="/register">Sign up here</RouterLink>.
    </p>
  </div>
</template>

<style scoped>
.login-container { max-width: 400px; margin: 40px auto; text-align: center; }
.login-form { display: flex; flex-direction: column; gap: 15px; background: white; padding: 30px; border-radius: 8px; border: 1px solid #ddd; text-align: left; }
.form-group { display: flex; flex-direction: column; }
label { margin-bottom: 5px; font-weight: bold; color: #2c3e50; }
input { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; }
button { padding: 12px; background-color: #3498db; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; font-weight: bold; margin-top: 10px; }
button:disabled { background-color: #bdc3c7; }
.error-box { background-color: #ffebee; color: #c62828; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
.signup-prompt { margin-top: 20px; font-size: 14px; }
.signup-prompt a { color: #8e44ad; font-weight: bold; text-decoration: none; }
</style>