<template>
  <main class="h-screen bg-hero text-slate-950 flex flex-col justify-center">
    <div class="md:w-3/5 md:mx-auto lg:w-1/2 px-8 space-y-8">
      <h1 class="text-2xl font-medium text-center">SaveNet youtube downloader: Safe downloading with us</h1>
      <div class="space-y-2">
        <form class="flex gap-4" @submit.prevent="handleSubmit">
          <input type="text" v-model="url" name="url" placeholder="Please past your video link here..." class="p-2 shadow rounded flex-1 outline-none">
          <input type="submit" value="Download" class="px-4 py-2 text-xs md:text-sm shadow rounded outline-none font-medium bg-green-300">
        </form>
        <p class="text-sm">
          By using our service you accept our <RouterLink to="/terms" class="text-blue-600">Terms of Use</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router';

  const url = ref('')

  const router = useRouter()

  const handleSubmit = (e) => {
    console.log(url.value.includes("v="));
    if (url.value == '' && url.value.includes('v=')) {
      return
    }


    const videoId = url.value.split("v=")[1];

    router.push('/details?videoID=' + videoId)
  }
</script>
