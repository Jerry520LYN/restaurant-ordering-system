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

export const deleteDish = async (dishId) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        
        const params = {
            authenticity: token,
            dishId: dishId
        };
        
        const response = await instance.delete(`/menus/deleteMenu`, { 
            params
        });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '删除菜品失败';
    }

};

export const updateDish = async (dishData) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        
        const params = {
            authenticity: token,
            dishId: dishData.dishId,
            dishName: dishData.dishName,
            price: dishData.price,
            description: dishData.description,
            imageUrl: dishData.imageUrl
        };
        const response = await instance.post('/menus/updateMenu', null, { 
            params
        });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '更新菜品失败';
    }
}   

export const addDish = async (dishData) => {
    try {
        const authStore = useAuthStore();
        const token = authStore.token;
        
        const params = {
            authenticity: token,
            dishId: dishData.dishId,
            dishName: dishData.dishName,
            price: dishData.price,
            description: dishData.description,
            imageUrl: dishData.imageUrl
        };
        const response = await instance.post('/menus/addMenu', null, { 
            params
        });
        return response;
    } catch (error) {
        throw error.response?.data?.message || '添加菜品失败';
    }
}   

