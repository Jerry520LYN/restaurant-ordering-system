<template>
  <div class="menu-form">
    <div class="header">
      <h2>全部菜品信息</h2>
      <el-button type="primary" @click="getMenuList" :loading="loading">
        刷新菜品列表
      </el-button>
    </div>
    
    <el-table
      :data="menuData"
      style="width: 100%"
      v-loading="loading"
      stripe
      border>
      <el-table-column
        prop="dishId"
        label="菜品ID"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dishName"
        label="菜品名称"
        width="150"
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
        width="200"
        show-overflow-tooltip>
        <template #default="scope">
          {{ scope.row.description || '暂无描述' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="imageUrl"
        label="图片"
        width="150"
        align="center">
        <template #default="scope">
          <el-image
            :src="scope.row.imageUrl || scope.row.image_url || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop'"
            style="width: 60px; height: 60px"
            fit="cover"
            :preview-src-list="[scope.row.imageUrl || scope.row.image_url || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop']">
            <template #error>
              <div class="image-error">
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        align="center">
        <template #default="scope">
          <el-button size="small" type="primary" @click="viewDish(scope.row)">
            查看
          </el-button>
          <el-button size="small" type="danger" @click="deleteDish(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 无数据提示 -->
    <div v-if="!loading && (!menuData || menuData.length === 0)" class="no-data">
      <el-empty description="暂无菜品数据" />
    </div>
  </div>
</template>

<script>
import { useMenuStore } from '@/stores/menu'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'

export default {
  name: 'MenuForm',
  components: {
    Picture
  },
  data() {
    return {
      menuData: [],
      loading: false
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      this.loading = true
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
      } finally {
        this.loading = false
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
        
        // 这里可以调用删除API
        ElMessage.success('删除成功')
        // 重新获取列表
        this.getMenuList()
      } catch (error) {
        if (error !== 'cancel') {
          ElMessage.error('删除失败: ' + error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
.menu-form {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  margin: 0;
  color: #333;
}

.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.image-error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #f5f5f5;
  color: #999;
  font-size: 20px;
}
</style>

