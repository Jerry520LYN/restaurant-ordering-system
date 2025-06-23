import request from '@/utils/request';

// 创建订单
export function createOrder({ tableId, customerId, peopleCount }) {
  return request({
    url: '/checkout/create-order',
    method: 'post',
    params: {
      tableId,
      customerId,
      peopleCount
    }
  });
} 