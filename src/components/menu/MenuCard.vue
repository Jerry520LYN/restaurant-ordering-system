<template>
    <el-row>
        <el-col>
            <el-card class="menu-card" style="width: 350px; height: 530px;">
                <img 
                    :src="dish.imageUrl || dish.image_url || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop'" 
                    :alt="dish.dish_name || dish.dishName || dish.name || '菜品名称'" 
                    class="menu-image" 
                    style="width: 100%; height: 400px; object-fit: cover;"
                    @error="handleImageError"
                    @load="handleImageLoad"
                >
                <div class="card-content" style="padding: 8px;">
                    <span class="dish-name" style="font-size: 14px; font-weight: bold;">
                        {{ dish.dish_name || dish.dishName || dish.name || '菜品名称' }}
                    </span>
                    <div class="dish-description" style="font-size: 12px; color: #666;">
                        {{ dish.description || '菜品描述' }}
                    </div>
                    <div class="dish-info" style="margin-top: 8px;">
                        <span v-if="dish.price" style="font-size: 16px; color: #e74c3c; font-weight: bold;">
                            ¥{{ dish.price }}
                        </span>
                        <span v-if="dish.total_quantity" style="font-size: 12px; color: #666; margin-left: 10px;">
                            销量: {{ dish.total_quantity }}
                        </span>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: {
        dish: {
            type: Object,
            default: () => ({
                dish_name: '菜品名称',
                dishName: '菜品名称',
                name: '菜品名称',
                description: '菜品描述',
                price: '0.00',
                total_quantity: 0,
                imageUrl: '',
                image_url: ''
            })
        }
    },
    mounted() {
        // 打印接收到的菜品数据
        console.log('MenuCard - 接收到的菜品数据:', this.dish);
        console.log('MenuCard - 图片URL:', this.dish.imageUrl || this.dish.image_url);
    },
    methods: {
        handleImageError(event) {
            console.error('MenuCard - 图片加载失败:', event.target.src);
            // 设置默认图片
            event.target.src = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop';
        },
        handleImageLoad(event) {
            console.log('MenuCard - 图片加载成功:', event.target.src);
        }
    }
}
</script>