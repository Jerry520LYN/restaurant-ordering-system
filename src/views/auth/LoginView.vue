<template>
  <div 
    class="fixed inset-0 bg-cover bg-center"
    :style="{ backgroundImage: `url(${require('@/assets/background.png')})` }"
  >
    <div class="relative flex items-center justify-center h-full"></div>
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  </div>
</template>

<script setup>
import AuthLayout from '@/components/auth/AuthLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>