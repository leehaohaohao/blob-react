/**
 * @description
 * @author lihao
 * @date 2025/5/26 18:11
 */
import React, {useState } from 'react';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import type { IDomEditor } from '@wangeditor/editor';
import './PublishPost.css';
import { publishPost } from "../../../api/feature/forum.ts";
import { useToast } from "../../provider/ToastContext.tsx";
import { useNavigate } from "react-router-dom";

const MAX_TAGS = 5;
const MAX_TAG_LENGTH = 10;

const PublishPost = () => {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState<string[]>(['']);
    const [editor, setEditor] = useState<IDomEditor | null>(null);
    const [html, setHtml] = useState('');
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState('');
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleTagChange = (index: number, value: string) => {
        const newTags = [...tags];
        newTags[index] = value.slice(0, MAX_TAG_LENGTH);
        setTags(newTags);
    };

    const handleAddTag = () => {
        if (tags.length < MAX_TAGS && !tags.includes('')) {
            setTags([...tags, '']);
        }
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverFile(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!title || tags.filter(tag => tag.trim()).length === 0 || !html) {
            showToast("请填写完整信息", "error");
            return;
        }
        try {
            const res = await publishPost(html,tags,title,coverFile);
            if (res.success) {
                showToast("发布成功", "success");
                navigate('/home');
            } else {
                showToast(res.message || "发布失败", "error");
            }
        } catch (err) {
            console.error("提交失败", err);
            showToast("提交失败，请稍后再试", "error");
        }
    };
    const handleRemoveTag = (index: number) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags.length ? newTags : ['']); // 至少保留一个
    };

    return (
        <div className="publish-post-container">
            <h2>发布文章</h2>
            <input
                type="text"
                className="publish-post-title"
                placeholder="请输入标题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <div className="publish-post-tag-section">
                <label>标签：</label>
                {tags.map((tag, idx) => (
                    <div key={idx} className="publish-post-tag-wrapper">
                        <input
                            type="text"
                            className="publish-post-tag-input"
                            placeholder="请输入标签"
                            value={tag}
                            onChange={(e) => handleTagChange(idx, e.target.value)}
                        />
                        {tags.length > 1 && (
                            <button
                                type="button"
                                className="publish-post-remove-tag"
                                onClick={() => handleRemoveTag(idx)}
                                title="删除标签"
                            >
                                －
                            </button>
                        )}
                    </div>
                ))}
                {tags.length < MAX_TAGS && !tags.includes('') && (
                    <button type="button" className="publish-post-add-tag" onClick={handleAddTag}>＋</button>
                )}
            </div>


            <div className="publish-post-editor-section">
                <Toolbar editor={editor} mode="default"/>
                <Editor
                    defaultConfig={{placeholder: '请输入内容...'}}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{height: '300px', border: '1px solid #ccc', marginTop: '10px'}}
                />
            </div>

            <div className="publish-post-cover-section">
                <label>封面上传：</label>
                <input type="file" accept="image/*" onChange={handleCoverChange}/>
                {coverPreview && <img src={coverPreview} alt="预览" className="publish-post-cover-preview"/>}
            </div>

            <button type="button" className="publish-post-submit-button" onClick={handleSubmit}>
                发布文章
            </button>
        </div>

    );
};

export default PublishPost;
