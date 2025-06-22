<template>
    <div>
    <div class="customer-layout">
    <span class="flex justify-between items-center mb-5">
        <h2 class="m-0 text-gray-800 text-xl font-bold">顾客信息管理</h2>
        <div class="flex gap-2">
            <el-button type="primary" @click="getCustomerList">
                刷新顾客列表
            </el-button>
            <el-button type="primary" @click="addCustomer">
                添加顾客
            </el-button>
        </div>
        </span>
        <CustomerForm />
        <el-dialog v-model="addDialogVisible" title="添加顾客" width="500px">
            <CustomerAddCard @add-success="handleAddSuccess" @close="addDialogVisible = false" />
        </el-dialog>
    </div>
    <div class="customer-layout mt-8">
    <span class="flex justify-between items-center mb-5">
        <h2 class="m-0 text-gray-800 text-xl font-bold">VIP顾客信息管理</h2>
        <div class="flex gap-2">
            <el-button type="primary" @click="getCustomerList">
                刷新VIP顾客列表
            </el-button>
            <el-button type="primary" @click="addCustomer">
                添加VIP顾客
            </el-button>
        </div>
        </span>
        <VipCustomerForm />
    </div>
    </div>
</template>
<script>

import CustomerForm from './CustomerForm.vue';
import VipCustomerForm from './VipCustomerForm.vue';
import CustomerAddCard from './CustomerAddCard.vue';
import { useCustomerStore } from '@/stores/customer';

export default {
    name: 'CustomerLayout',
    components: {
        CustomerForm,
        VipCustomerForm,
        CustomerAddCard
    },
    data() {
        return {
            customerStore: useCustomerStore(),
            addDialogVisible: false
        }
    },
    methods: {
        getCustomerList() {
            this.customerStore.fetchCustomerList();
        },
        addCustomer() {
            this.addDialogVisible = true;
        },
        handleAddSuccess() {
            this.addDialogVisible = false;
            this.customerStore.fetchCustomerList();
        }
    }
}
</script>