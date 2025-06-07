/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import axiosInstance, {ApiResponse} from "../axios.ts";
import {PostItem, TagItem} from "./forum.ts";
import {UserInfoDto} from "./user.ts";
import {GroupDto} from "./group.ts";
const prefix:string = '/back'
export interface NumData{
    userNum:number,
    uuserNum:number,
    postNum:number,
    upostNum:number,
    tagNum:number,
    groupNum:number,
}
export interface ApiStatItem {
    id: string;
    name: string;
    count: number;
    maxTime: number;
    averageTime: number;
    minTime: number;
}
export interface UpdatePersonParams {
    userId: string;
    name?: string;
    telephone?: string;
    gender?: string;
    status?: string;
    file?: File;
}
export type ApiStatisticsMap = Record<string, ApiStatItem[]>;
export const getNumData = async (): Promise<ApiResponse<NumData>> => {
    const res = await axiosInstance.get(prefix+'/num')
    return res.data
}
export const getHotPost = async (pageNum:string,pageSize:string): Promise<ApiResponse<PostItem[]>> => {
    const formData = new FormData()
    formData.append('pageNum',pageNum);
    formData.append('pageSize',pageSize);
    const res = await axiosInstance.post(prefix+'/hot/post',formData)
    return res.data
}
export const getHotTag = async (pageNum:string,pageSize:string): Promise<ApiResponse<TagItem[]>> => {
    const formData = new FormData()
    formData.append('pageNum',pageNum);
    formData.append('pageSize',pageSize);
    const res = await axiosInstance.post(prefix+'/hot/tag',formData)
    return res.data
}
export const getApiStatistics = async (): Promise<ApiResponse<ApiStatisticsMap>> => {
    const res = await axiosInstance.post(prefix+'/api')
    return res.data
}
export const getUserList = async (pageNum:string,pageSize:string,status:string): Promise<ApiResponse<UserInfoDto[]>> => {
    const formData = new FormData()
    formData.append('pageNum',pageNum);
    formData.append('pageSize',pageSize);
    formData.append('status',status);
    const res = await axiosInstance.post(prefix+'/person',formData)
    return res.data
}
export const updatePerson = async (params: {
    userId: string;
    name?: string;
    telephone?: string;
    gender?: string;
    status?: string;
    file?: File | null;
}): Promise<ApiResponse<UserInfoDto>> => {
    const formData = new FormData();
    formData.append('userId', params.userId);
    if (params.name !== undefined) formData.append('name', params.name);
    if (params.telephone !== undefined) formData.append('telephone', params.telephone);
    if (params.gender !== undefined) formData.append('gender', params.gender);
    if (params.status !== undefined) formData.append('status', params.status);
    if (params.file) formData.append('file', params.file);
    const res = await axiosInstance.post(prefix + '/update/person', formData);
    return res.data;
};

export const getGroupList = async (pageNum:string,pageSize:string,status:string) : Promise<ApiResponse<GroupDto[]>> => {
    const formData = new FormData()
    formData.append('pageNum',pageNum);
    formData.append('pageSize',pageSize);
    formData.append('status',status);
    const res = await axiosInstance.post(prefix+'/group/list',formData)
    return res.data
}
export const updateGroup = async (params: {
    id: string;
    name?: string;
    status?: string | number;
    file?: File | null;
}): Promise<ApiResponse<unknown>> => {
    const formData = new FormData();
    formData.append("id", params.id);
    if (params.name !== undefined) formData.append("name", params.name);
    if (params.status !== undefined) formData.append("status", params.status.toString());
    if (params.file) formData.append("file", params.file);
    const res = await axiosInstance.post(prefix + "/group/update", formData);
    return res.data;
};


