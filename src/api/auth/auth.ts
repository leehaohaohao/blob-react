/**
 * @description 鉴权接口
 * @author lihao
 * @date 2024/12/10 21:07
 */
import axiosInstance, {ApiResponse} from "../axios.ts";


export const loginApi = async (email: string, password: string)=>{
    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    const res = await axiosInstance.post('/login',formData)
    return res.data;
}
export const mLoginApi = async (email: string, password: string)=>{
    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    const res = await axiosInstance.post('/manager/login',formData)
    return res.data;
}
export const sendEmailCode = async (email: string): Promise<ApiResponse<string>> => {
    const formData = new FormData();
    formData.append('email', email);
    const response = await axiosInstance.post('/email/code',formData);
    return response.data;
};
export const registerApi = async (email: string, password: string, code: string)=>{
    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    formData.append('code',code);
    const res = await axiosInstance.post('/register',formData)
    return res.data;
}