<template>
    <div>
        <div class = "flex justify-between items-center mb-5">
        <h1>餐桌信息管理</h1>
        <div>
            <el-button type="primary" @click="addTable">添加餐桌</el-button>
            <el-button type="primary" @click="refreshTable">刷新餐桌信息</el-button>
        </div>
        </div>

        <el-table :data="tableList" style="width: 100%; margin-top: 1rem" stripe border>
                <el-table-column prop="tableId" label="餐桌ID" />
                <el-table-column prop="tableStatus" label="餐桌状态" />
                <el-table-column prop="capacity" label="餐桌容量" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="danger" @click="deleteTable(scope.row.tableId)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <el-dialog v-model="addTableDialog" title="添加餐桌" width="30%">
           <TableAddCard @addTable="addTable" @close="closeTableDialog"/>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useTableStore } from '@/stores/table';
import TableAddCard from './TableAddCard.vue';
const tableStore = useTableStore();
const tableList = ref([]);
const addTableDialog = ref(false);
onMounted(() => {
    refreshTable();
})
const addTable = () => {
    console.log('222222222222222222222222');
    addTableDialog.value = true;
}
const  refreshTable = async () => {
    await tableStore.fetchTableList();
    tableList.value = tableStore.tableList;
}
const deleteTable = (tableId) => {
    tableStore.deleteTable(tableId);
}
const closeTableDialog = () => {
    console.log('333333333333333333333333');
    addTableDialog.value = false;
}


</script>
