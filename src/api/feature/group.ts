/**
 * @description
 * @author lihao
 * @date 2025/6/6
 */
import axiosInstance, {ApiResponse} from "../axios.ts";
const prefix = '/group'
export interface GroupItem{
    id: string;
    userId: string;
    avatar: string;
    name: string;
    time: string;
    status: number;
}
export interface GroupCommentItem{
    ownerId: string;
    groupId: string;
    userId: string;
    name: string;
    avatar: string;
    content: string;
    status: number;//status为0说明是自己否则为他人
}
export interface GroupCommentList{
    ownerId: string;
    commentList: GroupCommentItem[];
}
export const createGroup = async (
    name: string,
    file?: File
): Promise<ApiResponse<null>> => {
    const formData = new FormData();
    formData.append('name', name);
    if (file) {
        formData.append('file', file);
    }
    const res = await axiosInstance.post(prefix + '/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};
export const selectGroupById = async (groupId:string):Promise<ApiResponse<GroupItem>> =>{
    const formData = new FormData();
    formData.append('groupId', groupId);
    const res = await axiosInstance.post(prefix + '/select/group', formData);
    return res.data;
}
export const selectGroupList = async (
    pageNum: string,
    pageSize: string
): Promise<ApiResponse<GroupItem[]>> => {
    const formData = new FormData();
    formData.append('pageNum', pageNum);
    formData.append('pageSize', pageSize);
    const res = await axiosInstance.post(prefix + '/select/list',formData);
    return res.data;
};
export const selectMyGroup = async (): Promise<ApiResponse<GroupItem>> => {
    const res = await axiosInstance.get(prefix + '/select/my');
    return res.data;
};
export const addGroup = async (groupId: string): Promise<ApiResponse<null>> => {
    const formData = new FormData();
    formData.append('groupId', groupId);
    const res = await axiosInstance.post(prefix + '/add', formData);
    return res.data;
};
export const selectGroupCommentList = async (
    groupId: string,
    pageNum: string,
    pageSize: string
): Promise<ApiResponse<GroupCommentList>> => {
    const formData = new FormData();
    formData.append('groupId', groupId);
    formData.append('pageNum', pageNum);
    formData.append('pageSize', pageSize);
    const res = await axiosInstance.post(prefix + '/select/comment',formData);
    return res.data;
};
export const groupRemoveUser = async (
    groupId: string,
    otherId: string
): Promise<ApiResponse<null>> => {
    const formData = new FormData();
    formData.append('groupId', groupId);
    formData.append('otherId', otherId);
    const res = await axiosInstance.post(prefix + '/remove', formData);
    return res.data;
};
export const groupChat = async (
    groupId: string,
    content: string
): Promise<ApiResponse<null>> => {
    const formData = new FormData();
    formData.append('groupId', groupId);
    formData.append('content', content);
    const res = await axiosInstance.post(prefix + '/chat', formData);
    return res.data;
};
