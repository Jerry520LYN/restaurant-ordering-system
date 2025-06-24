<template>
    <div>
        <el-divider>排队中队列</el-divider>
        <el-table :data="beenCalledQueueData" style="width: 100%" border>
            <el-table-column prop="callingNumberId" label="Calling Number ID"></el-table-column>
            <el-table-column prop="waitingCount" label="Waiting Count"></el-table-column>
            <el-table-column prop="diningCount" label="Dining Count"></el-table-column>
            <el-table-column prop="status" label="Status"></el-table-column>
            <el-table-column prop="phone" label="Phone"></el-table-column>
            <el-table-column prop="action" label="Action">
                <template #default="scope">
                    <el-button type="primary" @click="startDinning(scope.row)">开始就餐</el-button>
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

const beenCalledQueueData = computed(() => {
    return [
        ...callingNumberStore.queues.waitingQueue2,
        ...callingNumberStore.queues.waitingQueue4,
        ...callingNumberStore.queues.waitingQueue8
    ].filter(item => item.status === 'WAITING');
});

onMounted(() => {
    callingNumberStore.getQueues();

})

const startDinning = (row) => {
    callingNumberStore.startDining(row.callingNumberId);
    callingNumberStore.getQueues();
    ElMessage.success('开始就餐');
}

</script>