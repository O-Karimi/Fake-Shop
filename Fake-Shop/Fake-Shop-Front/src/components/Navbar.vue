<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();
const globalSearch = ref('');

const submitSearch = () => {
  if (globalSearch.value.trim() !== '') {
    router.push({ path: '/products', query: { search: globalSearch.value } });
    
    globalSearch.value = ''; 
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
<template>
  <header>
    <h1><RouterLink to="/">Fake Store</RouterLink></h1>
    <div>
    <form @submit.prevent="submitSearch" class="nav-search">
    <input 
        type="text" 
        v-model="globalSearch" 
        placeholder="Search store..." 
        required
    />
    <button type="submit">Search</button>
    </form>
      <div class="auth-actions">
          <template v-if="authStore.isAuthenticated">
            <span>Welcome, {{ authStore.user.name }}!</span>
            <button @click="handleLogout">Logout</button>
          </template>
          <template v-else>
            <RouterLink to="/login" style="color: thistle;">Login</RouterLink>
          </template>
        </div>
      </div>
  </header>
  <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/products">Products</RouterLink>
      <template v-if="authStore.isAuthenticated">
        <RouterLink to="/add-product">Add Product</RouterLink>
        <RouterLink to="/orders">My Orders</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
      </template>
      <RouterLink to="/register">Sign Up</RouterLink>
<!--       <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
 -->  <RouterLink to="/cart" class="cart-link">
        Cart ({{ cartStore.totalItems }})
      </RouterLink>
  </nav>

</template>

<style scoped>
    header {
      background-color: #333;
      color: white;
      padding: 1em;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    nav {
      display: flex;
      background-color: #444;
      color: white;
      text-decoration: none;
      justify-content: space-around;
      padding: 0.5em;
    }
    h1 a {
        color: white;
        text-decoration: none;
        padding: 0.5em 1em;
    }
    nav a {
        color: white;
        text-decoration: none;
        padding: 0.5em 1em;
    }
    nav a:hover {
        background-color: #555;
    }
    .cart-link {
    color: #e67e22 !important;
    font-weight: 900 !important;
}
</style>
