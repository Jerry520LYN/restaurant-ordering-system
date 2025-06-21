<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg relative">
            <header class="text-center mb-8 text-green-500">
                <span class="absolute left-4 top-4 text-2xl cursor-pointer text-green-500 hover:text-green-600" @click="goBack">&#8592;</span>
                <h1 class="text-3xl font-bold">管理员注册</h1>
            </header>
            <main>
                <slot />
            </main>
            <footer class="mt-8 text-center text-sm text-gray-500">
                <p>-----Jerry的餐厅点餐系统-----</p>
            </footer>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack() {
  router.push('/')
}
</script>