<template>
    <el-table :data="customerList" style="width: 100%" stripe border empty-text="暂无顾客信息">
        <el-table-column prop="customerId" label="顾客ID" width="120" align="center" fixed="left" />
        <el-table-column prop="name" label="顾客姓名" width="160" align="center" />
        <el-table-column prop="phone" label="顾客电话" width="180" align="center" />
        <el-table-column prop="createTime" label="注册时间" width="160" align="center"
            :formatter="formatDate" />
        <el-table-column label="操作" width="160" align="center" fixed="right">
            <template #default="scope">
                <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(scope.row)">更新</el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
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
        CustomerUpdateCard,

    },
    name: 'CustomerForm',
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
        // 筛选出以0开头的顾客ID
        this.customerList = this.customerStore.customerList.filter(customer => {
            const customerId = customer.customerId?.toString() || '';
            return customerId.startsWith('0');
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
                return customerId.startsWith('0');
            });
        },
        handleUpdateSuccess() {
            this.updateDialogVisible = false;
            this.customerStore.fetchCustomerList();
            // 重新筛选数据
            this.customerList = this.customerStore.customerList.filter(customer => {
                const customerId = customer.customerId?.toString() || '';
                return customerId.startsWith('0');
            });
            this.currentCustomer = null;
        },
        formatDate(row, column, cellValue) {
            if (!cellValue) return '';
            // 只保留年月日
            return cellValue.toString().slice(0, 10);
        }
    },
    
}
</script>