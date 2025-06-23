import request from '@/utils/request';

// 获取所有订单（结账信息）
export function getOrderList() {
  return request({
    url: '/orders/all',
    method: 'get',
    params: { authenticity: localStorage.getItem('token') }
  });
}

// 获取所有订单（带详情/汇总）
export function getOrderSummaryList() {
  return request({
    url: '/orders/allWithDetails',
    method: 'get',
    params: { authenticity: localStorage.getItem('token') }
  });
}

// 删除订单
export function deleteOrderById(orderId) {
  return request({
    url: '/orders/deleteOrder',
    method: 'delete',
    params: {
      authenticity: localStorage.getItem('token'),
      orderId
    }
  });
}

// 获取单个订单
export function getOrderById(orderId) {
  return request({
    url: '/orders/getOrderByID',
    method: 'get',
    params: {
      authenticity: localStorage.getItem('token'),
      orderId
    }
  });
}

// 添加菜品到订单
export function addDishToOrder({ orderId, dishId, quantity }) {
  return request({
    url: '/checkout/add-dish',
    method: 'post',
    params: {
      authenticity: localStorage.getItem('token'),
      orderId,
      dishId,
      quantity
    }
  });
}

// 更新订单中菜品数量
export function updateDishQuantity({ orderId, dishId, quantity }) {
  return request({
    url: '/checkout/update-dish-quantity',
    method: 'put',
    params: {
      authenticity: localStorage.getItem('token'),
      orderId,
      dishId,
      quantity
    }
  });
}

// 从订单中移除菜品
export function removeDishFromOrder({ orderId, dishId }) {
  return request({
    url: '/checkout/remove-dish',
    method: 'delete',
    params: {
      authenticity: localStorage.getItem('token'),
      orderId,
      dishId
    }
  });
}

// 订单结账
export function checkoutOrder(orderId) {
  return request({
    url: '/checkout/checkout',
    method: 'post',
    params: {
      authenticity: localStorage.getItem('token'),
      orderId
    }
  });
}
