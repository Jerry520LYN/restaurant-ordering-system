<template>
  <div class="auth-layout">
    <div class="auth-container">
      <header>
        <h1>餐厅点餐系统</h1>
      </header>
      <main>
        <slot />
      </main>
      <footer>
        <p>© 2023 餐厅点餐系统. 保留所有权利.</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.auth-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  color: #42b983;
}

footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: #666;
}
</style>