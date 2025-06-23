import request from '@/utils/request';

// 获取所有餐桌
export function getTableList() {
  return request({
    url: '/tables/all',
    method: 'get',
    params: { authenticity: localStorage.getItem('token') }
  });
}

// 添加餐桌
export function addTable({ tableStatus, capacity }) {
  return request({
    url: '/tables/add',
    method: 'post',
    params: {
      authenticity: localStorage.getItem('token'),
      tableStatus,
      capacity
    }
  });
}

// 更新餐桌状态
export function updateTableStatus({ tableId, tableStatus }) {
  return request({
    url: '/tables/updateStatus',
    method: 'post',
    params: {
      authenticity: localStorage.getItem('token'),
      tableId,
      tableStatus
    }
  });
}

// 删除餐桌
export function deleteTableById(tableId) {
  return request({
    url: '/tables/delete',
    method: 'delete',
    params: {
      authenticity: localStorage.getItem('token'),
      tableId
    }
  });
}
