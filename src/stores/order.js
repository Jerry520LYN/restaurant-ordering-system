import { defineStore } from 'pinia';
import { getOrderSummaryList, deleteOrderById, getOrderById, getOrderDetailById, getOrdersByTime, getRevenueByTime  } from '@/api/order';
import { ElMessage } from 'element-plus';

export const useOrderStore = defineStore('order', {
  state: () => ({
    summaryList: [],
    revenueList: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchOrderSummaryList() {
      this.loading = true;
      try {
        const response = await getOrderSummaryList();
        this.summaryList = response;
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
        const response = await deleteOrderById(orderId);
        if (response.code === 200) {
        ElMessage.success('删除订单成功');
          await this.fetchOrderList();
        } else {
          ElMessage.error(response.message || '删除订单失败');
        }
      } catch (err) {
        ElMessage.error(err.message || '删除订单失败');
      }
    },
    async getOrderById(orderId) {
      const response = await getOrderById(orderId);
      return response;
    },
    async getOrderDetailById(orderId) {
      const response = await getOrderDetailById(orderId);
      return response;
    },
    async fetchOrdersByTime({ startTime, endTime }) {
      this.loading = true;
      try {
        const response = await getOrdersByTime(startTime, endTime);
        this.summaryList = response;
        this.error = null;
      } catch (err) {
        this.error = err.message || '获取订单失败';
        ElMessage.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    async fetchRevenueByTime({ startTime, endTime }) {
      this.loading = true;
      try {
        const response = await getRevenueByTime(startTime, endTime);
        this.revenueList = response;
        this.error = null;
      } catch (err) {
        this.error = err.message || '获取营收失败';
        ElMessage.error(this.error);
      } finally {
        this.loading = false;
      }
    }
  }
});
