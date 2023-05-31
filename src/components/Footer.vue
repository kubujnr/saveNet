<template>
    <footer class=" p-4 bg-gray-100">
        <div class="flex md:w-4/5 mx-auto justify-between">
            <p class="text-gray-500">Copyright &copy;2023. All right reserved.</p>
            <RouterLink to="/terms">Terms and Conditions</RouterLink>
        </div>
    </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>