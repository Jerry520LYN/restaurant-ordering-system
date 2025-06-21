import { defineStore } from 'pinia';
import { getMenuList, getHotDishes } from '@/api/menu';
import { useAuthStore } from './auth';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        menuList: [],
        hotDishes: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchMenuList() {
            this.loading = true;
            try {
                const response = await getMenuList();
                console.log('fetchMenuList - 获取到的result:', response);
                this.menuList = response || [];
            } catch (error) {
                console.error('fetchMenuList - 错误:', error);
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async fetchHotDishes(startTime, endTime) {
            this.loading = true;
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
            } finally {
                this.loading = false;
            }
        }
    }
});
