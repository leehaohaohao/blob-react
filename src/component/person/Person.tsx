/**
 * @description 个人主页页面组件，支持访问自己或他人主页
 * @author lihao
 * @date 2025/6/4
 */

import './Person.css';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useUser } from '../provider/UserProvider.tsx';
import avatar from '../../assets/default/avatar.png';

type Tab = 'likes' | 'collections' | 'articles' | 'concerns';

interface ViewProfile {
    userId: string;
    name: string;
    photo: string;
    followers: number;
    concern: number;
    post: number;
    love:  number;
    collect: number;
    relationStatus?: number;
}

const Person: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState<Tab>('articles');
    const [profile, setProfile] = useState<ViewProfile | null>(null);
    const isSelf = !userId || userId === user?.userId;

    useEffect(() => {
        const tabParam = searchParams.get('tab') as Tab | null;
        if (tabParam && ['likes', 'collections', 'articles', 'concerns'].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [searchParams]);

    useEffect(() => {
        if (isSelf) {
            if (user) {
                const viewProfile: ViewProfile = {
                    userId: user.userId,
                    name: user.name,
                    photo: user.photo,
                    followers: user.followers,
                    concern: user.concern,
                    post: user.post,
                    love:user.love,
                    collect:user.collect
                };
                setProfile(viewProfile);
            }
        } else {
            // 🧩 替换为你自己的接口请求
            fetch(`/api/user/${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    const dto = data.userInfoDto;
                    const viewProfile: ViewProfile = {
                        userId: dto.userId,
                        name: dto.name,
                        photo: dto.photo,
                        followers: dto.followers,
                        concern: dto.concern,
                        post: dto.post,
                        love:dto.love,
                        collect:dto.collect,
                        relationStatus: data.status,
                    };
                    setProfile(viewProfile);
                })
                .catch(() => setProfile(null));
        }
    }, [userId, user]);

    const handleTabClick = (tab: Tab) => {
        setActiveTab(tab);
        navigate(`/home/person${userId ? '/' + userId : ''}?tab=${tab}`, { replace: true });
    };

    if (!profile) return <div className="person-page">加载中...</div>;

    return (
        <div className="person-page">
            <section className="person-user-card">
                <img
                    className="person-avatar"
                    src={profile.photo || avatar}
                    alt="用户头像"
                />
                <div className="person-user-info">
                    <h2>用户名: {profile.name}</h2>
                    <p>UID: {profile.userId}</p>
                </div>
                {isSelf ? (
                    <button className="person-edit-btn">编辑资料</button>
                ) : (
                    <div className="person-relation-status">
                        {profile.relationStatus === 2
                            ? '互相关注'
                            : profile.relationStatus === 1
                                ? '已关注'
                                : '未关注'}
                    </div>
                )}
            </section>

            <section className="person-user-stats">
                <div className="person-stat">关注 <span>{profile.concern}</span></div>
                <div className="person-stat">粉丝 <span>{profile.followers}</span></div>
                <div className="person-stat">文章 <span>{profile.post}</span></div>
                <div className="person-stat">喜欢 <span>{profile.post}</span></div>
                <div className="person-stat">收藏 <span>{profile.post}</span></div>
            </section>

            <nav className="person-tabs">
                <button
                    className={`person-tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
                    onClick={() => handleTabClick('articles')}
                >
                    我的文章
                </button>
                <button
                    className={`person-tab-btn ${activeTab === 'likes' ? 'active' : ''}`}
                    onClick={() => handleTabClick('likes')}
                >
                    我的喜欢
                </button>
                <button
                    className={`person-tab-btn ${activeTab === 'collections' ? 'active' : ''}`}
                    onClick={() => handleTabClick('collections')}
                >
                    我的收藏
                </button>
                <button
                    className={`person-tab-btn ${activeTab === 'concerns' ? 'active' : ''}`}
                    onClick={() => handleTabClick('concerns')}
                >
                    我的关注
                </button>
            </nav>

            <div className="person-tab-content">
                {activeTab === 'articles' && <div>这里是文章内容</div>}
                {activeTab === 'likes' && <div>这里是喜欢内容</div>}
                {activeTab === 'collections' && <div>这里是收藏内容</div>}
                {activeTab === 'concerns' && <div>这里是关注内容</div>}
            </div>
        </div>
    );
};

export default Person;
