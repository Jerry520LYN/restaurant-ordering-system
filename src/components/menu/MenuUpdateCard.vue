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
import { ref, watch, defineProps, defineEmits, onUnmounted } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { ElMessage } from 'element-plus';
import { debounce } from 'lodash-es'; // Or implement your own debounce

const props = defineProps({
    dish: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update-success', 'close']);

// Form structure remains the same
const form = ref({
    dishId: '',
    dishName: '',
    price: '',
    description: '',
    imageUrl: ''
});

// Real-time changes tracking
const dirtyFields = ref(new Set());

// Watch individual fields for changes
const trackChanges = (field) => {
    watch(() => form.value[field], () => {
        dirtyFields.value.add(field);
    }, { deep: true });
};

['dishName', 'price', 'description', 'imageUrl'].forEach(trackChanges);

// Debounced save function
const saveField = debounce(async (field) => {
    if (!dirtyFields.value.has(field)) return;
    
    try {
        const payload = {
            dishId: form.value.dishId,
            [field]: form.value[field]
        };
        
        const menuStore = useMenuStore();
        await menuStore.partialUpdate(payload); // You'll need to implement this in your store
        dirtyFields.value.delete(field);
        ElMessage.success(`${field} updated`);
    } catch (error) {
        ElMessage.error(`${field} update failed: ${error.message}`);
    }
}, 1000);

// Original submit handler (unchanged)
const handleSubmit = async () => {
    try {
        const menuStore = useMenuStore();
        await menuStore.updateDish(form.value); // Uses the existing endpoint
        ElMessage.success('Full update successful');
        emit('update-success');
    } catch (error) {
        ElMessage.error('Update failed: ' + error.message);
    }
};

// Cancel handler remains unchanged
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
        dirtyFields.value.clear();
    }
}, { immediate: true, deep: true });

// Cleanup
onUnmounted(() => {
    saveField.cancel();
});
</script>