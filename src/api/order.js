import instance from '@/utils/request';
import { useAuthStore } from '@/stores/auth';

// 获取所有订单（带详情/汇总）
export async function getOrderSummaryList() {
  const authStore = useAuthStore();
  const token = authStore.token;
  const params = {
    authenticity: token
  }
  const response = await instance.get('/orders/allWithDetails', {
    params
  });
  return response;
}

// 删除订单
export async function deleteOrderById(orderId) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const params = {
    authenticity: token,
    orderId
  }
  const response = await instance.delete('/orders/deleteOrder', {
    params
  });
  return response;
}

// 获取单个订单
export async function getOrderById(orderId) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const params = {
    authenticity: token,
    orderId
  }
  const response = await instance.get('/orders/getOrderByID', {
    params
  });
  return response;
}

//获取单个菜单的详情
export async function getOrderDetailById(orderId) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const params = {
    authenticity: token,
    orderId
  }
  const response = await instance.get('/checkout/order-details', {
    params
  });
  return response;
}

// 更新订单
export async function updateOrder(orderData) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const params = {
    authenticity: token,
    orderId: orderData.orderId,
    customerId: orderData.customerId,
    tableId: orderData.tableId,
    peopleCount: orderData.peopleCount,
    dishes: orderData.dishes
  };
  const response = await instance.post('/orders/updateOrder', null, { params });
  return response;
}

// Add this new API function
export async function getOrdersByTimeAndStatus(startTime, endTime, status) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const params = {
    authenticity: token,
    startTime,
    endTime,
    status  // Add status parameter
  };
  const response = await instance.get('/checkout/orders-by-time', {
    params
  });
  return response;
}
