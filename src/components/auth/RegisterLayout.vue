<template>
    <div class="register-layout">
        <div class="register-container">
            <header>
                <span class="back-arrow" @click="goBack">&#8592;</span>
                <h1>管理员注册</h1>
            </header>
            <main>
                <slot />
            </main>
            <footer>
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

<style scoped>
.register-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.register-container {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: white;
    border-radius: 0.5rem;
}

header {
    text-align: center;
    margin-bottom: 2rem;
    color: #42b983;
}

h1 {
    font-size: 2rem;
}

footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: #666;
}

.back-arrow {
    position: absolute;
    left: 760px;
    top: 240px;
    transform: translateY(-50%);
    font-size: 1.5rem;
    cursor: pointer;
    color: #42b983;
    margin-right: 1rem;
}
</style>