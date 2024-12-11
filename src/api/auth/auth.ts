/**
 * @description 鉴权接口
 * @author lihao
 * @date 2024/12/10 21:07
 */
import axiosInstance from "../axios.ts";


export const loginApi = async (email: string, password: string)=>{
    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    const res = await axiosInstance.post('/login',formData)
    return res.data;
}