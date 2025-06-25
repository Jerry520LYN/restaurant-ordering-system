<template>
  <div class="flex gap-8">
    <!-- 左侧：菜品列表 -->
    <div class="w-1/2">
      <h2 class="text-lg font-bold mb-2">菜品列表（双击添加）</h2>
      <el-table
        :data="menuList"
        style="width: 100%; font-size: 18px;"
        height="850"
        @row-dblclick="handleDishDblClick"
        highlight-current-row>
        <el-table-column prop="dishId" label="菜品ID" width="120" align="center" />
        <el-table-column prop="dishName" label="菜品名称" width="200" align="center" />
        <el-table-column prop="price" label="价格" width="120" align="center">
          <template #default="scope">¥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="200" />
      </el-table>
    </div>

    <!-- 右侧：订单操作与信息 -->
    <div class="w-1/2">
      <h2 class="text-lg font-bold mb-2">订单创建</h2>
      <el-form label-width="80px" class="mb-4">
        <el-form-item label="订单ID">
          <el-input v-model="createOrderId" type="number" placeholder="输入订单ID" disabled />
        </el-form-item>
        <el-form-item label="顾客ID">
          <el-input v-model="createCustomerId" type="number" placeholder="输入顾客ID" />
        </el-form-item>
        <el-form-item label="桌子ID">
          <el-input v-model="createTableId" type="number" placeholder="输入桌子ID" />
        </el-form-item>
        <el-form-item label="人数">
          <el-input v-model="createPeopleCount" type="number" min="1" placeholder="输入人数" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCreateOrder">创建订单</el-button>
          <el-button v-if="createOrderId" type="warning" class="ml-4" @click="handleExitEdit">退出编辑</el-button>
        </el-form-item>
      </el-form>

      <el-divider>已选菜品</el-divider>
      <div style="display: flex; flex-direction: column; width: 100%;">
        <el-table :data="createSelectedDishes" style="flex: 1 1 auto; width: 100%;" size="small" layout="fixed">
          <el-table-column prop="dishId" label="菜品ID" width="150%"  />
          <el-table-column prop="dishName" label="菜品名称" width="200%" />
          <el-table-column prop="quantity" label="数量" width="200%">
            <template #default="scope">
              <el-input-number v-model="scope.row.quantity" :min="1" @change="q => handleUpdateQuantity(scope.row, q)" style="width: 100%;" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150%" align="center">
            <template #default="scope">
              <el-button size="small" type="danger" @click="removeDish(scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-divider>订单更新</el-divider>
      <h3 class="text-md font-bold mb-2">订单更新</h3>
      <el-form label-width="80px" class="mb-4">
        <el-form-item label="订单ID">
          <el-input v-model="updateOrderId" type="number" placeholder="输入订单ID"/>
        </el-form-item>
        <el-form-item label="顾客ID">
          <el-input v-model="updateCustomerId" type="number" placeholder="输入顾客ID" />
        </el-form-item>
        <el-form-item label="桌子ID">
          <el-input v-model="updateTableId" type="number" placeholder="输入桌子ID" />
        </el-form-item>
        <el-form-item label="人数">
          <el-input v-model="updatePeopleCount" type="number" min="1" placeholder="输入人数" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdateOrder" :disabled="!updateOrderId">更新订单</el-button>
          <el-button type="primary" @click="handleQueryOrderDetails">根据orderID查询订单</el-button>
          <el-button type="primary" @click="handleQueryOrderByTableId">根据桌号查询订单</el-button>
          <el-button v-if="updateOrderId" type="warning" class="ml-4" @click="handleExitUpdateEdit">退出编辑</el-button>
        </el-form-item>
      </el-form>

      <el-divider>已选菜品（更新）</el-divider>
      <div style="display: flex; flex-direction: column; width: 100%;">
        <el-table :data="updateSelectedDishes" style="flex: 1 1 auto; width: 100%;" size="small" layout="fixed">
          <el-table-column prop="dishId" label="菜品ID" width="120" align="center" />
          <el-table-column prop="dishName" label="菜品名称" width="150" align="center" />
          <el-table-column prop="price" label="价格" width="100" align="center">
            <template #default="scope">¥{{ scope.row.price || '0.00' }}</template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量" width="250" align="center">
            <template #default="scope">
              <el-input-number 
                v-model="scope.row.quantity" 
                :min="1" 
                @change="q => handleUpdateQuantityForUpdate(scope.row, q)" 
                style="width: 200px;"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template #default="scope">
              <el-button size="small" type="danger" @click="removeDishForUpdate(scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
      <!-- 订单详情卡片展示（根据订单ID或桌号查询都可用） -->
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

      <el-divider>结账</el-divider>
      <el-form label-width="80px">
        <el-form-item label="订单ID">
          <el-input v-model="checkoutOrderId" type="number" placeholder="输入订单ID" style="width: 120px;" />
          <el-button type="success" class="ml-2" @click="handleCheckout">结账</el-button>
        </el-form-item>
      </el-form>
      <div v-if="message" class="mt-2 text-green-600">{{ message }}</div>
      <div v-if="error" class="mt-2 text-red-600">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
import { getOrderById, getOrderDetails } from '@/api/order';

const createOrderId = ref('');
const createCustomerId = ref('');
const createTableId = ref('');
const createPeopleCount = ref('');
const createSelectedDishes = ref([]); // {dishId, dishName, quantity}
const menuList = ref([]);
const message = ref('');
const error = ref('');
const orderDetails = ref([]);
const checkoutOrderId = ref('');
const orderInfo = ref(null);
const updateOrderId = ref('');
const updateCustomerId = ref('');
const updateTableId = ref('');
const updatePeopleCount = ref('');
const updateSelectedDishes = ref([]); // {dishId, dishName, quantity}

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

async function handleCreateOrder() {
  message.value = '';
  error.value = '';
  try {
    const res = await createOrder({
      tableId: Number(createTableId.value),
      customerId: Number(createCustomerId.value),
      peopleCount: Number(createPeopleCount.value)
    });
    createOrderId.value = res.orderId;
    if (createOrderId.value) {
      ElMessage.success('订单创建成功，ID: ' + createOrderId.value);
    } else {
      ElMessage.warning('订单创建成功，但未返回订单ID');
    }
  } catch (err) {
    error.value = err;
  }
}

function handleDishDblClick(row) {
  // 检查是否有可操作的订单（创建订单或更新订单）
  if (!createOrderId.value && !updateOrderId.value) {
    ElMessage.warning('请先创建订单或查询订单');
    return;
  }
  
  // 优先添加到更新订单区域（如果存在）
  if (updateOrderId.value) {
    // 检查是否已添加
    const exist = updateSelectedDishes.value.find(d => d.dishId === row.dishId);
    if (exist) {
      exist.quantity++;
      handleUpdateQuantityForUpdate(exist, exist.quantity);
      return;
    }
    // 添加到更新订单
    addDishToOrder({ orderId: updateOrderId.value, dishId: row.dishId, quantity: 1 })
      .then(() => {
        updateSelectedDishes.value.push({ ...row, quantity: 1 });
        ElMessage.success('已添加菜品到更新订单: ' + row.dishName);
      })
      .catch(err => {
        error.value = err;
      });
  } else if (createOrderId.value) {
    // 检查是否已添加
    const exist = createSelectedDishes.value.find(d => d.dishId === row.dishId);
    if (exist) {
      exist.quantity++;
      handleUpdateQuantity(exist, exist.quantity);
      return;
    }
    // 添加到创建订单
    addDishToOrder({ orderId: createOrderId.value, dishId: row.dishId, quantity: 1 })
      .then(() => {
        createSelectedDishes.value.push({ ...row, quantity: 1 });
        ElMessage.success('已添加菜品到创建订单: ' + row.dishName);
      })
      .catch(err => {
        error.value = err;
      });
  }
}

function removeDish(row) {
  if (!createOrderId.value) return;
  removeDishFromOrder({ orderId: createOrderId.value, dishId: row.dishId })
    .then(() => {
      createSelectedDishes.value = createSelectedDishes.value.filter(d => d.dishId !== row.dishId);
      ElMessage.success('已移除菜品');
    })
    .catch(err => {
      error.value = err;
    });
}

function handleUpdateQuantity(row, quantity) {
  if (!createOrderId.value) return;
  updateDishQuantity({ orderId: createOrderId.value, dishId: row.dishId, quantity })
    .then(() => {
      row.quantity = quantity;
      ElMessage.success('数量已更新');
    })
    .catch(err => {
      error.value = err;
    });
}

async function handleQueryOrderByTableId() {
  if (!updateTableId.value) {
    ElMessage.warning('请先输入桌号');
    return;
  }

  message.value = '';
  error.value = '';
  
  try {
    // 1. 通过桌号查询订单基本信息
    const orderData = await getOrderIdWithDishId(Number(updateTableId.value));
    console.log('getOrderIdWithDishId 返回数据:', orderData);
    
    // 修改判断逻辑：检查返回的数据本身
    if (orderData && Array.isArray(orderData) && orderData.length > 0) {
      // 获取第一个订单
      const firstOrder = orderData[0];
      console.log('第一个订单:', firstOrder);
      
      if (firstOrder && firstOrder.order_id) {
        orderInfo.value = firstOrder;
        orderDetails.value = [];

        // 2. 获取订单ID并自动填充表单
        updateOrderId.value = String(firstOrder.order_id || '');
        updateTableId.value = String(firstOrder.table_id || '');
        updateCustomerId.value = String(firstOrder.customer_id || '');
        updatePeopleCount.value = '';
        
        // 3. 根据订单ID查询详细菜品信息
        const detailsRes = await getOrderDetails(Number(updateOrderId.value));
        
        // 4. 处理菜品详情数据
        if (detailsRes && Array.isArray(detailsRes)) {
          console.log('桌号查询获取的菜品详情:', detailsRes);
          updateSelectedDishes.value = detailsRes.map(item => ({
            detailId: item.detailId,
            dishId: item.dishId,
            dishName: item.dishName,
            price: item.price,
            quantity: Number(item.quantity) || 1
          }));
          console.log('处理后的菜品数据:', updateSelectedDishes.value);
        } else {
          updateSelectedDishes.value = [];
        }

        ElMessage.success('订单详情加载成功');
      } else {
        // 数据存在但没有订单ID字段
        orderInfo.value = null;
        updateSelectedDishes.value = [];
        ElMessage.warning('查询到的订单数据格式不正确');
      }
    } else {
      // 没有返回任何数据或数组为空
      orderInfo.value = null;
      updateSelectedDishes.value = [];
      ElMessage.warning('该桌号没有找到订单信息');
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || '获取订单详情失败';
    ElMessage.error(`获取订单失败: ${error.value}`);
    console.error('桌号查询错误:', err);
  }
}

async function handleQueryOrderDetails() {
  if (!updateOrderId.value) {
    ElMessage.warning('请先输入订单ID');
    return;
  }

  message.value = '';
  error.value = '';
  
  try {
    // 并行请求订单基本信息和菜品详情
    const [orderRes, detailsRes] = await Promise.all([
      getOrderById(Number(updateOrderId.value)),
      getOrderDetails(Number(updateOrderId.value))
    ]);

    orderInfo.value = orderRes;
    orderDetails.value = [];

    if (orderInfo.value) {
      updateOrderId.value = String(orderInfo.value.orderId || orderInfo.value.order_id || '');
      updateTableId.value = String(orderInfo.value.tableId || orderInfo.value.table_id || '');
      updateCustomerId.value = String(orderInfo.value.customerId || orderInfo.value.customer_id || '');
      updatePeopleCount.value = '';
    }

    // 确保数量字段正确设置
    if (detailsRes && Array.isArray(detailsRes)) {
      console.log('API返回的菜品详情:', detailsRes);
      updateSelectedDishes.value = detailsRes.map(item => ({
        detailId: item.detailId,
        dishId: item.dishId,
        dishName: item.dishName,
        price: item.price,
        quantity: Number(item.quantity) || 1 // 强制转换为数字类型
      }));
      console.log('处理后的菜品数据:', updateSelectedDishes.value);
    } else {
      updateSelectedDishes.value = [];
    }

    ElMessage.success('订单详情加载成功');
  } catch (err) {
    error.value = err;
    ElMessage.error('获取订单详情失败');
  }
}

function handleExitEdit() {
  createOrderId.value = '';
  createTableId.value = '';
  createCustomerId.value = '';
  createPeopleCount.value = '';
  createSelectedDishes.value = [];
  orderInfo.value = null;
  orderDetails.value = [];
  message.value = '';
  error.value = '';
  checkoutOrderId.value = '';
}

async function handleCheckout() {
  message.value = '';
  error.value = '';
  try {
    await checkoutOrder(Number(checkoutOrderId.value));
    message.value = '结账成功！';
    ElMessage.success('结账成功！');
  } catch (err) {
    error.value = err;
  }
}

async function handleUpdateOrder() {
  message.value = '';
  error.value = '';
  try {
    // 这里可以调用更新订单的API
    ElMessage.success('订单更新成功！');
  } catch (err) {
    error.value = err;
  }
}

function handleExitUpdateEdit() {
  updateOrderId.value = '';
  updateTableId.value = '';
  updateCustomerId.value = '';
  updatePeopleCount.value = '';
  updateSelectedDishes.value = [];
}

function removeDishForUpdate(row) {
  if (!updateOrderId.value) return;
  removeDishFromOrder({ orderId: updateOrderId.value, dishId: row.dishId })
    .then(() => {
      updateSelectedDishes.value = updateSelectedDishes.value.filter(d => d.dishId !== row.dishId);
      ElMessage.success('已移除菜品');
    })
    .catch(err => {
      error.value = err;
    });
}

function handleUpdateQuantityForUpdate(row, quantity) {
  if (!updateOrderId.value) return;
  updateDishQuantity({ orderId: updateOrderId.value, dishId: row.dishId, quantity })
    .then(() => {
      row.quantity = quantity;
      ElMessage.success('数量已更新');
    })
    .catch(err => {
      error.value = err;
    });
}
</script>

<style scoped>
.flex { display: flex; }
.gap-8 { gap: 2rem; }
.w-1\/2 { width: 50%; }
.ml-2 { margin-left: 0.5rem; }
.ml-4 { margin-left: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.text-green-600 { color: #16a34a; }
.text-red-600 { color: #dc2626; }
.el-table {
  font-size: 18px;
}
.order-info-card {
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 1rem;
}
</style>