<script setup>
const message = ref('Hello Vue!');
  const products = ref([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ]);


const newProductName = ref('');
const newProductPrice = ref(0);

function addProduct() {
  const newProduct = {
    id: products.value.length + 1,
    name: newProductName.value,
    price: newProductPrice.value
  };
  products.value.push(newProduct);
  newProductName.value = '';
  newProductPrice.value = 0;
}
</script>

<template>
  <main>
    <section>
      <h2>Products</h2>
      <ul style="list-style-type: none; padding: 0; display: inline;">
        <li v-for="product in products" :key="product.id" style="display: inline;">
          {{ product.name }}: ${{ product.price }} |||| 
        </li>
      </ul>
      <form @submit.prevent="addProduct">
        <input type="text" v-model="newProductName" placeholder="Product Name" required><br> 
        <input type="number" v-model="newProductPrice" placeholder="Product Price" required><br>
        <button type="submit">Add Product</button>
      </form>
    </section>
  </main>
</template>