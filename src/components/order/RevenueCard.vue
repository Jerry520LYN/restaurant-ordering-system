
<template>
    <div>
      <el-form-item label="订单数量（个）">
        <el-input v-model="orderCount" readonly></el-input>
      </el-form-item>
      <el-form-item label="总营收（元）">
        <el-input :model-value="Number(totalRevenue).toFixed(2)" readonly></el-input>
      </el-form-item>
      <el-button @click = 'handleclose'> 
        关闭
      </el-button>
    </div>
</template>

<script setup>
import { defineProps,  defineEmits,computed } from 'vue';
const emit = defineEmits(['close']);
const props = defineProps({
  revenueList: {
    type: Array,
    required: true,
    default: () => []
  }
})

const orderCount = computed(()=>props.revenueList.orderCount);
const totalRevenue = computed(()=>props.revenueList.totalRevenue);
const handleclose=()=>{
    emit('close');
}

</script>
