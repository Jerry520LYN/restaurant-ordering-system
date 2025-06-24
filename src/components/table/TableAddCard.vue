<template>
    <div>

        <el-form :model="table" label-width="120px">

            <el-form-item label="餐桌状态">
                <el-input v-model="table.tableStatus" />
            </el-form-item>
            <el-form-item label="餐桌容量">
                <el-input v-model.number="table.capacity" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleAddTable">添加</el-button>
                <el-button @click="close">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref,defineEmits } from 'vue';
import { useTableStore } from '@/stores/table';
const tableStore = useTableStore();
const table = ref({tableStatus: '', capacity: 0})
const emit = defineEmits(['addTable', 'close']);
const handleAddTable = () => {
    tableStore.addTable(table.value.tableStatus, table.value.capacity);
    emit('addTable');
}
const close = () => {
    emit('close');
}

</script>