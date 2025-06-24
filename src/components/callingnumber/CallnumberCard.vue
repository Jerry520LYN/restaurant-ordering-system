<template>
    <div class="flex flex-row items-center w-full mb-5 gap-4">
        <h1 class="text-xl font-bold mb-0 whitespace-nowrap" style="min-width: 100px;">叫号服务</h1>
        <el-form model="form" label-width="200px" class="flex flex-row items-center gap-4 flex-1 w-full">
            <el-form-item label="手机号">
                <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="人数">
                <el-input-number v-model="form.peopleNumber" :min="1" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleCallNumber">叫号</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="refreshCallingNumber">刷新</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useCallingNumberStore } from '@/stores/callingNumber';
import { ElMessage } from 'element-plus';

const callingNumberStore = useCallingNumberStore();

const form = ref({
    phone: '',
    peopleNumber: 1
})

const handleCallNumber = async () => {
    callingNumberStore.callNumber(form.value.phone, form.value.peopleNumber);
    form.value = { phone: '', peopleNumber: 1 };
    ElMessage.success('叫号成功');
    callingNumberStore.getQueues();
}

const refreshCallingNumber = async () => {
    callingNumberStore.getQueues();
    ElMessage.success('刷新成功');
}

</script>