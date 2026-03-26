<script setup>
import Hero from '@/components/Hero.vue';
import { ref } from 'vue';
</script>
<template>
  <Hero :title="'Welcome to our Fake Store!'" :subtitle="'Your one-stop shop for all things fake!'"/>
    <main>
      <section>
        <h2>Don't miss out!</h2>
        <p>Welcome to our fake store! Browse our products and enjoy your shopping experience.</p>
        <router-link to="/products" class="btn">Shop Now</router-link>
        <h2>Don't know what to buy for your fake friends?</h2>
        <p>Check out our gift guide for some inspiration!</p>
        <router-link to="/gift-guide" class="btn">Gift Guide</router-link>
        <h2>Need help?</h2>
        <p>Contact our support team for assistance with your orders or any questions you may have.</p>
        <router-link to="/contact" class="btn">Contact Us</router-link>
      </section>
    </main>
</template>
