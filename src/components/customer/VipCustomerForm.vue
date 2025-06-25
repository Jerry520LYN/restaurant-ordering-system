<template>
    <div class="vip-customer-form">
        <div class="vip-customer-form-title mt-7">
            <div class="flex justify-between items-center">
                <h1 class="m-0 text-gray-800 text-xl font-bold">VIP顾客信息</h1>
                <div>
                    <el-button type="primary" @click="getVipCustomerList">刷新VIP顾客列表</el-button>
                    <el-button type="primary" @click="addVipCustomer">添加VIP顾客</el-button>
                </div>
            </div>
        </div>
        <el-table :data="customerList" style="width: 100%; margin-top: 1rem" stripe border>
            <!--这里给table添加一个margin-top: 1rem-->
            <el-table-column prop="customerId"   label="顾客ID" />
            <el-table-column prop="name" label="顾客姓名" />
            <el-table-column prop="phone" label="顾客电话" />
            <el-table-column prop="createTime" label="顾客创建账号时间" />

            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="handleUpdate(scope.row)">更新</el-button>
                    <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-dialog v-model="updateDialogVisible" title="更新顾客" width="500px">
            <CustomerUpdateCard v-if="currentCustomer" :customer="currentCustomer" @update-success="handleUpdateSuccess" @close="closeUpdateDialog" />
        </el-dialog>
        <el-dialog v-model="addVipCustomerDialogVisible" title="添加VIP顾客" width="500px">
            <CustomerAddCard v-if="addVipCustomerDialogVisible" @add-success="handleAddSuccess" @close="closeAddDialog" />
        </el-dialog>
    </div>
</template>
<script>
import { useCustomerStore } from '@/stores/customer';
import CustomerUpdateCard from './CustomerUpdateCard.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import CustomerAddCard from './CustomerAddCard.vue';
export default {
    components: {
        CustomerUpdateCard,
        CustomerAddCard
    },
    name: 'VipCustomerForm',
    data() {
        return {
            customerStore: useCustomerStore(),
            customerList: [],
            updateDialogVisible: false,
            currentCustomer: null,
            addVipCustomerDialogVisible: false
        }
    },
    mounted() {
        this.getVipCustomerList()
    },
    methods: {
        async getVipCustomerList() {
          await  this.customerStore.fetchCustomerList();
            // 筛选出不以0开头的顾客ID
            this.customerList = this.customerStore.customerList.filter(customer => {
                const id = String(customer.customerId);
                return id.length === 9;
            });
            ElMessage.success('刷新VIP顾客列表成功');
        },
        addVipCustomer() {
            this.addVipCustomerDialogVisible = true;
        },
        handleDelete(row) {
            ElMessageBox.confirm('确定删除该顾客吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.customerStore.deleteCustomer(row.phone);   
                ElMessage.success('删除顾客成功');
            })
            .catch(() => {
                ElMessage.info('取消删除');
            });
            
        },
        handleUpdate(row) {
            this.updateDialogVisible = true;
            this.currentCustomer = {
                customerId: row.customerId,    // Map customerId → id
                name: row.name, // Map customerName → name
                phone: row.phone // Map customerPhone → phone
            };
        },
        handleUpdateSuccess() {
            this.updateDialogVisible = false;
            this.customerStore.fetchCustomerList();
            
            this.customerList = this.customerStore.customerList.filter(customer => {
                const id = String(customer.customerId);
                return id.length === 9;
            });
            this.currentCustomer = null;
        },
        handleAddSuccess() {
            ElMessage.success("添加成功");
            this.addVipCustomerDialogVisible = false;
            this.customerStore.fetchCustomerList();
            this.customerList = this.customerStore.customerList.filter(customer => {
                const id = String(customer.customerId);
                return id.length === 9;
            });
        },
        closeUpdateDialog() {
            this.updateDialogVisible = false;
            this.currentCustomer = null;
        },
        closeAddDialog() {
            this.addVipCustomerDialogVisible = false;
        }
    },
    
}
</script>