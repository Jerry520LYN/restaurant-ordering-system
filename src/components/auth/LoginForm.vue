<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="username">用户名</label>
      <input
        id="username"
        v-model="form.username"
        type="text"
        required
        placeholder="请输入用户名"
      />
    </div>

    <div class="form-group">
      <label for="password">密码</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        required
        placeholder="请输入密码"
      />
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

  <div class="button-container">
    <button type="submit" :disabled="isLoading">
      {{ isLoading ? '登录中...' : '登录' }}
    </button>

    <button type="button" @click="goRegister">
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
    router.push('/dashboard');
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

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}


button {
  background-color: #42b983;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
}
</style>