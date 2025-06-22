import instance from '@/utils/request';
import { useAuthStore } from '@/stores/auth';

export const getCustomerList = async () => {
    try {
        const authStore = useAuthStore();
        const response = await instance.get('/customers/all', {
            params: {
                authenticity: authStore.token
            }
        });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '获取顾客列表失败';
    }
}

export const addCustomer = async (customerData) => {
    try {
        const authStore = useAuthStore();
        const params = new URLSearchParams();
        params.append('authenticity', authStore.token);
        for (let key in customerData) {
            params.append(key, customerData[key]);
        }
        const response = await instance.post('/customers/addCustomer', null, {
            params: params
        });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '添加顾客失败';
    }
}

export const deleteCustomer = async (phone) => {
    try {
        const authStore = useAuthStore();
        const params = new URLSearchParams();
        params.append('authenticity', authStore.token);
        params.append('phone', phone);
        const response = await instance.delete('/customers/deleteCustomer', {
            params: params
        });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '删除顾客失败';
    }
}

export const updateCustomer = async (customerData) => {
    try {
        const authStore = useAuthStore();
        const params = new URLSearchParams();
        params.append('authenticity', authStore.token);
        for (let key in customerData) {
            params.append(key, customerData[key]);
        }
        const response = await instance.post('/customers/updateCustomer', null, {
            params: params
        });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '更新顾客失败';
    }
}
