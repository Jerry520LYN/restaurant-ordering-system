//这里严格参照。/api/menu.js的格式，利用request.js中的instance，参考CheckoutController以及后端的数据结构

import instance from '@/utils/request';
import { useAuthStore } from '@/stores/auth';

// 创建订单
export const createOrder = async ({ tableId, customerId, peopleCount }) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        const params = {
            authenticity: token,
            tableId,
            customerId,
            peopleCount
        };
        const response = await instance.post('/checkout/create-order', null, { params });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '创建订单失败';
    }
};

// 添加菜品到订单
export const addDishToOrder = async ({ orderId, dishId, quantity }) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        const params = {
            authenticity: token,
            orderId,
            dishId,
            quantity
        };
        const response = await instance.post('/checkout/add-dish', null, { params });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '添加菜品失败';
    }
};

// 从订单中移除菜品
export const removeDishFromOrder = async ({ orderId, dishId }) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        const params = {
            authenticity: token,
            orderId,
            dishId
        };
        const response = await instance.delete('/checkout/remove-dish', { params });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '移除菜品失败';
    }
};

// 修改菜品数量
export const updateDishQuantity = async ({ orderId, dishId, quantity }) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        const params = {
            authenticity: token,
            orderId,
            dishId,
            quantity
        };
        const response = await instance.put('/checkout/update-dish-quantity', null, { params });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '修改菜品数量失败';
    }
};

// 结账
export const checkoutOrder = async (orderId) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        const params = {
            authenticity: token,
            orderId
        };
        const response = await instance.post('/checkout/checkout', null, { params });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '结账失败';
    }
};

// 根据 tableId 查询订单和菜品
export const getOrderIdWithDishId = async (tableId) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        const params = {
            authenticity: token
        };
        const response = await instance.post(`/checkout/table/${tableId}`, null, { params });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '根据餐桌查询订单失败';
    }
};

// 根据 orderId 查询订单菜品信息
export const getOrderDetails = async (orderId) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        const params = {
            authenticity: token
        };
        const response = await instance.get(`/checkout/order-details/${orderId}`, { params });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '获取订单菜品信息失败';
    }
};

// 获取所有订单详情（order_summary 视图）
export const getAllOrdersWithDetails = async () => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        const params = {
            authenticity: token
        };
        const response = await instance.get('/checkout/allWithDetails', { params });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '获取所有订单详情失败';
    }
};

// 获取热门菜品
export const getPopularDishes = async (startTime, endTime) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        const params = {
            authenticity: token,
            startTime,
            endTime
        };
        const response = await instance.get('/checkout/popular-dishes', { params });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '获取热门菜品失败';
    }
};

// 获取营收统计
export const getRevenue = async (startTime, endTime) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        const params = {
            authenticity: token,
            startTime,
            endTime
        };
        const response = await instance.get('/checkout/revenue', { params });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '获取营收统计失败';
    }
};
