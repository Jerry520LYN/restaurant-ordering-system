import request from '@/utils/request';

// 叫号
export function callNumber({ phone, peopleNumber }) {
  return request({
    url: '/callingnumber/add',
    method: 'post',
    params: {
      authenticity: localStorage.getItem('token'),
      phone,
      peopleNumber
    }
  });
}

// 移除叫号
export function removeCallingNumber(callingNumberId) {
  return request({
    url: '/callingnumber/remove',
    method: 'post',
    params: {
      authenticity: localStorage.getItem('token'),
      callingNumberId
    }
  });
}

// 获取所有队列
export function getAllQueues() {
  return request({
    url: '/callingnumber/queues',
    method: 'get',
    params: {
      authenticity: localStorage.getItem('token')
    }
  });
} 