<template>
  <div class="p-5">
    <span class="flex justify-between items-center mb-5">
      <h2 class="m-0 text-gray-800 text-xl font-bold">订单信息管理</h2>
      <div class="flex gap-2">
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" style="margin-right: 10px;" />
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button type="primary" @click="orderStore.fetchOrderList">刷新订单列表</el-button>
      </div>
    </span>
    <el-table :data="filteredOrders" style="width: 100%" stripe border empty-text="暂无订单信息">
      <el-table-column prop="orderId" label="订单ID" width="120" align="center" />
      <el-table-column prop="customerName" label="顾客姓名" width="160" align="center" />
      <el-table-column prop="tableName" label="餐桌" width="120" align="center" />
      <el-table-column prop="orderDate" label="下单日期" width="160" align="center" />
      <el-table-column prop="totalAmount" label="总金额" width="120" align="center">
        <template #default="scope">¥{{ scope.row.totalAmount }}</template>
      </el-table-column>
      <el-table-column label="操作" width="220" align="center" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteOrder(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="!filteredOrders || filteredOrders.length === 0" class="flex justify-center items-center min-h-50">
      <el-empty description="暂无订单数据" />
    </div>
    <div class="mt-5 text-right text-lg font-bold">
      <span>总营收：<span class="text-green-600">¥{{ totalRevenue }}</span></span>
    </div>
    <!-- 编辑订单菜品弹窗 -->
    <el-dialog v-model="editDialogVisible" title="编辑订单菜品" width="400px">
      <el-form :model="editDishForm" label-width="100px">
        <el-form-item label="菜品ID">
          <el-input v-model="editDishForm.dishId" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number v-model="editDishForm.quantity" :min="1" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleEditOrderDishes">添加菜品</el-button>
          <el-button @click="editDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrderStore } from '@/stores/order'
import { ElMessageBox, ElMessage } from 'element-plus'

const orderStore = useOrderStore()
const dateRange = ref([])

const editDialogVisible = ref(false)
const editDishForm = ref({ orderId: '', dishId: '', quantity: 1 })

const openEditDialog = (row) => {
  editDishForm.value = { orderId: row.orderId, dishId: '', quantity: 1 }
  editDialogVisible.value = true
}

const handleEditOrderDishes = async () => {
  if (!editDishForm.value.dishId || !editDishForm.value.quantity) {
    ElMessage.warning('请填写菜品ID和数量')
    return
  }
  await orderStore.editOrderDishes(editDishForm.value.orderId, editDishForm.value.dishId, editDishForm.value.quantity)
  editDialogVisible.value = false
}

const handleSearch = () => {
  // 只做前端筛选
}

const filteredOrders = computed(() => {
  if (!dateRange.value || dateRange.value.length !== 2) {
    return orderStore.orderList
  }
  const [start, end] = dateRange.value
  return orderStore.getOrdersByDateRange(start, end)
})

const totalRevenue = computed(() => {
  if (!dateRange.value || dateRange.value.length !== 2) {
    return orderStore.orderList.reduce((sum, o) => sum + Number(o.totalAmount || o.amount || 0), 0)
  }
  const [start, end] = dateRange.value
  return orderStore.getRevenueByDateRange(start, end)
})

const deleteOrder = async (row) => {
  await ElMessageBox.confirm(`确定要删除订单"${row.orderId}"吗？`, '提示', { type: 'warning' })
  await orderStore.deleteOrder(row.orderId)
}

onMounted(orderStore.fetchOrderList)
</script>
