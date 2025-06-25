<template>
    <div class="detailed-table">
        <div style="display: flex; justify-content: space-between; align-items: center;">
        <el-button type="primary" @click="orderOperation">订单详细信息查询与删除</el-button>
        <el-button type="primary" @click="getOrderList">刷新订单</el-button>
            <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="margin: 0 10px; width: 380px"
            />
            <el-select v-model="selectedStatus" placeholder="订单状态" clearable @change="filterOrderStatus">
                <el-option label="已结账" value="已结账" />
                <el-option label="未结账" value="未结账" />
            </el-select>
            <el-button type="primary" @click="filterOrders">筛选</el-button>
        </div>
        <el-table :data="orderList" style="width: 100%; margin-top: 1rem" stripe border>
            <el-table-column prop="orderId" label="订单ID" />
            <el-table-column prop="customerId" label="顾客ID" />
            <el-table-column prop="customerName" label="顾客名称" />
            <el-table-column prop="phone" label="顾客电话" />
            <el-table-column prop="tableId" label="餐桌ID" />
            <el-table-column prop="orderTime" label="订单时间" />
            <el-table-column prop="totalAmount" label="订单金额" />
            <el-table-column prop="finalAmount" label="结账金额" />
            <el-table-column prop="discount" label="折扣" />
            <el-table-column prop="status" label="订单状态" />
        </el-table>
        <el-dialog v-model="dialogVisible" title="订单详情" width="500px">
            <DetailedCard :order="order" @closeOrder="closeOrder" />
        </el-dialog>
    </div>

</template>
<script>
import { useOrderStore } from '@/stores/order';
import DetailedCard from './DetailedCard.vue';
import { ElMessage } from 'element-plus';
export default {
    name: 'DetailedForm',
    components: {
        DetailedCard
    },
    data() {
        return {
            dialogVisible: false,
            order: null,
            orderList: [],
            timeRange: [],
            selectedStatus: ''
        }
    },
    methods: {
        orderOperation() {
            this.dialogVisible = true;
        },
        async getOrderList() {
            this.timeRange = [];
            this.selectedStatus = '';
            await useOrderStore().fetchOrderSummaryList();
            this.orderList = useOrderStore().summaryList;
            this.CorrectTime();
        },
        CorrectTime() {
            this.orderList.forEach(order => {
                // 纠正时间格式为 yyyy-MM-dd HH:mm:ss
                const date = new Date(order.orderTime);
                const pad = n => n.toString().padStart(2, '0');
                order.orderTime = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
            });
        },
        closeOrder() {
            this.dialogVisible = false;
            this.getOrderList();
        },
        async filterOrders() {
            if (this.timeRange.length === 0) {
                ElMessage.error('请选择时间范围');
                return;
            }
            const [startTime, endTime] = this.timeRange;
            await useOrderStore().fetchOrdersByTimeAndStatus({
                startTime,
                endTime,
                
            });
            
            this.orderList = useOrderStore().summaryList;
            this.CorrectTime();
        },
        filterOrderStatus() {
            //this.orderList = useOrderStore().summaryList;
            if (this.selectedStatus === '已结账') {
                this.orderList = this.orderList.filter(order => order.status === '已结账');
            } else {
                this.orderList = this.orderList.filter(order => order.status === '未结账');
            }
        //     let result = [...this.orderList];
        //     if (this.selectedStatus) {
        //     result = result.filter(order => order.status === this.selectedStatus);
        // }
        //     this.orderList = result;
        }
    },
    mounted() {
        this.getOrderList();
    },
}
</script>