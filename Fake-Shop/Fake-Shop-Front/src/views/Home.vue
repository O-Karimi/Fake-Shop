<script setup>
import Hero from '@/components/Hero.vue';
import { ref } from 'vue';
</script>
<template>
<div class="home-container">
    
    <Hero 
      title="The #1 Destination for Things That Don't Exist" 
      subtitle="Need to buy a birthday gift for your imaginary friends? Trying to impress your fake followers with items you'll never actually receive? You are in the right place."
    >
      <RouterLink to="/products" class="cta-button">Shop the Illusion</RouterLink>
    </Hero>

    <section class="company-info">
      <h2>Why Pretend to Choose Us?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Zero Shipping Time</h3>
          <p>Why wait 3-5 business days? Our products arrive in your imagination the exact moment your PayPal Sandbox payment clears. Instant gratification!</p>
        </div>
        <div class="feature-card">
          <h3>100% Eco-Friendly</h3>
          <p>We use exactly zero plastic, zero cardboard, and zero delivery trucks. Because our entire inventory is made of MongoDB documents.</p>
        </div>
        <div class="feature-card">
          <h3>No Returns Needed</h3>
          <p>You literally cannot return these items because you will never physically hold them. Our customer service department is just a void you can yell into!</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* I removed the .hero and .hero-content CSS because your Hero component 
  should be handling its own styling now! 
*/

.cta-button {
  display: inline-block;
  margin-top: 20px;
  padding: 15px 30px;
  background-color: #f1c40f;
  color: #2c3e50;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 30px;
  transition: transform 0.2s, background-color 0.2s;
}

.cta-button:hover {
  background-color: #f39c12;
  transform: translateY(-2px);
}

/* Company Information Styling */
.company-info {
  text-align: center;
  padding: 20px;
}

.company-info h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
}

.features-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.feature-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.feature-card h3 {
  color: #8e44ad;
  margin-bottom: 15px;
}

.feature-card p {
  color: #666;
  line-height: 1.5;
}
</style>