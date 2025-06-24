<template>
    <div>
        <el-divider >可用餐队列</el-divider>
        <el-table :data="diningQueueData" style="width: 100%" border>
            <el-table-column prop="callingNumberId" label="Calling Number ID"></el-table-column>
            <el-table-column prop="waitingCount" label="Waiting Count"></el-table-column>
            <el-table-column prop="diningCount" label="Dining Count"></el-table-column>
            <el-table-column prop="status" label="Status"></el-table-column>
            <el-table-column prop="phone" label="Phone"></el-table-column>
            <el-table-column prop="action" label="Action">
                <template #default="scope">
                    <el-button type="primary" @click="finishDining(scope.row)">就餐完毕</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import { onMounted, computed } from 'vue';
import { useCallingNumberStore } from '@/stores/callingNumber';
import { ElMessage } from 'element-plus';

const callingNumberStore = useCallingNumberStore(); 

const diningQueueData = computed(() => {
    return [
        ...(callingNumberStore.queues.diningQueue2 || []),
        ...(callingNumberStore.queues.diningQueue4 || []),
        ...(callingNumberStore.queues.diningQueue8 || []),
        ...(callingNumberStore.queues.waitingQueue2 || []),
        ...(callingNumberStore.queues.waitingQueue4 || []),
        ...(callingNumberStore.queues.waitingQueue8 || [])
    ].filter(item => item.status === 'DINING');
});




onMounted(async () => {
    try {
        await callingNumberStore.getQueues();
        ElMessage.success('刷新成功');
    } catch (error) {
        console.error('Failed to load queues:', error);
    }
});

const finishDining = (row) => {
    callingNumberStore.removeCallingNumber(row.callingNumberId);
    ElMessage.success('就餐完毕');
}


</script>