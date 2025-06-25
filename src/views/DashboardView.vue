<template>
  <div class="h-screen">
    <el-container>
      <!-- 顶部 Header -->
      <el-header class="flex justify-between items-center bg-white shadow-md z-10 px-5">
        <div class="text-lg font-bold text-gray-800">餐厅点餐系统 - 管理后台</div>
        <el-dropdown @command="handleDropdown">
          <span class="cursor-pointer flex items-center gap-1">
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
        <el-aside width="220px" class="bg-gray-50 border-r border-gray-200 transition-all duration-300">
          <el-menu
            :default-active="activeIndex"
            router
            background-color="#f9f9f9"
            text-color="#333"
            active-text-color="#409EFF"
            :collapse="isCollapsed"
            class="border-r-0"
          >
            <!-- 首页 -->
            <el-menu-item index="/dashboard">
              <el-icon class="mr-2 text-lg"><home-filled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            
            
            <el-menu-item index="/dashboard/orders">
              <el-icon class="mr-2 text-lg"><document /></el-icon>
              <span>订单信息管理</span>
            </el-menu-item>
            <el-menu-item index="/dashboard/checkout">
              <el-icon class="mr-2 text-lg"><wallet /></el-icon>
              <span>点餐结账管理</span>
            </el-menu-item>
                        
            <!-- 菜品管理 -->
            <el-menu-item index="/dashboard/menu">
              <el-icon class="mr-2 text-lg"><food /></el-icon>
              <span>菜品管理</span>
            </el-menu-item>
            
            <!-- 用户管理 -->
            <el-menu-item index="/dashboard/customers">
              <el-icon class="mr-2 text-lg"><user-filled /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
            
            <!-- 餐桌管理 -->
            <el-menu-item index="/dashboard/tables">
              <el-icon class="mr-2 text-lg"><grid /></el-icon>
              <span>餐桌管理</span>
            </el-menu-item>
            
            <!-- 叫号服务 -->
            <el-menu-item index="/dashboard/calling-number">
              <el-icon class="mr-2 text-lg"><bell /></el-icon>
              <span>叫号服务</span>
            </el-menu-item>
            
          </el-menu>
        </el-aside>

        <!-- 右侧内容区域 -->
        <el-main class="p-5 bg-gray-50 h-[calc(100vh-60px)]">
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