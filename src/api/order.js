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

// 获取订单详情（菜品信息）
export async function getOrderDetails(orderId) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const params = {
    authenticity: token
  }
  const response = await instance.get(`/checkout/order-details/${orderId}`, {
    params
  });
  return response;
}

export async function getOrdersByTime(startTime, endTime) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const params = {
    authenticity: token,
    startTime,
    endTime
  }
  const response = await instance.get('/checkout/orders-by-time', {
    params
  });
  return response;
}

export async function getRevenueByTime(startTime, endTime) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const params = {
    authenticity: token,
    startTime,
    endTime
  }
  const response = await instance.get('/checkout/revenue', {
    params
  });
  return response;
}