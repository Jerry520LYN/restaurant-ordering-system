import instance from '@/utils/request';
import { useAuthStore } from '@/stores/auth';
// 叫号
export const callNumber = async ({ phone, peopleNumber }) => {
  try{
  const authStore = useAuthStore();
  const token = authStore.token;
  console.log('Token:', token); // 调试：检查token
  
  const params ={
    authenticity: token,
    phone,
    peopleNumber
  }
  const response = await instance.post('/callingnumber/add', null, {
    params
    });
    return response;
  } catch (error) {
    throw error.response?.data?.message || '叫号失败api1';
  }
}

// 移除叫号
export const removeCallingNumber = async (callingNumberId) => {
  try{
  const authStore = useAuthStore();
  const token = authStore.token;
    const params ={
    authenticity: token,
    callingNumberId
  }
  const response = await instance.post('/callingnumber/remove', null, {
    params
  });
  return response;
  } catch (error) {
    throw error.response?.data?.message || '移除叫号失败api2';
  }
}

// 获取所有队列
export const getAllQueues = async () => {
  try{
  const authStore = useAuthStore();
  const token = authStore.token;
  console.log('Token:', token); // 调试：检查token
  
  const params ={
    authenticity: token,
  }
  console.log('Request params:', params); // 调试：检查请求参数
  
  const response = await instance.get('/callingnumber/queues', {
    params
  });
  console.log('Response:', response); // 调试：检查响应
  return response;
  } catch (error) {
    console.error('getAllQueues error:', error); // 调试：查看具体错误
    throw error.response?.data?.message || '获取队列失败api3';
  }
} 


export const startDining = async (callingNumberId) => {
  try{
  const authStore = useAuthStore();
  const token = authStore.token;
  const params ={
    authenticity: token,
    callingNumberId,
    status: 'DINING'
  }
  const response = await instance.post('/callingnumber/updateStatus', null, {
    params
  });
  return response;
  } catch (error) {
    throw error.response?.data?.message || '开始就餐失败api4';
  }
}