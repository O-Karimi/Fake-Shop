<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    title:{
        type: String,
        default: 'Fake Store',
    },
    subtitle: {
        type: String,
        default: 'Welcome to our store!',
    }
});
</script>
<template>
    <section class="hero">
        <h1>{{ props.title }}</h1>
        <p>{{ props.subtitle }}</p>
    </section>
</template>
<style scoped>
    .hero {
        background-color: #f4f4f4;
        padding: 2em;
        text-align: center;
    }
    .hero h1 {
        margin: 0;
        font-size: 2.5em;
    }
    .hero p {
        font-size: 1.2em;
        color: #666;
    }
</style>