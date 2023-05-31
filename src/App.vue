<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="text-slate-950">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>