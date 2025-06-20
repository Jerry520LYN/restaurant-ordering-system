// src/api/auth.js
import instance from '@/utils/request'; // 使用统一配置的 axios 实例

export const login = async (credentials) => {
  try {
    const params = new URLSearchParams();
    for (let key in credentials) {
      params.append(key, credentials[key]);
    }

    const response = await instance.post('/users/login', null, {
      params: credentials // 自动处理参数编码
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '登录失败，请稍后再试';
  }
};

export const register = async (data) => {
  try {
    const params = new URLSearchParams();
    for (let key in data) {
      params.append(key, data[key]);
    }
    const response = await instance.post('/users/register', null, {
      params: data
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '注册失败，请稍后再试';
  }
};