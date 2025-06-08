/**
 * @description 审批详情页
 * @author lihao
 * @date 2025/6/8
 */
import './MaApprovalPost.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {approvalPost, getApprovalPostDetail, PostDetailItem} from "../../../api/feature/forum.ts";
import {useToast} from "../../provider/ToastContext.tsx";

const MaApprovalPost = () => {
    const [postDetailItem, setPostDetailItem] = useState<PostDetailItem>();
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const {showToast} = useToast();
    useEffect(() => {
        const postDetail = async (postId: string) => {
            const data = await getApprovalPostDetail(postId);
            if(data.success){
                setPostDetailItem(data.data);
            }else {
                showToast(typeof data.message === "string" ? data.message :"查询失败",  'error');
            }

        };
        if (postId) {
            postDetail(postId);
        }
    }, [postId]);

    const handleApprove = async (postId: string) => {
        await approveArticle(postId, 0); // 状态码 0 表示批准
    };

    const handleReject = async (postId: string) => {
        await approveArticle(postId, 3); // 状态码 3 表示拒绝
    };

    const approveArticle = async (postId: string, status: number) => {
        try {
            const data = await approvalPost(postId, status.toString());
            if (data.success) {
                showToast(data.data, "info");
                navigate(-1); // 审批成功后返回上一个页面
            } else {
                showToast("操作失败：" + data.message, "error");
            }
        } catch (error) {
            showToast("请求出错", "error");
            console.error("审批出错:", error);
        }
    };

    return (
        <div className="ma-approval-container">
            <div className="ma-approval-post-wrapper">
                <div className="ma-approval-post-detail-author">
                    <img
                        className="ma-approval-author-avatar"
                        onClick={() => navigate(`/home/person/${postDetailItem?.userId}`)}
                        src={postDetailItem?.photo}
                        alt="作者头像"
                    />
                    <div className="ma-approval-author-name">{postDetailItem?.name}</div>
                </div>

                <div className="ma-approval-post-detail-container">
                    <div className="ma-approval-post-detail-header">
                        <span className="ma-approval-post-title-text">{postDetailItem?.title}</span>
                        <span className="ma-approval-post-detail-time">
                            发布于 {
                            postDetailItem?.postTime
                                ? new Date(postDetailItem.postTime).toLocaleString('zh-CN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                })
                                : ''
                        }
                        </span>
                    </div>

                    <div className="ma-approval-post-detail-tagContainer">
                        {postDetailItem?.tag.split('|').map((tag, index) => (
                            <div
                                key={index}
                                className="ma-approval-post-detail-tag"
                                onClick={() => navigate(`/article/${tag}`)}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>

                    <div
                        className="ma-approval-post-content"
                        dangerouslySetInnerHTML={{
                            __html: postDetailItem?.postContent || '<h1>正在加载中！</h1>'
                        }}
                    />

                </div>

                <div className="ma-approval-post-comment-container">
                    <div className="ma-approval-cover-wrapper">
                        <img
                            className="ma-approval-approval-cover"
                            src={postDetailItem?.cover || 'https://via.placeholder.com/300x200?text=暂无封面'}
                            alt="封面图"
                        />
                        <div className="ma-approval-post-approval-buttons">
                            <button className="ma-approval-approve-button" onClick={() => handleApprove(postId!)}>
                                批准
                            </button>
                            <button className="ma-approval-reject-button" onClick={() => handleReject(postId!)}>
                                拒绝
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaApprovalPost;
