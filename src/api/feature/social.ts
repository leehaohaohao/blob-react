/**
 * @description
 * @author lihao
 * @date 2025/6/2
 */
import axiosInstance, {ApiResponse} from "../axios.ts";
import {UserInfoDto} from "./user.ts";
const prefix = '/social'

export interface CommentItem {
    commentId: string;
    userId: string;
    photo: string;
    userName: string;
    parentId: string;
    parentName: string;
    commentContent: string;
    topId: string;
    commentDate: string;
    childCommentDto?: CommentItem[];
}
export interface CommentResponse{
    topId: string,
    commentId: string;
}
export interface ConcernItem{
    userInfoDto:UserInfoDto,
    status:number;
}
export const getPostComment = async (postId:string):Promise<ApiResponse<CommentItem[]>> =>{
    const formData = new FormData()
    formData.append('postId',postId)
    const res = await axiosInstance.post(prefix+'/get/comment',formData)
    return res.data
}
export const concernOther = async (otherId:string):Promise<ApiResponse<null>> =>{
    const formData = new FormData()
    formData.append('otherId',otherId)
    const res = await axiosInstance.post(prefix+'/concern',formData)
    return res.data
}
export const commentToPost = async (postId:string,parentId:string,commentContent:string): Promise<ApiResponse<CommentResponse>> =>{
    const formData = new FormData()
    formData.append('postId',postId)
    formData.append('parentId',parentId)
    formData.append('commentContent',commentContent)
    const res = await axiosInstance.post(prefix+'/comment',formData)
    return res.data
}
export const getConcernList = async (
    pageNum: string,
    pageSize: string,
    status: string,
    otherId: string|null = null
): Promise<ApiResponse<ConcernItem[]>> => {
    const res = await axiosInstance.post(prefix + '/get/concern/follower', {
        page: {
            pageNum,
            pageSize
        },
        status,
        otherId
    });
    return res.data;
};
