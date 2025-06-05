/**
 * @description
 * @author lihao
 * @date 2025/6/5
 */
import React from "react";
import { UserInfoDto } from "../../api/feature/user.ts";
import "./UserCard.css";
import {useNavigate} from "react-router-dom";

interface Props {
    user: UserInfoDto;
    status: number; // 是否已关注
}

const UserCard: React.FC<Props> = ({ user, status }) => {
    const navigate = useNavigate();
    return (
        <div className="user-card">
            <img className="user-avatar" src={user.photo} alt="头像" onClick={() => {navigate(`/home/person/${user.userId}`)}} />
            <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-stats">
                    <span>粉丝 {user.followers}</span>
                    <span>关注 {user.concern}</span>
                    <span>文章 {user.post}</span>
                </div>
            </div>
            <div className="follow-status">
                {status === 1 ? <span className="followed">已关注</span> : <span className="not-followed">未关注</span>}
            </div>
        </div>
    );
};

export default UserCard;
