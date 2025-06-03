/**
 * @description
 * @author lihao
 * @date 2025/5/26 09:52
 */
import React, { useEffect, useState } from 'react';
import './Feedback.css';
import {getErrorList, publishError, TypeItem} from "../../../api/feature/feedback.ts";
import {useToast} from "../../provider/ToastContext.tsx";
import {useNavigate} from "react-router-dom";

export const Feedback = () => {
    const [feedbackTypes, setFeedbackTypes] = useState<TypeItem[]>([]);
    const [selectedType, setSelectedType] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const {showToast} = useToast();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const res = await getErrorList();
                if (res.success) {
                    setFeedbackTypes(res.data);
                } else {
                    console.error('获取反馈类型失败：', res.message);
                }
            } catch (err) {
                console.error('网络错误：', err);
            }
        };
        fetchTypes();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedType || !content) {
            showToast("请填写完整信息", "error")
            return;
        }
        try {
            const res = await publishError(selectedType,  content, imageFile);
            if (res.success) {
                showToast(res.data, "success");
                navigate('/home');
            } else {
                showToast(typeof res.message === "string" ? res.message : "error")
            }
        } catch (err) {
            console.error('提交失败：', err);
        }
    };

    return (
        <form className="feedback-form" onSubmit={handleSubmit}>
            <label>反馈类型：</label>
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)} required>
                <option value="">请选择</option>
                {feedbackTypes.map(item => (
                    <option key={item.id} value={item.id}>{item.type}</option>
                ))}
            </select>

            <label>反馈内容：</label>
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="请输入反馈内容..."
                required
            />

            <label>上传图片：</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="预览" className="image-preview" />}
            <button type="submit">提交反馈</button>
        </form>
    );
};
