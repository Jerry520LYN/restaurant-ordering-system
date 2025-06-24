import { defineStore } from 'pinia';
import { getTableList, addTable, deleteTableById } from '@/api/table';
import { ElMessage } from 'element-plus';

export const useTableStore = defineStore('table', {
  state: () => ({
    tableList: [],
    error: null
  }),
  actions: {
    async fetchTableList() {
      try {
        this.tableList = await getTableList();
        this.error = null;
      } catch (err) {
        this.error = err.message || '获取餐桌列表失败';
        ElMessage.error(this.error);
      }
    },
    async addTable(tableStatus, capacity) {
      try {
        await addTable({ tableStatus, capacity });
        ElMessage.success('添加餐桌成功');
        await this.fetchTableList();
      } catch (err) {
        ElMessage.error(err.message || '添加餐桌失败');
      }
    },
    async deleteTable(tableId) {
      try {
        await deleteTableById(tableId);
        ElMessage.success('删除餐桌成功');
        await this.fetchTableList();
      } catch (err) {
        ElMessage.error(err.message || '删除餐桌失败');
      }
    }
  }
});
