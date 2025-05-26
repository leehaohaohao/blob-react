/**
 * @description
 * @author lihao
 * @date 2025/5/26 16:40
 */
import axiosInstance, {ApiResponse} from "../axios.ts";
const prefix:string= "/error/getType";
export interface TypeItem{
    id:number;
    type:string;
}
export const getErrorList = async ():Promise<ApiResponse<TypeItem[]>> => {
    const res = await axiosInstance.get(prefix)
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

    const res = await axiosInstance.post('/error/publish', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
