<script setup>
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
      <a href="/">Home</a>
      <a href="/products">Products</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
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
