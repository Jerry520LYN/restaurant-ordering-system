import { defineStore } from 'pinia';
import { callNumber, removeCallingNumber, getAllQueues, startDining  } from '@/api/callingNumber';
import { ElMessage } from 'element-plus';

export const useCallingNumberStore = defineStore('callingNumber', {
  state: () => ({
    queues: {
      diningQueue2: [],
      diningQueue4: [],
      diningQueue8: [],
      waitingQueue2: [],
      waitingQueue4: [],
      waitingQueue8: [],
    },
    callingNumber: [],//存放叫号返回的对象
    error: null
  }),
  actions: {
    async callNumber(phone, peopleNumber) {
      try {
        const res = await callNumber({ phone, peopleNumber });
        this.callingNumber.push(res);
        ElMessage.success('叫号成功');
        await this.getQueues();
      } catch (err) {
        ElMessage.error(err.message || '叫号失败store1');
      }
    },
    async removeCallingNumber(callingNumberId) {
      try {
        await removeCallingNumber(callingNumberId);
        ElMessage.success('移除叫号成功');
        await this.getQueues();
      } catch (err) {
        ElMessage.error(err.message || '移除叫号失败store2');
      }
    },
    async getQueues() {
      try {
        this.queues = await getAllQueues();
        this.error = null;
      } catch (err) {
        this.error = err.message || '获取队列失败store3';
        ElMessage.error(this.error);
      }
    },
    async startDining(callingNumberId) {
      try {
        await startDining(callingNumberId);
        ElMessage.success('开始就餐');
        await this.getQueues();
      } catch (err) {
        ElMessage.error(err.message || '开始就餐失败store4');
      }
    }
  }
}); 