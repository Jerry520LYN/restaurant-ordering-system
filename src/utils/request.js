import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const instance = axios.create(
    {
        baseURL:'http://localhost:8080',
    }
);

// 请求拦截器 - 自动添加 token 到请求头
instance.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        console.log('请求拦截器 - 当前token:', authStore.token);
        console.log('请求拦截器 - 请求URL:', `${config.baseURL}${config.url}`);
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`;
            console.log('已添加Authorization头:', config.headers.Authorization);
        } else {
            console.log('没有找到token，跳过Authorization头');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) =>{
        console.log('Requesting URL:', `${response.config.baseURL}${response.config.url}`);
        console.log('响应拦截器 - 原始响应:', response);
        console.log('响应拦截器 - response.data:', response.data);
        
        const result = response.data;
        console.log('响应拦截器 - result:', result);
        console.log('响应拦截器 - result.code:', result.code);
        
        if(result.code === 0){
            console.log('响应拦截器 - 成功，返回data:', result.data);
            return result.data;
        }else{
            console.log('响应拦截器 - 失败，错误信息:', result.message);
            alert(result.message||'服务异常');
            return Promise.reject(result);
        }      
    },
    (error) =>{
        
        console.error('响应拦截器 - 请求异常:', error);
        alert('请求异常');
        return Promise.reject(error);
    }
)

export default instance;