<template>
    <div class="menu-card-layout">
        <div class="hot-dishes-header">
            <h2 class="hot-dishes-title">热品推荐</h2>
            <div class="date-picker-container">
                <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="开始日期"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    style="margin-right: 10px;"
                />
                <el-date-picker
                    v-model="endDate"
                    type="date"
                    placeholder="结束日期"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    style="margin-right: 10px;"
                />
                <el-button type="primary" @click="handleConfirm">确定</el-button>
            </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="menuStore.loading" class="loading-container">
            <el-loading :fullscreen="false" />
        </div>
        
        <!-- 错误信息 -->
        <div v-if="menuStore.error" class="error-message">
            <el-alert :title="menuStore.error" type="error" show-icon />
        </div>
        
        <!-- 菜单卡片列表 -->
        <el-row v-if="!menuStore.loading && !menuStore.error" :gutter="20">
            <el-col 
                v-for="dish in (menuStore.hotDishes || []).slice(0, 4)" 
                :key="dish.dish_id" 
                :xs="24" 
                :sm="12" 
                :md="8" 
                :lg="6"
                style="margin-bottom: 20px;"
            >
                <MenuCard :dish="dish" :showDebug="false" />
            </el-col>
        </el-row>
        
        <!-- 无数据提示 -->
        <div v-if="!menuStore.loading && !menuStore.error && (!menuStore.hotDishes || menuStore.hotDishes.length === 0)" class="no-data">
            <el-empty description="暂无热品推荐数据" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElLoading } from 'element-plus';
import MenuCard from './MenuCard.vue';
import { useMenuStore } from '@/stores/menu';

// 响应式数据
const startDate = ref('');
const endDate = ref('');
const menuStore = useMenuStore();

// 设置默认日期（当前日期前后7天）
const setDefaultDates = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    startDate.value = sevenDaysAgo.toISOString().split('T')[0];
    endDate.value = today.toISOString().split('T')[0];
};

// 确认按钮点击事件
const handleConfirm = async () => {
    if (!startDate.value || !endDate.value) {
        ElMessage.warning('请选择开始和结束日期');
        return;
    }
    
    if (new Date(startDate.value) > new Date(endDate.value)) {
        ElMessage.error('开始日期不能晚于结束日期');
        return;
    }
    
    await fetchHotDishes();
};

// 获取热品数据
const fetchHotDishes = async () => {
    if (startDate.value && endDate.value) {
        // 根据后端要求，只传递日期部分（yyyy-MM-dd格式），不添加时分秒
        await menuStore.fetchHotDishes(startDate.value, endDate.value);
    }
};

// 组件挂载时设置默认日期并获取数据
onMounted(() => {
    setDefaultDates();
    fetchHotDishes();
});
</script>

<style scoped>
.menu-card-layout {
    padding: 20px;
}

.hot-dishes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
}

.hot-dishes-title {
    margin: 0;
    color: #333;
    font-size: 24px;
    font-weight: bold;
}

.date-picker-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
}

.error-message {
    margin: 20px 0;
}

.no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
}

@media (max-width: 768px) {
    .hot-dishes-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .date-picker-container {
        width: 100%;
        flex-wrap: wrap;
    }
}
</style>