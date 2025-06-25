<template>
  <div class="checkout-form-container">
    <div class="flex flex-col h-screen">
      <!-- 上方菜单列表 -->
      <div class="h-1/2 border-b border-gray-200 flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-bold">菜单列表</h2>
        </div>
        <div class="flex-1 overflow-y-auto">
          <el-table 
            :data="menuList" 
            style="width: 100%;" 
            size="small" 
            layout="fixed"
            @row-dblclick="handleDishDblClick"
            class="menu-table"
          >
            <el-table-column prop="dishId" label="菜品ID" width="120" />
            <el-table-column prop="dishName" label="菜品名称" width="200" />
            <el-table-column prop="price" label="价格" width="120" />
            <el-table-column prop="description" label="描述" />
          </el-table>
        </div>
      </div>

      <!-- 下方订单管理 -->
      <div class="h-1/2 flex flex-col overflow-y-auto">
        <!-- 订单创建 -->
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-bold mb-4">订单创建</h2>
          <el-form label-width="80px" class="mb-4">
            <el-form-item label="顾客ID">
              <el-input v-model="customerId" type="number" placeholder="输入顾客ID" />
            </el-form-item>
            <el-form-item label="桌子ID">
              <el-input v-model="tableId" type="number" placeholder="输入桌子ID" />
            </el-form-item>
            <el-form-item label="人数">
              <el-input v-model="peopleCount" type="number" min="1" placeholder="输入人数" />
            </el-form-item>
            <el-form-item>
              <el-button 
                type="primary" 
                @click="handleCreateOrder" 
                :disabled="!!orderId || isEditMode"
              >
                创建订单
              </el-button>
              <span v-if="orderId" class="ml-4 text-green-600">订单ID: {{ orderId }}</span>
              <el-button v-if="orderId" type="warning" class="ml-4" @click="handleExitEdit">退出编辑</el-button>
            </el-form-item>
          </el-form>
          
          <el-divider>已选菜品</el-divider>
          <div class="mb-4">
            <el-table :data="selectedDishes" style="width: 100%;" size="small" layout="fixed">
              <el-table-column prop="dishId" label="菜品ID" width="120" />
              <el-table-column prop="dishName" label="菜品名称" width="150" />
              <el-table-column prop="quantity" label="数量" width="120">
                <template #default="scope">
                  <el-input-number 
                    v-model="scope.row.quantity" 
                    :min="1" 
                    @change="q => handleUpdateQuantity(scope.row, q)" 
                    style="width: 100%;" 
                  />
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template #default="scope">
                  <el-button size="small" type="danger" @click="removeDish(scope.row)">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!-- 订单更新 -->
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-bold mb-4">订单更新</h2>
          <el-form label-width="80px" class="mb-4">
            <el-form-item label="订单ID">
              <el-input v-model="editOrderId" type="number" placeholder="输入订单ID" style="width: 180px;" />
              <el-button class="ml-2" @click="handleEditQueryOrder">查询</el-button>
            </el-form-item>
            <el-form-item label="顾客ID">
              <el-input v-model="editCustomerId" type="number" placeholder="输入顾客ID" />
            </el-form-item>
            <el-form-item label="桌子ID">
              <el-input v-model="editTableId" type="number" placeholder="输入桌子ID" />
            </el-form-item>
            <el-form-item label="人数">
              <el-input v-model="editPeopleCount" type="number" min="1" placeholder="输入人数" />
            </el-form-item>
            <el-form-item>
              <el-button 
                type="primary" 
                @click="handleEditSaveOrder" 
                :disabled="!editOrderId || !!orderId"
              >
                保存更新
              </el-button>
              <el-button v-if="editOrderId" type="warning" class="ml-4" @click="handleEditExit">退出编辑</el-button>
            </el-form-item>
          </el-form>
          
          <el-divider>已选菜品</el-divider>
          <div class="mb-4">
            <el-table :data="editSelectedDishes" style="width: 100%;" size="small" layout="fixed">
              <el-table-column prop="dishId" label="菜品ID" width="120" />
              <el-table-column prop="dishName" label="菜品名称" width="150" />
              <el-table-column prop="quantity" label="数量" width="120">
                <template #default="scope">
                  <el-input-number 
                    v-model="scope.row.quantity" 
                    :min="1" 
                    @change="q => handleEditUpdateQuantity(scope.row, q)" 
                    style="width: 100%;" 
                  />
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template #default="scope">
                  <el-button size="small" type="danger" @click="editRemoveDish(scope.row)">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!-- 订单查询 -->
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-bold mb-4">订单查询</h2>
          <el-form label-width="160px" class="mb-4">
            <el-form-item label="根据桌号查订单">
              <el-input v-model="queryTableId" type="number" placeholder="输入桌子ID" style="width: 240px;" />
              <el-button @click="handleQueryOrderByTableId" class="ml-2">查询</el-button>
            </el-form-item>
            <el-form-item label="根据订单查菜品">
              <el-input v-model="queryOrderId" type="number" placeholder="输入订单ID" style="width: 240px;" />
              <el-button @click="handleQueryOrderDetails" class="ml-2">查询</el-button>
            </el-form-item>
          </el-form>
          
          <!-- 订单详情卡片展示 -->
          <div v-if="orderInfo" class="order-info-card p-4 mb-4 bg-gray-50 rounded shadow">
            <div v-if="orderInfo.orderId"><b>订单ID：</b>{{ orderInfo.orderId }}</div>
            <div v-if="orderInfo.customerId"><b>顾客ID：</b>{{ orderInfo.customerId }}</div>
            <div v-if="orderInfo.customerName"><b>顾客姓名：</b>{{ orderInfo.customerName }}</div>
            <div v-if="orderInfo.tableId"><b>桌号：</b>{{ orderInfo.tableId }}</div>
            <div v-if="orderInfo.orderTime"><b>下单时间：</b>{{ orderInfo.orderTime }}</div>
            <div v-if="orderInfo.status"><b>状态：</b>{{ orderInfo.status }}</div>
            <div v-if="orderInfo.finalAmount"><b>实付金额：</b>{{ orderInfo.finalAmount }}</div>
            <div v-if="orderInfo.totalAmount"><b>总金额：</b>{{ orderInfo.totalAmount }}</div>
            <div v-if="orderInfo.phone"><b>手机号：</b>{{ orderInfo.phone }}</div>
            <div v-if="orderInfo.discount"><b>折扣：</b>{{ orderInfo.discount }}</div>
          </div>
        </div>

        <!-- 结账 -->
        <div class="p-4">
          <h2 class="text-lg font-bold mb-4">结账</h2>
          <el-form label-width="160px">
            <el-form-item label="订单ID">
              <el-input v-model="checkoutOrderId" type="number" placeholder="输入订单ID" style="width: 120px;" />
              <el-button type="success" class="ml-2" @click="handleCheckout">结账</el-button>
            </el-form-item>
          </el-form>
          <div v-if="message" class="mt-2 text-green-600">{{ message }}</div>
          <div v-if="error" class="mt-2 text-red-600">{{ error }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { getMenuList } from '@/api/menu';
import {
  createOrder,
  addDishToOrder,
  removeDishFromOrder,
  updateDishQuantity,
  getOrderIdWithDishId,
  checkoutOrder
} from '@/api/checkout';
import { getOrderById, updateOrder } from '@/api/order';

// 订单创建区
const customerId = ref('');
const tableId = ref('');
const peopleCount = ref('');
const orderId = ref('');
const selectedDishes = ref([]);

// 订单更新区
const editOrderId = ref('');
const editCustomerId = ref('');
const editTableId = ref('');
const editPeopleCount = ref('');
const editSelectedDishes = ref([]);

// 查询区
const queryTableId = ref('');
const queryOrderId = ref('');
const orderInfo = ref(null);

// 结账区
const checkoutOrderId = ref('');

// 其他
const menuList = ref([]);
const message = ref('');
const error = ref('');

// 计算属性
const isEditMode = computed(() => editOrderId.value !== '');

onMounted(async () => {
  await fetchMenuList();
});

async function fetchMenuList() {
  try {
    const res = await getMenuList();
    menuList.value = Array.isArray(res) ? res : (res.data || []);
  } catch (err) {
    error.value = err;
  }
}

// 订单创建相关方法
async function handleCreateOrder() {
  message.value = '';
  error.value = '';
  try {
    const res = await createOrder({
      tableId: Number(tableId.value),
      customerId: Number(customerId.value),
      peopleCount: Number(peopleCount.value)
    });
    orderId.value = res.data?.orderId ? String(res.data.orderId) : '';
    if (orderId.value) {
      ElMessage.success('订单创建成功，ID: ' + orderId.value);
    } else {
      ElMessage.warning('订单创建成功，但未返回订单ID');
    }
  } catch (err) {
    error.value = err;
  }
}

function handleDishDblClick(row) {
  if (!orderId.value) {
    ElMessage.warning('请先创建订单');
    return;
  }
  // 检查是否已添加
  const exist = selectedDishes.value.find(d => d.dishId === row.dishId);
  if (exist) {
    exist.quantity++;
    handleUpdateQuantity(exist, exist.quantity);
    return;
  }
  // 添加到订单
  addDishToOrder({ orderId: orderId.value, dishId: row.dishId, quantity: 1 })
    .then(() => {
      selectedDishes.value.push({ ...row, quantity: 1 });
      ElMessage.success('已添加菜品: ' + row.dishName);
    })
    .catch(err => {
      error.value = err;
    });
}

function removeDish(row) {
  if (!orderId.value) return;
  removeDishFromOrder({ orderId: orderId.value, dishId: row.dishId })
    .then(() => {
      selectedDishes.value = selectedDishes.value.filter(d => d.dishId !== row.dishId);
      ElMessage.success('已移除菜品: ' + row.dishName);
    })
    .catch(err => {
      error.value = err;
    });
}

function handleUpdateQuantity(row, quantity) {
  if (!orderId.value) return;
  updateDishQuantity({ orderId: orderId.value, dishId: row.dishId, quantity })
    .then(() => {
      ElMessage.success('数量更新成功');
    })
    .catch(err => {
      error.value = err;
    });
}

function handleExitEdit() {
  orderId.value = '';
  selectedDishes.value = [];
  customerId.value = '';
  tableId.value = '';
  peopleCount.value = '';
}

// 订单更新相关方法
async function handleEditQueryOrder() {
  message.value = '';
  error.value = '';
  try {
    const res = await getOrderById(editOrderId.value);
    const orderData = res.data;
    
    editCustomerId.value = String(orderData.customer_id || '');
    editTableId.value = String(orderData.table_id || '');
    editPeopleCount.value = String(orderData.people_count || '');
    
    // 解析菜品信息
    if (orderData.dishes) {
      let dishesArray = [];
      if (typeof orderData.dishes === 'string') {
        try {
          dishesArray = JSON.parse(orderData.dishes);
        } catch (e) {
          // 如果不是JSON，尝试其他解析方式
          dishesArray = orderData.dishes.split(',').map(dish => {
            const [dishId, dishName, quantity] = dish.split(':');
            return { dishId, dishName, quantity: Number(quantity) };
          });
        }
      } else if (Array.isArray(orderData.dishes)) {
        dishesArray = orderData.dishes;
      }
      editSelectedDishes.value = dishesArray;
    } else {
      editSelectedDishes.value = [];
    }
    
    ElMessage.success('订单查询成功');
  } catch (err) {
    error.value = err;
  }
}

async function handleEditSaveOrder() {
  message.value = '';
  error.value = '';
  try {
    const orderData = {
      orderId: editOrderId.value,
      customerId: editCustomerId.value,
      tableId: editTableId.value,
      peopleCount: editPeopleCount.value,
      dishes: editSelectedDishes.value
    };
    
    await updateOrder(orderData);
    ElMessage.success('订单更新成功');
  } catch (err) {
    error.value = err;
  }
}

function handleEditExit() {
  editOrderId.value = '';
  editCustomerId.value = '';
  editTableId.value = '';
  editPeopleCount.value = '';
  editSelectedDishes.value = [];
}

function editRemoveDish(row) {
  editSelectedDishes.value = editSelectedDishes.value.filter(d => d.dishId !== row.dishId);
}

function handleEditUpdateQuantity(row, quantity) {
  // 本地更新数量
  row.quantity = quantity;
}

// 订单查询相关方法
async function handleQueryOrderByTableId() {
  message.value = '';
  error.value = '';
  try {
    const res = await getOrderIdWithDishId(queryTableId.value);
    orderInfo.value = res.data;
    
    // 如果查询到订单，也更新订单创建表单
    if (orderInfo.value) {
      customerId.value = String(orderInfo.value.customer_id || '');
      tableId.value = String(orderInfo.value.table_id || '');
      peopleCount.value = '';
      
      // 解析菜品信息到已选菜品
      if (orderInfo.value.dishes) {
        let dishesArray = [];
        if (typeof orderInfo.value.dishes === 'string') {
          try {
            dishesArray = JSON.parse(orderInfo.value.dishes);
          } catch (e) {
            dishesArray = orderInfo.value.dishes.split(',').map(dish => {
              const [dishId, dishName, quantity] = dish.split(':');
              return { dishId, dishName, quantity: Number(quantity) };
            });
          }
        } else if (Array.isArray(orderInfo.value.dishes)) {
          dishesArray = orderInfo.value.dishes;
        }
        selectedDishes.value = dishesArray;
      }
    }
    
    ElMessage.success('查询成功');
  } catch (err) {
    error.value = err;
  }
}

async function handleQueryOrderDetails() {
  message.value = '';
  error.value = '';
  try {
    const res = await getOrderById(queryOrderId.value);
    orderInfo.value = res.data;
    ElMessage.success('查询成功');
  } catch (err) {
    error.value = err;
  }
}

// 结账方法
async function handleCheckout() {
  message.value = '';
  error.value = '';
  try {
    await checkoutOrder(checkoutOrderId.value);
    ElMessage.success('结账成功');
    checkoutOrderId.value = '';
  } catch (err) {
    error.value = err;
  }
}
</script>

<style scoped>
.checkout-form-container {
  height: 100vh;
  overflow: hidden;
}

.menu-table {
  height: 100%;
}

.order-info-card {
  max-height: 300px;
  overflow-y: auto;
}
</style> 