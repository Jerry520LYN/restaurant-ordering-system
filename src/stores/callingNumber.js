import { defineStore } from 'pinia';
import { callNumber, removeCallingNumber, getAllQueues } from '@/api/callingNumber';
import { ElMessage } from 'element-plus';

export const useCallingNumberStore = defineStore('callingNumber', {
  state: () => ({
    queues: {},
    loading: false,
    error: null
  }),
  actions: {
    async callNumber(phone, peopleNumber) {
      try {
        await callNumber({ phone, peopleNumber });
        ElMessage.success('叫号成功');
        await this.getQueues();
      } catch (err) {
        ElMessage.error(err.message || '叫号失败');
      }
    },
    async removeCallingNumber(callingNumberId) {
      try {
        await removeCallingNumber(callingNumberId);
        ElMessage.success('移除叫号成功');
        await this.getQueues();
      } catch (err) {
        ElMessage.error(err.message || '移除叫号失败');
      }
    },
    async getQueues() {
      this.loading = true;
      try {
        this.queues = await getAllQueues();
        this.error = null;
      } catch (err) {
        this.error = err.message || '获取队列失败';
        ElMessage.error(this.error);
      } finally {
        this.loading = false;
      }
    }
  }
}); 