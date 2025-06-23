<template>
    <el-card>
        <el-form :model="customerForm" label-width="120px">
            <el-form-item label="顾客ID">
                <el-input v-model="customerForm.customerId"/>
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
import { ref, defineEmits, defineProps } from 'vue';
import { ElMessage } from 'element-plus';
const props = defineProps({
    customer: {
        type: Object,
        default: () => ({})
    }
});

const customerStore = useCustomerStore();
const customerForm = ref({ ...props.customer });
const oldPhone = ref(props.customer.phone);


const emit = defineEmits(['close', 'update-success']);

const handleCancel = () => {
    ElMessage.info('取消更新');
    emit('close');
};

const handleUpdate = async () => {
    if (!customerForm.value.name || !customerForm.value.phone ) {
        alert('请填写完整信息');
        return;
    }
    await customerStore.updateCustomer({
        customerId: customerForm.value.customerId,
        name: customerForm.value.name,
        phone: customerForm.value.phone,
        oldphone: oldPhone.value
    });
    emit('update-success');
};
</script>