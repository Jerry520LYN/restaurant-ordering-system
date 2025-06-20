import { defineStore } from 'pinia';
import { login } from '@/api/auth';
import { register } from '@/api/auth';
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
        this.token = result;
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

export const useRegisterStore = defineStore('register',{
  state: () => {
    return {
      isRegistering: false,
      error: null
    }
  },
  actions: {
    async register(form) {
      try {
        await register(form);
        this.isRegistering = true;
        this.error = null;
        return true;
      } catch (error) {
        this.error = error;
        this.isRegistering = false;
        this.error = error;
        return false;
      }
    }
  }
});