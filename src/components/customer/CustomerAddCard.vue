<template>
    <el-card>
        <el-form :model="customerForm" label-width="120px">
            <el-form-item label="用户类型">
                <el-select v-model="customerForm.vipLevel" placeholder="请选择用户类型" @change="handleVipChange">
                    <el-option v-for="level in vipLevels" :key="level.value" :label="level.label" :value="level.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="顾客ID">
                <el-input v-model="customerForm.id" :disabled="true" />
            </el-form-item>
            <el-form-item label="顾客姓名">
                <el-input v-model="customerForm.name" />
            </el-form-item>
            <el-form-item label="顾客电话">
                <el-input v-model="customerForm.phone" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleAdd">添加</el-button>
                <el-button @click="handleCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup>
import { useCustomerStore } from '@/stores/customer';
import { ref, defineEmits } from 'vue';
const customerStore = useCustomerStore();
const customerForm = ref({ id: '', vipLevel: '' });

const vipLevels = [
    { label: '普通用户', value: '0' },
    { label: 'VIP1', value: '1' },
    { label: 'VIP2', value: '2' },
    { label: 'VIP3', value: '3' },
    { label: 'VIP4', value: '4' },
    { label: 'VIP5', value: '5' },
];

const emit = defineEmits(['close', 'add-success']);

const handleVipChange = (val) => {
    // 生成A+8位数字的ID
    const randomNum = Math.floor(10000000 + Math.random() * 90000000); // 8位
    customerForm.value.id = val + randomNum.toString();
};

const handleAdd = async () => {
    if (!customerForm.value.name || !customerForm.value.phone || !customerForm.value.vipLevel) {
        alert('请填写完整信息');
        return;
    }
    await customerStore.addCustomer(customerForm.value);
    emit('add-success');
};

const handleCancel = () => {
    emit('close');
};
</script>
