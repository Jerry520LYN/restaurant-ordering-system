import { defineStore } from 'pinia';
import { getTableList, addTable, updateTableStatus, deleteTableById } from '@/api/table';
import { ElMessage } from 'element-plus';

export const useTableStore = defineStore('table', {
  state: () => ({
    tableList: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTableList() {
      this.loading = true;
      try {
        this.tableList = await getTableList();
        this.error = null;
      } catch (err) {
        this.error = err.message || '获取餐桌列表失败';
        ElMessage.error(this.error);
      } finally {
        this.loading = false;
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
    async updateTableStatus(tableId, tableStatus) {
      try {
        await updateTableStatus({ tableId, tableStatus });
        ElMessage.success('更新餐桌状态成功');
        await this.fetchTableList();
      } catch (err) {
        ElMessage.error(err.message || '更新餐桌状态失败');
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
