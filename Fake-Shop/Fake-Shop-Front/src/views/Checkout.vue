<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';
import { loadScript } from '@paypal/paypal-js';
import api from '../api';

const cartStore = useCartStore();
const router = useRouter();

const paypalContainer = ref(null);
const error = ref('');
const isProcessing = ref(false);

onMounted(async () => {
  if (cartStore.items.length === 0) {
    router.push('/cart');
    return;
  }

  try {
    const paypal = await loadScript({ 
      "client-id": "test",
      currency: "USD" 
    });

    if (paypal) {
      await paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: cartStore.cartTotal.toFixed(2)
              }
            }]
          });
        },
        
        onApprove: async (data, actions) => {
          isProcessing.value = true;
          error.value = '';
          
          try {
            const order = await actions.order.capture();
            
            await api.post('/orders', {
              email: order.payer.email_address,
              products: cartStore.items.map(item => ({
                product: item._id,
                quantity: item.quantity
              })),
              totalAmount: cartStore.cartTotal,
              paypalTransactionId: order.id
            });

            cartStore.clearCart();
            alert('Sandbox Payment Successful! Order saved to your database.');
            router.push('/');
            
          } catch (err) {
            console.error("Error saving order:", err);
            error.value = "Payment processed, but we failed to save the order to the database.";
          } finally {
            isProcessing.value = false;
          }
        },

        onError: (err) => {
          console.error("PayPal UI Error:", err);
          error.value = "An error occurred with the PayPal Sandbox transaction.";
        }
      }).render(paypalContainer.value);
    }
  } catch (err) {
    console.error("Failed to load the PayPal JS SDK script", err);
    error.value = "Could not load the payment system. Please try again later.";
  }
});
</script>

<template>
  <div class="checkout-container">
    <h2>Secure Checkout</h2>
    
    <div class="checkout-layout">
      <div class="summary-section">
        <h3>Order Summary</h3>
        <div v-for="item in cartStore.items" :key="item._id" class="summary-item">
          <span>{{ item.title }} (x{{ item.quantity }})</span>
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
        <div class="summary-total">
          <strong>Total to Pay:</strong>
          <strong>${{ cartStore.cartTotal.toFixed(2) }}</strong>
        </div>
      </div>

      <div class="payment-section">
        <h3>Payment</h3>
        <p class="sandbox-warning">⚠️ Running in Sandbox Mode. No real money will be charged.</p>
        
        <div v-if="error" class="error-box">{{ error }}</div>
        <div v-if="isProcessing" class="processing">Processing your order...</div>
        
        <div ref="paypalContainer" class="paypal-container"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-container { max-width: 900px; margin: 0 auto; }
.checkout-layout { display: flex; gap: 30px; margin-top: 20px; align-items: flex-start; }
.summary-section, .payment-section { flex: 1; background: white; padding: 25px; border-radius: 8px; border: 1px solid #ddd; }
.summary-item { display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
.summary-total { display: flex; justify-content: space-between; margin-top: 20px; font-size: 18px; }
.sandbox-warning { color: #d35400; background-color: #fdf2e9; padding: 10px; border-radius: 4px; margin-bottom: 20px; font-size: 14px; text-align: center; font-weight: bold; }
.paypal-container { min-height: 150px; z-index: 0; position: relative; }
.error-box { background-color: #ffebee; color: #c62828; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
.processing { text-align: center; font-weight: bold; color: #2980b9; margin-bottom: 15px; }
</style>