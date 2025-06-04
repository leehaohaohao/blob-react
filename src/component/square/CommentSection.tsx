/**
 * @description
 * @author lihao
 * @date 2025/6/1
 */

import React, { useEffect, useState } from 'react';
import './CommentSection.css';
import {CommentItem, commentToPost, getPostComment} from '../../api/feature/social.ts';
import {useUser} from "../provider/UserProvider.tsx";
import avatar from '../../assets/default/avatar.png'

interface Props {
    postId: string | undefined;
}


const CommentBox: React.FC<{
    comment: CommentItem;
    onReplyClick: (comment: CommentItem) => void;
}> = ({ comment, onReplyClick }) => {
    const isChild = comment.parentId !== '';

    const displayUserName = isChild
        ? `${comment.userName} > ${comment.parentName}`
        : comment.userName;

    return (
        <div
            className={`comment-section-item ${isChild ? 'comment-section-child' : ''}`}
            data-id={comment.commentId}
            onClick={() => onReplyClick(comment)}
        >
            <div className="comment-section-header">
                <img src={comment.photo || avatar} alt="头像" className="comment-section-avatar" />
                <div className="comment-section-username">{displayUserName}</div>
                <div className="comment-section-date">{comment.commentDate?.slice(0, 10)}</div>
            </div>

            <div className="comment-section-text">{comment.commentContent}</div>
            {comment.childCommentDto?.map((child) => (
                <CommentBox key={child.commentId} comment={child} onReplyClick={onReplyClick} />
            ))}
        </div>
    );
};

const CommentSection: React.FC<Props> = ({ postId }) => {
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [replyTarget, setReplyTarget] = useState<CommentItem | null>(null);
    const {user} = useUser();
    useEffect(() => {
        if (!postId) return;
        const getComments = async () => {
            const data = await getPostComment(postId);
            setComments(data.data);
        };
        getComments();
    }, [postId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSend = async () => {
        if (!inputValue.trim() || !postId) return;

        const parentId = replyTarget ? replyTarget.commentId : '';
        const res = await commentToPost(postId, parentId, inputValue.trim());

        const newComment: CommentItem = {
            commentId: res.data.commentId,
            parentId: parentId,
            parentName: replyTarget?.userName || '',
            topId: res.data.topId,
            commentDate: new Date().toISOString(),
            userId: 'currentUserId',
            userName: user?.name ?? '不挂用户',
            photo: user?.photo || avatar,
            commentContent: inputValue.trim(),
            childCommentDto: [],
        };

        setComments(prev => {
            if (!replyTarget) {
                return [newComment, ...prev];
            } else {
                const topId = replyTarget.topId || replyTarget.commentId;
                return prev.map(c => {
                    if (c.commentId === topId) {
                        return {
                            ...c,
                            childCommentDto: [newComment, ...(c.childCommentDto || [])]
                        };
                    }
                    return c;
                });
            }
        });

        setInputValue('');
        setReplyTarget(null);
    };

    const handleReplyClick = (comment: CommentItem) => {
        setReplyTarget(comment);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // 防止换行或其他默认行为
            handleSend();
        }
    };

    return (
        <div className="comment-section-container">
            <div className="comment-section-wrapper">
                {comments.length === 0 ? (
                    <div className="comment-section-empty">快来抢沙发~</div>
                ) : (
                    comments.map(comment => (
                        <CommentBox
                            key={comment.commentId}
                            comment={comment}
                            onReplyClick={handleReplyClick}
                        />
                    ))
                )}
            </div>

            <div className="comment-input-bar">
                {replyTarget && (
                    <div className="comment-reply-tip">
                        回复 @{replyTarget.userName}
                        <span className="comment-cancel-reply" onClick={() => setReplyTarget(null)}>
                            取消
                        </span>
                    </div>
                )}
                <input
                    type="text"
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    placeholder="写下你的评论..."
                />
                <button onClick={handleSend}>发送</button>
            </div>
        </div>
    );
};

export default CommentSection;


