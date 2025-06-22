<template>
    <el-table :data="customerList" style="width: 100%" stripe border>
        <el-table-column prop="customerId" label="顾客ID" />
        <el-table-column prop="customerName" label="顾客姓名" />
        <el-table-column prop="customerPhone" label="顾客电话" />
        <el-table-column prop="customerEmail" label="顾客创建账号时间" />

        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" @click="handleEdit(scope.row)">更新</el-button>
                <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        <el-dialog v-model="updateDialogVisible" title="更新顾客" width="500px">
            <CustomerUpdateCard v-if="currentCustomer" :customer="currentCustomer" @update-success="handleUpdateSuccess" @close="updateDialogVisible = false" />
        </el-dialog>
    </el-table>
</template>
<script>
import { useCustomerStore } from '@/stores/customer';
import CustomerUpdateCard from './CustomerUpdateCard.vue';
export default {
    components: {
        CustomerUpdateCard
    },
    name: 'VipCustomerForm',
    data() {
        return {
            customerStore: useCustomerStore(),
            customerList: [],
            updateDialogVisible: false,
            currentCustomer: null
        }
    },
    mounted() {
        this.customerStore.fetchCustomerList();
        // 筛选出不以0开头的顾客ID
        this.customerList = this.customerStore.customerList.filter(customer => {
            const customerId = customer.customerId?.toString() || '';
            return !customerId.startsWith('0');
        });
    },
    methods: {
        handleEdit(row) {
            this.updateDialogVisible = true;
            this.currentCustomer = row;
        },
        handleDelete(row) {
            this.customerStore.deleteCustomer(row.customerPhone);   
            this.customerStore.fetchCustomerList();
            // 重新筛选数据
            this.customerList = this.customerStore.customerList.filter(customer => {
                const customerId = customer.customerId?.toString() || '';
                return !customerId.startsWith('0');
            });
        },
        handleUpdateSuccess() {
            this.updateDialogVisible = false;
            this.customerStore.fetchCustomerList();
            // 重新筛选数据
            this.customerList = this.customerStore.customerList.filter(customer => {
                const customerId = customer.customerId?.toString() || '';
                return !customerId.startsWith('0');
            });
            this.currentCustomer = null;
        }
    },
    
}
</script>