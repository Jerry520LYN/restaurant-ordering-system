<template>
    <el-form :model="form" label-width="120px">
        <el-form-item label="菜品ID">
            <el-input v-model="form.dishId" />
        </el-form-item>
        <el-form-item label="菜品名称">
            <el-input v-model="form.dishName" />
        </el-form-item>
        <el-form-item label="菜品价格">
            <el-input v-model="form.price" />
        </el-form-item>
        <el-form-item label="菜品描述">
            <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="菜品图片">
            <el-input v-model="form.imageUrl" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { ElMessage } from 'element-plus';
//这里定义一个props接受父组件传来的数据
const props = defineProps({
    dish: {
        type: Object,
        default: () => ({})
    }
});

//存放watch监听的数据
const form = ref({
    dishId: '',
    dishName: '',
    price: '',
    description: '',
    imageUrl: ''
});

// 定义emit可以发出的字段
const emit = defineEmits(['add-success', 'close']);

const handleCancel = () => {
    emit('close');
}

const handleSubmit = async () => {
    try {
        const menuStore = useMenuStore();
        await menuStore.addDish(form.value);
        emit('add-success');
    } catch (error) {
        ElMessage.error('添加菜品失败: ' + error.message);
    }
}

// 监听props传入的dish对象，初始化表单
watch(() => props.dish, (newVal) => {
    if (newVal) {
        form.value = {
            dishId: newVal.dishId || '',
            dishName: newVal.dishName || '',
            price: newVal.price || '',
            description: newVal.description || '',
            imageUrl: newVal.imageUrl || ''
        };
    }
}, { immediate: true, deep: true });
</script>