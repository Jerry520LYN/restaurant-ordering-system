<template>
  <div class="common-layout">
    <el-container>
      <!-- 顶部 Header -->
      <el-header class="topbar">
        <div class="header-title">餐厅点餐系统 - 管理后台</div>
        <el-dropdown @command="handleDropdown">
          <span class="user-info">
            👤 {{ authStore.user?.username || '管理员' }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <!-- 主体容器 -->
      <el-container>
        <!-- 左侧菜单栏 -->
        <el-aside width="220px" class="sidebar">
          <el-menu
            :default-active="activeIndex"
            router
            background-color="#f9f9f9"
            text-color="#333"
            active-text-color="#409EFF"
            :collapse="isCollapsed"
          >
            <!-- 首页 -->
            <el-menu-item index="/dashboard">
              <el-icon><home-filled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            
            <!-- 订单管理 -->
            <el-sub-menu index="2">
              <template #title>
                <el-icon><document /></el-icon>
                <span>订单管理</span>
              </template>
              <el-menu-item index="/dashboard/orders">所有订单</el-menu-item>
              <el-menu-item index="/dashboard/orders/new">新建订单</el-menu-item>
            </el-sub-menu>
            
            <!-- 菜品管理 -->
            <el-sub-menu index="3">
              <template #title>
                <el-icon><menu /></el-icon>
                <span>菜品管理</span>
              </template>
              <el-menu-item index="/dashboard/menu">菜品列表</el-menu-item>
              <el-menu-item index="/dashboard/menu/categories">分类管理</el-menu-item>
            </el-sub-menu>
            
            <!-- 用户管理 -->
            <el-menu-item index="/dashboard/users">
              <el-icon><user-filled /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
            
            <!-- 系统设置 -->
            <el-menu-item index="/dashboard/settings">
              <el-icon><setting /></el-icon>
              <span>系统设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 右侧内容区域 -->
        <el-main class="content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// 当前激活菜单
const activeIndex = computed(() => {
  return route.path
})

const handleDropdown = (command) => {
  if (command === 'logout') {
    authStore.logout()
    router.push('/login')
  } else if (command === 'profile') {
    router.push('/dashboard/profile')
  }
}

// Add collapse state
const isCollapsed = ref(false);

</script>

<style scoped>
.common-layout {
  height: 100vh;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0 20px;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.user-info {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.sidebar {
  background-color: #f9f9f9;
  border-right: 1px solid #eaeaea;
  transition: width 0.3s;
}

.el-menu {
  border-right: none;
}

.content {
  padding: 20px;
  background-color: #f5f7fa;
  height: calc(100vh - 60px);
  overflow: auto;
}

.el-icon {
  margin-right: 8px;
  font-size: 18px;
}
</style>