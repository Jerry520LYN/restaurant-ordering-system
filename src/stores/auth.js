import { defineStore } from 'pinia';
import { login } from '@/api/auth';
export const useAuthStore = defineStore('auth',{
  state: () => {
    return {
      isAuthenticated: false,
      token: null,
      error: null
    }
  },
  actions:{
    async login(credentials){
      try{
        const result = await login(credentials);
        this.token = result.data.token;
        this.isAuthenticated = true;
        this.error = null;
        return true;
      }catch(error){ 
        this.isAuthenticated = false;
        this.token = null;
        this.error = error;
        return false;
      }
    },
  },
});