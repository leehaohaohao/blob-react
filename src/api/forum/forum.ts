/**
 * @description 论坛接口
 * @author lihao
 * @date 2025/5/20 23:47
 */
import axiosInstance, {ApiResponse} from "../axios.ts";
import {OtherInfoDto} from "../user/user.ts";
const prefix:string = '/forum'
export interface PostItem {
    postId: string;
    tag: string;
    postTime: string;
    postLike: number;
    collect: number;
    title: string;
    cover: string;
    otherInfoDto?: OtherInfoDto;
}
export const getUserPost = async(pageNum:string,pageSize:string,sort:string):Promise<ApiResponse<PostItem[]>> =>{
    const formData = new FormData()
    formData.append('pageNum',pageNum);
    formData.append('pageSize',pageSize);
    formData.append('sort',sort)
    const res = await axiosInstance.post(prefix+'/user/unapproval/post',formData)
    return res.data
}
export const getUserLikeOrCollect = async (pageNum:string,pageSize:string,status:string):Promise<ApiResponse<PostItem[]>> =>{
    const formData = new FormData()
    formData.append('pageNum',pageNum);
    formData.append('pageSize',pageSize);
    formData.append('status',status);
    const res = await axiosInstance.post(prefix+'/my/like/collect/post',formData)
    return res.data
}