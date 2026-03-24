<script setup>
import { ref } from 'vue';

const message = ref('Hello Vue!');
  const products = ref([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ]);
</script>

<template>
  <header>
      <h1><a href="#">Fake Store</a></h1>
      <form>
          <input type="search" placeholder="Search..." style="margin-top: 1em;">
          <button type="submit">Search</button>
      </form>        
  </header>
  <nav>
      <a href="#">Home</a>
      <a href="#">Products</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
  </nav>
  <main>
      <section>
          <h2>About</h2>
          <p>This is a simple website template.</p>
          <h2>Most Sold Products</h2>
          <ul style="list-style-type: none; padding: 0; display: inline;">
              <li v-for="product in products" :key="product.id" style="display: inline;">{{ product.name }}: ${{ product.price }} ||||  </li>
          </ul>
          <h2>Contact</h2>
          <p>Email: info@fakestore.com</p>
          <p>Phone: (123) 456-7890</p>
      </section>
  </main>
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
  header {
      background-color: #333;
      color: white;
      padding: 1em;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  main {
      padding: 1em;
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
