<template>
  <AuthLayout>
    <h2>用户登录</h2>
    <LoginForm />
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/components/auth/AuthLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.auth-links {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>