import instance from '@/utils/request';
import { useAuthStore } from '@/stores/auth';

export const getMenuList = async () => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        
        const params = {
            authenticity: token
        };
        
        const response = await instance.get('/menus/all', { 
            params
        });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '获取菜单列表失败';
    }
};

export const getHotDishes = async (startTime, endTime) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        
        const params = {
            authenticity: token,
            startTime,
            endTime
        };
        const response = await instance.get('/checkout/popular-dishes', { 
            params
        });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '获取热品推荐失败';
    }
};