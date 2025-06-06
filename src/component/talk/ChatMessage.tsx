/**
 * @description
 * @author lihao
 * @date 2025/6/6
 */
import React from 'react';
import './ChatMessage.css';
import {GroupCommentItem} from "../../api/feature/group.ts"; // 请根据需要创建并引入相应的 CSS 文件


interface ChatMessageProps {
    comment: GroupCommentItem;
    currentUserId: string;
    groupOwnerId: string;
    onKickUser: (userId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ comment, currentUserId, groupOwnerId, onKickUser }) => {
    const isOwnMessage = comment.userId === currentUserId;
    const isGroupOwner = currentUserId === groupOwnerId;
    const isOtherUser = comment.userId !== currentUserId;

    return (
        <div className={`chat-message ${isOwnMessage ? 'own' : 'other'}`}>
            <img className="chat-avatar" src={comment.avatar} alt={`${comment.name}的头像`} />
            <div className="chat-content">
                <div className="chat-header">
                    <span className="chat-name">{comment.name}</span>
                    {isGroupOwner && isOtherUser && (
                        <button className="kick-button" onClick={() => onKickUser(comment.userId)}>
                            踢出
                        </button>
                    )}
                </div>
                <div className="chat-text">{comment.content}</div>
            </div>
        </div>
    );
};

export default ChatMessage;
