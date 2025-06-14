/**
 * @description 用户接口
 * @author lihao
 * @date 2024/12/13 20:49
 */
import axiosInstance, {ApiResponse} from "../axios.ts";
const prefix:string = '/user'
export interface UserInfoDto {
    userId: string;
    name: string;
    email:string;
    telephone:string;
    lastLoginTime:string;
    gender: number;
    photo: string;
    followers: number;
    concern: number;
    post: number;
    selfTag: string;
    status: number;
    love:number;
    collect:number;
}
export interface OtherInfoDto {
    userInfoDto: UserInfoDto;
    status: number;
}
export const getUserInfo = async(): Promise<ApiResponse<UserInfoDto>> =>{
    const res = await axiosInstance.get(prefix+'/info')
    return res.data
}
export const updateUserTag = async(selfTag:string): Promise<ApiResponse<UserInfoDto>> =>{
    const formData = new FormData()
    formData.append('selfTag',selfTag);
    const res = await axiosInstance.post(prefix+'/updateTag', formData);
    return res.data
}
export const getOtherInfo = async(otherId:string): Promise<ApiResponse<OtherInfoDto>> =>{
    const res = await axiosInstance.get(prefix+'/other/info',{
        params:{
            otherId
        }
    })
    return res.data
}