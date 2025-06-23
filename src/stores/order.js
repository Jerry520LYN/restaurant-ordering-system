import { defineStore } from 'pinia';
import { getOrderList, getOrderSummaryList, deleteOrderById, addDishToOrder } from '@/api/order';
import { ElMessage } from 'element-plus';

export const useOrderStore = defineStore('order', {
  state: () => ({
    orderList: [],
    summaryList: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchOrderList() {
      this.loading = true;
      try {
        this.orderList = await getOrderList();
        this.error = null;
      } catch (err) {
        this.error = err.message || '获取订单列表失败';
        ElMessage.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    async fetchOrderSummaryList() {
      this.loading = true;
      try {
        this.summaryList = await getOrderSummaryList();
        this.error = null;
      } catch (err) {
        this.error = err.message || '获取订单汇总失败';
        ElMessage.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    async deleteOrder(orderId) {
      try {
        await deleteOrderById(orderId);
        ElMessage.success('删除订单成功');
        await this.fetchOrderList();
      } catch (err) {
        ElMessage.error(err.message || '删除订单失败');
      }
    },
    // 时间段筛选和营收统计在前端处理
    getOrdersByDateRange(startDate, endDate) {
      return this.orderList.filter(order => {
        const date = order.orderDate || order.checkoutTime || order.createTime;
        return date >= startDate && date <= endDate;
      });
    },
    getRevenueByDateRange(startDate, endDate) {
      const orders = this.getOrdersByDateRange(startDate, endDate);
      return orders.reduce((sum, o) => sum + Number(o.totalAmount || o.amount || 0), 0);
    },
    async editOrderDishes(orderId, dishId, quantity) {
      try {
        await addDishToOrder({ orderId, dishId, quantity });
        ElMessage.success('添加菜品成功');
        await this.fetchOrderList();
      } catch (err) {
        ElMessage.error(err.message || '添加菜品失败');
      }
    }
  }
});
