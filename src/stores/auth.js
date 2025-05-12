import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    // token: localStorage.getItem('token') || null,
    token:null,
    isLoading: false,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(credentials) {
      this.isLoading = true
      this.error = null

      try {
        // 模拟登录逻辑开始 ---
        // 实际开发中可以删除下面这部分，启用真实API请求
        const mockUser = {
          id: 1,
          username: credentials.username,
          role: 'admin'
        }
        const mockToken = 'mocked-jwt-token-for-dev'

        this.user = mockUser
        this.token = mockToken
        localStorage.setItem('token', mockToken)

        return true
        // 模拟登录逻辑结束 ---

        // 真实API登录（暂时注释掉）
        // const { user, token } = await authApi.login(credentials)
        // this.user = user
        // this.token = token
        // localStorage.setItem('token', token)
        // return true
      } catch (error) {
        this.error = '登录失败，请检查用户名或密码'
        return false
      } finally {
        this.isLoading = false
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})