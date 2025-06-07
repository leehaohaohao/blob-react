/**
 * @description
 * @author lihao
 * @date 2025/5/26 16:40
 */
import axiosInstance, {ApiResponse} from "../axios.ts";
const prefix:string= "/error";
export interface TypeItem{
    id:number;
    type:string;
}
export interface ErrorItem{
    feedbackId:number;
    name:string;
    type:string;
    time:string;
    content:string;
    file:string;
}
export const getErrorList = async ():Promise<ApiResponse<TypeItem[]>> => {
    const res = await axiosInstance.get(prefix+'/getType')
    return res.data
}
export const publishError = async (
    status: string,
    content: string,
    file?: File | null
): Promise<ApiResponse<string>> => {
    const formData = new FormData();
    formData.append("status", status.toString());
    formData.append("content", content);
    if (file) {
        formData.append("file", file);
    }

    const res = await axiosInstance.post(prefix+'/publish', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const getErrorItemList = async (pageNum:string,pageSize:string):Promise<ApiResponse<ErrorItem[]>> => {
    const formData = new FormData();
    formData.append("pageNum", pageNum);
    formData.append("pageSize", pageSize);
    const res = await axiosInstance.post(prefix+'/get', formData)
    return res.data
}
export const updateFeedbackStatus = async (params: {
    feedbackId: string | number;
    status: string | number;
}): Promise<ApiResponse<unknown>> => {
    const formData = new FormData();
    formData.append("feedbackId", params.feedbackId.toString());
    formData.append("status", params.status.toString());

    const res = await axiosInstance.post(prefix + "/update", formData);
    return res.data;
};