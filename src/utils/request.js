import axios from 'axios';

const instance = axios.create(
    {
        baseURL:'http://localhost:8080',
    }
);

instance.interceptors.response.use(
    (response) =>{
        const result = response.data;
        if(result.code === 0){
            return result.data;
        }else{
            alert(result.message||'服务异常');
            return Promise.reject(result);
        }      
    },
    (error) =>{
        alert('请求异常');
        return Promise.reject(error);
    }
)

export default instance;