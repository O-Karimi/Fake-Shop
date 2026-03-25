<script setup>
import Navbar from './components/Navbar.vue';
import router from './router';

</script>

<template>
  <Navbar />
  <router-view />
  <footer>
      <p>&copy; 2026 Fake Store</p>
  </footer>
</template>

<style scoped>
  body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
  }

  main {
      padding: 1em;
  }
  
  footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 1em;
      position: fixed;
      width: 100%;
      bottom: 0;
  }
</style>
