<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <header class="text-center mb-8 text-green-500">
        <h1 class="text-3xl font-bold">餐厅点餐系统</h1>
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