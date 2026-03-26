<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const globalSearch = ref('');

const submitSearch = () => {
  if (globalSearch.value.trim() !== '') {
    router.push({ path: '/products', query: { search: globalSearch.value } });
    
    globalSearch.value = ''; 
  }
};
</script>
<template>
  <header>
    <h1><RouterLink to="/">Fake Store</RouterLink></h1>
    <form @submit.prevent="submitSearch" class="nav-search">
    <input 
        type="text" 
        v-model="globalSearch" 
        placeholder="Search store..." 
        required
    />
    <button type="submit">Search</button>
    </form>      
  </header>
  <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/products">Products</RouterLink>
      <RouterLink to="/add-product">Add Product</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
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
</style>
