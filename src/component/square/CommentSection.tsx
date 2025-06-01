/**
 * @description
 * @author lihao
 * @date 2025/6/1
 */
import { useState } from 'react';
import './CommentSection.css';

interface Comment {
    commentId: string;
    userName: string;
    photo: string;
    commentContent: string;
    childCommentDto?: Comment[];
}

const mockComments: Comment[] = [
    {
        commentId: 'c1',
        userName: '张三',
        photo: 'https://i.pravatar.cc/40?u=1',
        commentContent: '这是第一条评论',
        childCommentDto: [
            {
                commentId: 'c1-1',
                userName: '李四',
                photo: 'https://i.pravatar.cc/40?u=2',
                commentContent: '这是回复评论',
            },
        ],
    },
    {
        commentId: 'c2',
        userName: '王五',
        photo: 'https://i.pravatar.cc/40?u=3',
        commentContent: '这是第二条评论',
    },
];

const CommentSection = () => {
    const [comments, setComments] = useState<Comment[]>(mockComments);
    const [replyTarget, setReplyTarget] = useState<{ id: string | null; name: string | null }>({ id: null, name: null });
    const [inputValue, setInputValue] = useState('');

    // 模拟发送评论函数（只更新本地状态）
    const sendComment = () => {
        if (!inputValue.trim()) return;

        const newComment: Comment = {
            commentId: `c${Math.random().toString(36).substr(2, 6)}`,
            userName: '当前用户',
            photo: 'https://i.pravatar.cc/40?u=100',
            commentContent: inputValue.trim(),
        };

        if (!replyTarget.id) {
            // 新评论插入最前面
            setComments([newComment, ...comments]);
        } else {
            // 回复评论，递归插入到对应评论下
            const addReply = (list: Comment[]): Comment[] => {
                return list.map((c) => {
                    if (c.commentId === replyTarget.id) {
                        const child = c.childCommentDto ? [...c.childCommentDto, newComment] : [newComment];
                        return { ...c, childCommentDto: child };
                    }
                    if (c.childCommentDto) {
                        return { ...c, childCommentDto: addReply(c.childCommentDto) };
                    }
                    return c;
                });
            };
            setComments(addReply(comments));
        }

        setInputValue('');
        setReplyTarget({ id: null, name: null });
    };

    const renderComments = (comments: Comment[], isParent = true) => {
        return comments.map((comment) => (
            <div
                key={comment.commentId}
                className={isParent ? 'cmt-remark cmt-pare' : 'cmt-remark cmt-rinnerCmmt'}
            >
                <div className="cmt-rinnerCmmt_Head">
                    <img src={comment.photo} className="cmt-remkPersonPic" alt={`${comment.userName}头像`} />
                    <span>{comment.userName}{!isParent && replyTarget.name ? `▶${replyTarget.name}` : ''}</span>
                </div>
                <div
                    className="cmt-remark-content"
                    onClick={() => setReplyTarget({ id: comment.commentId, name: comment.userName })}
                >
                    <p className="cmt-remark_P">{comment.commentContent}</p>
                    <p className="cmt-reply-text">回复</p>
                </div>
                {comment.childCommentDto && comment.childCommentDto.length > 0 && (
                    <div className="cmt-children">{renderComments(comment.childCommentDto, false)}</div>
                )}
            </div>
        ));
    };

    return (
        <div className="cmt-container">
            <div className="cmt-comment-container" id="remkCont">
                {renderComments(comments)}
            </div>
            <form
                className="cmt-form"
                id="form_"
                onSubmit={(e) => {
                    e.preventDefault();
                    sendComment();
                }}
            >
                <input
                    id="input_"
                    type="text"
                    placeholder={replyTarget.name ? `回复：${replyTarget.name}` : '评论该帖子'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => {}}
                    onBlur={() => {}}
                />
                <button type="submit" className="cmt-submit-btn">发送</button>
            </form>
        </div>
    );
};

export default CommentSection;
