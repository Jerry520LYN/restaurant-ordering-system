<template>
    <div class="detailed-card">
        <el-form :model="form" label-width="120px">
            <el-form-item label="订单ID">
                <el-input v-model="form.orderId" />
            </el-form-item>
            <el-form-item label="顾客ID">
                <el-input v-model="form.customerId" />
            </el-form-item>
            <el-form-item label="顾客电话">
                <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="顾客名称">
                <el-input v-model="form.customerName" />
            </el-form-item>
            <el-form-item label="餐桌Id">
                <el-input v-model="form.tableId" />
            </el-form-item>
            <el-form-item label="订单时间">
                <el-input v-model="form.orderTime" />
            </el-form-item>
            <el-form-item label="订单金额">
                <el-input v-model="form.totalAmount" />
            </el-form-item>
            <el-form-item label="结账金额">
                <el-input v-model="form.finalAmount" />
            </el-form-item>
            <el-form-item label="折扣">
                <el-input v-model="form.discount" />
            </el-form-item>
            <el-form-item label="订单状态">
                <el-input v-model="form.status" />
            </el-form-item>
            <el-form-item label="菜品">
                <el-input v-model="form.dishes" />
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="getOrderById">获取订单</el-button>
        <el-button type="primary" @click="closeOrder">关闭订单</el-button>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { ref } from 'vue'
import { useOrderStore } from '@/stores/order'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['closeOrder'])

const form = ref({
  orderId: '',
  customerId: '',
  customerName: '',
  phone: '',
  tableId: '',
  orderTime: '',
  totalAmount: '',
  finalAmount: '',
  discount: '',
  status: '',
  dishes: ''
})

const orderStore = useOrderStore()

async function getOrderById() {
  if (!form.value.orderId) {
    ElMessage.error('订单信息不存在或订单ID为空')
    return
  }
  const response = await orderStore.getOrderById(form.value.orderId)
  form.value = response
}

function closeOrder() {
  emit('closeOrder')
  form.value = {
    orderId: '',
    customerId: '',
    customerName: '',
    phone: '',
    tableId: '',
    orderTime: '',
    totalAmount: '',
    finalAmount: '',
    discount: '',
    status: '',
    dishes: ''
  }
}
</script>