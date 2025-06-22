<template>
    <el-card>
        <el-form :model="customerForm" label-width="120px">
            <el-form-item label="用户类型">
                <el-select v-model="customerForm.vipLevel" placeholder="请选择用户类型" @change="handleVipChange">
                    <el-option v-for="level in vipLevels" :key="level.value" :label="level.label" :value="level.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="顾客ID">
                <el-input v-model="customerForm.customerId" :disabled="true" />
            </el-form-item>
            <el-form-item label="顾客姓名">
                <el-input v-model="customerForm.name" />
            </el-form-item>
            <el-form-item label="顾客电话">
                <el-input v-model="customerForm.phone" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleUpdate">更新</el-button>
                <el-button @click="handleCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { useCustomerStore } from '@/stores/customer';
import { ref, watch, defineEmits, defineProps, onMounted } from 'vue';
const props = defineProps({
    customer: {
        type: Object,
        default: () => ({})
    }
});

const customerStore = useCustomerStore();
const customerForm = ref({ ...props.customer });
const oldPhone = ref(props.customer.phone);

const vipLevels = [
    { label: '普通用户', value: '0' },
    { label: 'VIP1', value: '1' },
    { label: 'VIP2', value: '2' },
    { label: 'VIP3', value: '3' },
    { label: 'VIP4', value: '4' },
    { label: 'VIP5', value: '5' },
];

const emit = defineEmits(['close', 'update-success']);

onMounted(() => {
    // 回显VIP等级
    if (customerForm.value.customerId) {
        customerForm.value.vipLevel = customerForm.value.customerId.toString().charAt(0);
    }
});

watch(props.customer, (newVal) => {
    if (newVal) {
        customerForm.value = { ...newVal };
        oldPhone.value = newVal.phone;
        if (newVal.customerId) {
            customerForm.value.vipLevel = newVal.customerId.toString().charAt(0);
        }
    }
});

const handleVipChange = (val) => {
    // 保留后8位数字
    let oldId = customerForm.value.customerId ? customerForm.value.customerId.toString() : '';
    let suffix = oldId.length === 9 ? oldId.slice(1) : (Array(8).fill('0').join(''));
    customerForm.value.customerId = val + suffix;
};

const handleCancel = () => {
    emit('close');
};

const handleUpdate = async () => {
    if (!customerForm.value.name || !customerForm.value.phone || !customerForm.value.vipLevel) {
        alert('请填写完整信息');
        return;
    }
    // 传递customerId、name、phone、oldphone
    await customerStore.updateCustomer({
        customerId: customerForm.value.customerId,
        name: customerForm.value.name,
        phone: customerForm.value.phone,
        oldphone: oldPhone.value
    });
    emit('update-success');
};
</script>