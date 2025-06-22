<template>
    <el-form :model="form" label-width="80px" ref="formRef">
        <el-form-item label="菜品名称" prop="dishName">
            <el-input v-model="form.dishName"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
            <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
            <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="图片URL" prop="imageUrl">
            <el-input v-model="form.imageUrl"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit">更新</el-button>
            <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { ElMessage } from 'element-plus';

const props = defineProps({
    dish: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update-success', 'close']);

const form = ref({
    dishId: '',
    dishName: '',
    price: '',
    description: '',
    imageUrl: ''
});

const handleSubmit = async () => {
    try {
        const menuStore = useMenuStore();
        await menuStore.updateDish(form.value);
        ElMessage.success('Full update successful');
        emit('update-success');
    } catch (error) {
        ElMessage.error('Update failed: ' + error.message);
    }
};

const handleCancel = () => {
    emit('close');
};

// Initialize form
watch(() => props.dish, (newDish) => {
    if (newDish) {
        form.value = {
            dishId: newDish.dishId,
            dishName: newDish.dishName || newDish.dish_name || '',
            price: newDish.price || '',
            description: newDish.description || '',
            imageUrl: newDish.imageUrl || newDish.image_url || ''
        };
    }
}, { immediate: true, deep: true });

</script>