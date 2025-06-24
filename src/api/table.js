import { useAuthStore } from '@/stores/auth';
import instance from '@/utils/request';
// 获取所有餐桌

export async function getTableList() {
  const authStore = useAuthStore();
  const token = authStore.token;
  const response = await instance.get('/tables/all', {
    params: {
      authenticity: token
    }
  });
  return response;
}

// 添加餐桌
export async function addTable({ tableStatus, capacity }) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const params = {
    authenticity: token,
    tableStatus,
    capacity
  }
  const response = await instance.post('/tables/add', null, {
    params
  });
  return response;
}

// 删除餐桌
export async function deleteTableById(tableId) {
  const authStore = useAuthStore();
  const token = authStore.token;
  const response = await instance.delete('/tables/delete', {
    params: {
      authenticity: token,
      tableId
    }
  });
  return response;
}
