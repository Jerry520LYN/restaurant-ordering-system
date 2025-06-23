<template>
  <div class="p-5">
    <h2 class="text-xl font-bold mb-4">创建订单</h2>
    <el-form :model="form" label-width="100px" class="mb-4">
      <el-form-item label="顾客ID">
        <el-input v-model="form.customerId" placeholder="请输入顾客ID" />
      </el-form-item>
      <el-form-item label="餐桌ID">
        <el-input v-model="form.tableId" placeholder="请输入餐桌ID" />
      </el-form-item>
      <el-form-item label="人数">
        <el-input-number v-model="form.peopleCount" :min="1" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCreateOrder">创建订单</el-button>
      </el-form-item>
    </el-form>
    <div v-if="store.lastOrder">
      <el-alert title="订单创建成功" type="success" show-icon :closable="false">
        <div>订单信息：{{ store.lastOrder }}</div>
      </el-alert>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useCheckoutStore } from '@/stores/checkout'

const store = useCheckoutStore()
const form = ref({ customerId: '', tableId: '', peopleCount: 1 })

const handleCreateOrder = async () => {
  if (!form.value.customerId || !form.value.tableId || !form.value.peopleCount) return
  await store.createOrder(form.value.tableId, form.value.customerId, form.value.peopleCount)
}
</script> 