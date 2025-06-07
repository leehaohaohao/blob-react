/**
 * @description axios封装
 * @author lihao
 * @date 2024/12/10 21:01
 */
import axios from 'axios'
//创建axios实例
const axiosInstance = axios.create({
    baseURL: 'http://121.40.154.188:9090/blob',
    //baseURL: 'http://localhost:9090/blob',
    timeout: 10000
})
//请求拦截器(添加请求头)
axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = token
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default axiosInstance
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message:string|null;
}