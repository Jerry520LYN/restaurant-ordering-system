<template>
  <div class="p-5">
    <h2 class="text-xl font-bold mb-4">叫号服务</h2>
    <el-form :model="form" label-width="100px" class="mb-4">
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="人数">
        <el-input-number v-model="form.peopleNumber" :min="1" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCallNumber">叫号</el-button>
      </el-form-item>
    </el-form>
    <el-divider>当前队列</el-divider>
    <el-table :data="queueList" style="width: 100%" border>
      <el-table-column prop="callingNumberId" label="叫号ID" width="120" align="center" />
      <el-table-column prop="phone" label="手机号" width="180" align="center" />
      <el-table-column prop="peopleNumber" label="人数" width="100" align="center" />
      <el-table-column prop="status" label="状态" width="120" align="center" />
      <el-table-column label="操作" width="120" align="center">
        <template #default="scope">
          <el-button type="danger" size="small" @click="removeNumber(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCallingNumberStore } from '@/stores/callingNumber'

const store = useCallingNumberStore()
const form = ref({ phone: '', peopleNumber: 1 })

const handleCallNumber = async () => {
  if (!form.value.phone || !form.value.peopleNumber) return
  await store.callNumber(form.value.phone, form.value.peopleNumber)
  form.value = { phone: '', peopleNumber: 1 }
}
const removeNumber = async (row) => {
  await store.removeCallingNumber(row.callingNumberId)
}
const queueList = computed(() => {
  // 展示所有队列合并
  if (!store.queues) return []
  return Object.values(store.queues).flat()
})
onMounted(store.getQueues)
</script> 