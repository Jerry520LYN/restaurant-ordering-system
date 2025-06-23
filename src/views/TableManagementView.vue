<template>
  <div class="p-5">
    <span class="flex justify-between items-center mb-5">
      <h2 class="m-0 text-gray-800 text-xl font-bold">餐桌信息管理</h2>
      <div class="flex gap-2">
        <el-button type="primary" @click="tableStore.fetchTableList">刷新餐桌列表</el-button>
        <el-button type="primary" @click="addTableDialog = true">添加餐桌</el-button>
      </div>
    </span>
    <el-table :data="tableStore.tableList" style="width: 100%" stripe border empty-text="暂无餐桌信息">
      <el-table-column prop="tableId" label="餐桌ID" width="120" align="center" />
      <el-table-column prop="tableName" label="餐桌名称" width="160" align="center" />
      <el-table-column prop="tableStatus" label="状态" width="120" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.tableStatus === '空' ? 'success' : 'warning'">{{ scope.row.tableStatus === '空' ? '空闲' : '占用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="capacity" label="容量" width="100" align="center" />
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="editTable(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteTable(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="!tableStore.tableList || tableStore.tableList.length === 0" class="flex justify-center items-center min-h-50">
      <el-empty description="暂无餐桌数据" />
    </div>
    <!-- 添加餐桌弹窗 -->
    <el-dialog v-model="addTableDialog" title="添加餐桌" width="400px">
      <el-form :model="addForm" label-width="100px">
        <el-form-item label="容量">
          <el-input-number v-model="addForm.capacity" :min="1" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addForm.tableStatus" placeholder="请选择状态">
            <el-option label="空闲" value="空" />
            <el-option label="占用" value="占用" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddTable">添加</el-button>
          <el-button @click="addTableDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑餐桌弹窗 -->
    <el-dialog v-model="editTableDialog" title="编辑餐桌" width="400px">
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="容量">
          <el-input-number v-model="editForm.capacity" :min="1" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editForm.tableStatus" placeholder="请选择状态">
            <el-option label="空闲" value="空" />
            <el-option label="占用" value="占用" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleEditTable">保存</el-button>
          <el-button @click="editTableDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useTableStore } from '@/stores/table'
import { ElMessage, ElMessageBox } from 'element-plus'

const tableStore = useTableStore()
const addTableDialog = ref(false)
const editTableDialog = ref(false)
const addForm = ref({ tableStatus: '空', capacity: 4 })
const editForm = ref({ tableId: '', tableStatus: '空', capacity: 4 })

const handleAddTable = async () => {
  if (!addForm.value.capacity) {
    ElMessage.warning('请输入餐桌容量')
    return
  }
  await tableStore.addTable(addForm.value.tableStatus, addForm.value.capacity)
  addTableDialog.value = false
  addForm.value = { tableStatus: '空', capacity: 4 }
}
const editTable = (row) => {
  editForm.value = { ...row }
  editTableDialog.value = true
}
const handleEditTable = async () => {
  await tableStore.updateTableStatus(editForm.value.tableId, editForm.value.tableStatus)
  editTableDialog.value = false
}
const deleteTable = async (row) => {
  await ElMessageBox.confirm(`确定要删除餐桌"${row.tableId}"吗？`, '提示', { type: 'warning' })
  await tableStore.deleteTable(row.tableId)
}
onMounted(tableStore.fetchTableList)
</script>
