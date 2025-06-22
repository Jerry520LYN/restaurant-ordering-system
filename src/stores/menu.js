import { defineStore } from 'pinia';
import { getMenuList, getHotDishes, deleteDish as deleteDishApi, addDish } from '@/api/menu';
import { useAuthStore } from './auth';
import { updateDish } from '@/api/menu';
export const useMenuStore = defineStore('menu', {
    state: () => ({
        menuList: [],
        hotDishes: [],
        error: null
    }),
    actions: {
        async fetchMenuList() {
            try {
                const response = await getMenuList();
                console.log('fetchMenuList - 获取到的result:', response);
                this.menuList = response || [];
            } catch (error) {
                console.error('fetchMenuList - 错误:', error);
                this.error = error;
            }
        },
        async fetchHotDishes(startTime, endTime) {
            this.error = null;
            try {
                const authStore = useAuthStore();
                if (!authStore.token) {
                    throw new Error('请先登录');
                }
                
                // 确保时间格式为 yyyy-MM-dd（只有日期，没有时分秒）
                const formatDate = (date) => {
                    if (typeof date === 'string') {
                        return date.split(' ')[0]; // 只取日期部分
                    }
                    return date;
                };
                
                const formattedStartTime = formatDate(startTime);
                const formattedEndTime = formatDate(endTime);
                
                console.log('fetchHotDishes - 请求参数:', { startTime: formattedStartTime, endTime: formattedEndTime });
                const response = await getHotDishes(formattedStartTime, formattedEndTime);
                console.log('fetchHotDishes - 获取到的result:', response);
                this.hotDishes = response || [];
            } catch (error) {
                console.error('fetchHotDishes - 错误:', error);
                this.error = error;
                this.hotDishes = [];
            }
        },
        async deleteDish(dishId) {
            this.error = null;
            try {
                await deleteDishApi(dishId);
                // 可选：从menuList中移除已删除的项，以避免重新获取整个列表
                this.menuList = this.menuList.filter(dish => dish.dishId !== dishId);
            } catch (error) {
                console.error('deleteDish - 错误:', error);
                this.error = error;
                throw error; // 将错误向上抛出，以便组件可以捕获它
            }
        },
        async addDish(dishData) {
            this.error = null;
            try {
                const newDish = await addDish(dishData);
                this.menuList.push(newDish);
            } catch (error) {
                console.error('addDish - 错误:', error);
                this.error = error;
                throw error;
            }
        },
        async updateDish(dishData) {
            this.error = null;
            try {
                const updatedDish = await updateDish(dishData);
                this.menuList = this.menuList.map(dish => dish.dishId === dishData.dishId ? updatedDish : dish);
            } catch (error) {
                console.error('updateDish - 错误:', error);
                this.error = error;
                throw error;
            }
        }
    }
});
