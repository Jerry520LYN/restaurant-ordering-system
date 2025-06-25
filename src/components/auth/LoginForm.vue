<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="username" class="block mb-2">用户名</label>
      <input
        id="username"
        v-model="form.username"
        type="text"
        required
        placeholder="请输入用户名"
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="mb-4">
      <label for="password" class="block mb-2">密码</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        required
        placeholder="请输入密码"
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div v-if="error" class="text-red-500 mb-4">
      {{ error }}
    </div>

    <div class="flex justify-center gap-4">
      <button 
        type="submit" 
        class="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md cursor-pointer"
      >
        登录
      </button>

      <button 
        type="button" 
        @click="goRegister"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        注册
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  username: '',
  password: ''
})

const error = ref(null)

const handleSubmit = async () => {
  error.value = null
  try{
    const result = await authStore.login(form.value);
    if(result){
    ElMessage.success("登录成功");
    router.push('/dashboard/menu');
    }else{
      ElMessage.error("登录失败,请检查账号或者密码");
    }
  }catch(err){
    error.value = err;
  }
}

const goRegister = () => {
  router.push('/register')
}
</script>