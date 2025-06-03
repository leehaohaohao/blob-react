/**
 * @description 论坛接口
 * @author lihao
 * @date 2025/5/20 23:47
 */
import axiosInstance, {ApiResponse} from "../axios.ts";
import {OtherInfoDto, UserInfoDto} from "./user.ts";
const prefix:string = '/forum'
export interface PostItem {
    postId: string;
    tag: string;
    postTime: string;
    postLike: number;
    collect: number;
    title: string;
    cover: string;
    otherInfoDto: OtherInfoDto;
}
export interface TagItem {
    tag: string;
    nums: number;
}
export interface PostList{
    total:number;
    list: PostItem[];
    pageNum:  number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    pages: number;
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
}
export interface PostDetailItem{
    postId:string,
    userId:string,
    photo:string,
    name:string,
    tag:string,
    title:string,
    status:number,
    postContent:string,
    postLike:number,
    collect:number,
    postTime:string,
    isLove:boolean,
    isCollect: boolean,
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
export const getHotTag = async ():Promise<ApiResponse<TagItem[]>> =>{
    const res = await axiosInstance.get(prefix+'/get/tag');
    return res.data;
}
export const getTagPostList = async (
    tagFuzzy: string,
    pageNum: string,
    pageSize: string,
    options?: { signal?: AbortSignal }
): Promise<ApiResponse<PostList>> => {
    const formData = new FormData();
    formData.append('tagFuzzy', tagFuzzy);
    formData.append('pageNum', pageNum);
    formData.append('pageSize', pageSize);

    const res = await axiosInstance.post(prefix + '/tag/post', formData, {
        signal: options?.signal // 传递 AbortSignal
    });

    return res.data;
};
export const publishPost = async(post_content:string,tagList:string[],title:string,file?:File|null):Promise<ApiResponse<UserInfoDto>> =>{
    const formData = new FormData()
    formData.append('post_content',post_content);
    const tagFilter = tagList.filter(tag => tag.trim() !== '');
    const tag = tagFilter.join('|');
    formData.append('tags',tag);
    formData.append('title',title);
    if(file){
        formData.append('file',file)
    }
    const res = await axiosInstance.post(prefix+'/post',formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data
}
export const getPostDetail = async (postId:string):Promise<ApiResponse<PostDetailItem>> =>{
    const  formData = new FormData();
    formData.append('postId',postId);
    const res = await axiosInstance.post(prefix+'/id/post',formData);
    return res.data
}
export const getUserPostList = async (pageNum:string,pageSize:string,otherId:string|null):Promise<ApiResponse<PostItem[]>> =>{
    const formData = new FormData()
    formData.append('pageNum',pageNum);
    formData.append('pageSize',pageSize);
    if(otherId){
        formData.append('otherId',otherId)
    }
    const res = await axiosInstance.post(prefix+'/user/unapproval/post',formData)
    return res.data
}
export const getUserLikeOrCollectPostList = async (pageNum:string,pageSize:string,status:string):Promise<ApiResponse<PostItem[]>> =>{
    const formData = new FormData()
    formData.append('pageNum',pageNum);
    formData.append('pageSize',pageSize);
    formData.append('status',status);
    const res = await axiosInstance.post(prefix+'/my/like/collect/post',formData)
    return res.data
}