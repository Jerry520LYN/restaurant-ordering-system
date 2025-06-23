<template>
  <div>
    <span class="flex justify-between items-center mb-5">
      <h2 class="m-0 text-gray-800 text-xl font-bold">全部菜品信息</h2>
      <div class="flex gap-2">
        <el-button type="primary" @click="getMenuList" >
          刷新菜品列表
        </el-button>
        <el-button type="primary" @click="addDish">
          添加菜品
        </el-button>
      </div>
      <!--span中的div不会换行-->
    </span>
    
    <el-table
      :data="menuData"
      style="width: 100%"
      stripe
      border>
      <el-table-column
        prop="dishId"
        label="菜品ID"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dishName"
        label="菜品名称"
        width="180"
        align="center">
        <template #default="scope">
          {{ scope.row.dishName || scope.row.dish_name || '未知菜品' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="120"
        align="center">
        <template #default="scope">
          ¥{{ scope.row.price || '0.00' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        min-width="200"
        show-overflow-tooltip>
        <template #default="scope">
          {{ scope.row.description || '暂无描述' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="imageUrl"
        label="图片"
        width="200"
        align="center">
        <template #default="scope">
          <el-image
            :src="scope.row.imageUrl || scope.row.image_url || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop'"
            class="w-20 h-20"
            fit="cover"
            :preview-src-list="[scope.row.imageUrl || scope.row.image_url || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop']">
            <template #error>
              <div class="flex justify-center items-center w-20 h-20 bg-gray-100 text-gray-500 text-xl">
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        align="center"
        fixed="right">
        <template #default="scope">
          <el-button size="small" type="primary" @click="updateDish(scope.row)">
            更新
          </el-button>
          <el-button size="small" type="danger" @click="deleteDish(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 无数据提示 -->
    <div v-if="!menuData || menuData.length === 0" class="flex justify-center items-center min-h-50">
      <el-empty description="暂无菜品数据" />
    </div>

    <!-- 更新菜品对话框 -->
    <el-dialog v-model="updateDialogVisible" title="更新菜品" width="500px" @closed="handleDialogClose">
        <MenuUpdateCard v-if="currentDish" :dish="currentDish" @update-success="handleUpdateSuccess" @close="updateDialogVisible = false" />
    </el-dialog>
    <el-dialog v-model="addDialogVisible" title="添加菜品" width="500px" @closed="handleDialogClose">
      <MenuAddCard v-if="addDishForm" :dish="addDishForm" @add-success="handleAddSuccess" @close="addDialogVisible = false" />
    </el-dialog>
  </div>
</template>

<script>
import { useMenuStore } from '@/stores/menu'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'
import MenuUpdateCard from './MenuUpdateCard.vue'
import MenuAddCard from './MenuAddCard.vue'
export default {
  name: 'MenuForm',
  components: {
    Picture,
    MenuUpdateCard,
    MenuAddCard
  },
  data() {
    return {
      menuData: [],
      updateDialogVisible: false,
      currentDish: null,
      addDialogVisible: false,
      addDishForm: null
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      try {
        const menuStore = useMenuStore()
        await menuStore.fetchMenuList()
        this.menuData = menuStore.menuList || []
        
        if (this.menuData.length > 0) {
          ElMessage.success(`成功获取 ${this.menuData.length} 个菜品信息`)
        } else {
          ElMessage.warning('暂无菜品数据')
        }
      } catch (error) {
        ElMessage.error('获取菜单失败: ' + (error.message || error))
        console.error('获取菜单失败:', error)
      }
    },
    
    viewDish(dish) {
      ElMessage.info(`查看菜品: ${dish.dishName || dish.dish_name}`)
      console.log('菜品详情:', dish)
    },
    
    async deleteDish(dish) {
      try {
        await ElMessageBox.confirm(
          `确定要删除菜品 "${dish.dishName || dish.dish_name}" 吗？`,
          '确认删除',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
        const menuStore = useMenuStore()
        await menuStore.deleteDish(dish.dishId)
        ElMessage.success('删除成功')
        // 重新获取列表
        this.getMenuList()
      } catch (error) {
        if (error !== 'cancel') {
          ElMessage.error('删除失败: ' + error.message)
        }
      }
    },

    updateDish(dish) {
      this.currentDish = dish
      this.updateDialogVisible = true
      console.log('菜品详情:', dish)
    },

    handleUpdateSuccess() {
        this.updateDialogVisible = false;
        this.getMenuList();
        ElMessage.success('菜品更新成功');
        this.currentDish = null;
    },

    handleDialogClose() {
        this.currentDish = null;
    },

    addDish() {
        this.addDishForm = {
            dishId: '',
            dishName: '',
            price: '',
            description: '',
            imageUrl: ''
        };
        this.addDialogVisible = true;
    },

    handleAddSuccess() {
        this.addDialogVisible = false;
        this.getMenuList();
        ElMessage.success('菜品添加成功');
        this.addDishForm = null;
    }
  }
}
</script>

