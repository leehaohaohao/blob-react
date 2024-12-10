/**
 * @description 鉴权接口
 * @author lihao
 * @date 2024/12/10 21:07
 */
import axiosInstance from "../axios.ts";


export const loginApi = (data:FormData)=>{
    return axiosInstance.post('/login',data)
}