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
import { getOtherInfo } from '../../api/feature/user.ts';
import { concernOther } from '../../api/feature/social.ts';
import { getUserPostList, getUserLikeOrCollectPostList } from '../../api/feature/forum.ts';
import ArticlePersonList from "./ArticlePersonList.tsx";
import LikeOrCollectList from "./LikeOrCollectList.tsx";
import ConcernList from "./ConcernList.tsx";

type Tab = 'likes' | 'collections' | 'articles' | 'concerns' | 'fans';
type RelationStatus = 0 | 1 | 2 | 3 | 4;

interface ViewProfile {
    userId: string;
    name: string;
    photo: string;
    followers: number;
    concern: number;
    post: number;
    love: number;
    collect: number;
    relationStatus: RelationStatus;
}

const validTabs: Tab[] = ['articles', 'likes', 'collections', 'concerns','fans'];

const Person: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useUser();

    const [activeTab, setActiveTab] = useState<Tab>('articles');
    const [profile, setProfile] = useState<ViewProfile | null>(null);
    const isSelf = !userId || userId === user?.userId;

    const isValidRelationStatus = (val: number): val is RelationStatus =>
        [0, 1, 2, 3, 4].includes(val);

    useEffect(() => {
        const tabParam = searchParams.get('tab') as Tab | null;
        if (tabParam && validTabs.includes(tabParam)) {
            setActiveTab(tabParam);
        } else {
            setActiveTab('articles');
            navigate(`/home/person${userId ? '/' + userId : ''}?tab=articles`, { replace: true });
        }
    }, [searchParams, userId, navigate]);

    useEffect(() => {
        if (isSelf && user) {
            setProfile({
                userId: user.userId,
                name: user.name,
                photo: user.photo,
                followers: user.followers,
                concern: user.concern,
                post: user.post,
                love: user.love,
                collect: user.collect,
                relationStatus: 4,
            });
        } else if (userId) {
            loadOtherUserProfile(userId);
        }
    }, [userId, user]);

    const handleTabClick = (tab: Tab) => {
        setActiveTab(tab);
        navigate(`/home/person${userId ? '/' + userId : ''}?tab=${tab}`, { replace: true });
    };

    const loadOtherUserProfile = async (id: string) => {
        try {
            const data = await getOtherInfo(id);
            const dto = data.data?.userInfoDto;
            setProfile({
                userId: dto.userId,
                name: dto.name,
                photo: dto.photo,
                followers: dto.followers,
                concern: dto.concern,
                post: dto.post,
                love: dto.love,
                collect: dto.collect,
                relationStatus: isValidRelationStatus(data.data?.status) ? data.data.status : 0,
            });
        } catch (error) {
            console.error('获取用户信息失败', error);
        }
    };

    const handleFollow = async () => {
        if (!profile || !userId) return;
        try {
            await concernOther(userId);
            await loadOtherUserProfile(userId);
        } catch (e) {
            console.error('关注失败', e);
        }
    };

    const renderRelationButton = () => {
        if (isSelf || profile?.relationStatus === 4) return null;

        switch (profile?.relationStatus) {
            case 3:
                return <div className="person-relation-status">朋友</div>;
            case 1:
                return <div className="person-relation-status">已关注</div>;
            default:
                return (
                    <button className="person-follow-btn" onClick={handleFollow}>
                        关注
                    </button>
                );
        }
    };

    if (!profile) return <div className="person-page">加载中...</div>;

    return (
        <div className="person-page">
            <section className="person-user-card">
                <img className="person-avatar" src={profile.photo || avatar} alt="用户头像" />
                <div className="person-user-info">
                    <h2>用户名: {profile.name}</h2>
                    <p>UID: {profile.userId}</p>
                </div>
                {renderRelationButton()}
            </section>

            <section className="person-user-stats">
                <div className="person-stat">关注 <span>{profile.concern}</span></div>
                <div className="person-stat">粉丝 <span>{profile.followers}</span></div>
                <div className="person-stat">文章 <span>{profile.post}</span></div>
                <div className="person-stat">喜欢 <span>{profile.love}</span></div>
                <div className="person-stat">收藏 <span>{profile.collect}</span></div>
            </section>

            <nav className="person-tabs">
                {validTabs.map((tab) => (
                    <button
                        key={tab}
                        className={`person-tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab === 'articles'
                            ? '文章'
                            : tab === 'likes'
                                ? '喜欢'
                                : tab === 'collections'
                                    ? '收藏'
                                    : tab === 'concerns'
                                        ? '关注'
                                        : tab === 'fans'
                                            ? '粉丝'
                                    : '关注'}
                    </button>
                ))}
            </nav>


            <div className="person-tab-content">
                {activeTab === "articles" && (
                    <ArticlePersonList otherId={isSelf ? null : userId ?? null} fetchFunc={getUserPostList} />
                )}
                {activeTab === "likes" && (
                    <LikeOrCollectList otherId={isSelf ? null : userId ?? null} status="0" fetchFunc={getUserLikeOrCollectPostList} />
                )}
                {activeTab === "collections" && (
                    <LikeOrCollectList otherId={isSelf ? null : userId ?? null} status="1" fetchFunc={getUserLikeOrCollectPostList} />
                )}
                {activeTab === "concerns" && <ConcernList status="0" otherId={isSelf ? null : userId ?? null} />}
                {activeTab === "fans" && <ConcernList status="1" otherId={isSelf ? null : userId ?? null} />}
            </div>;

        </div>
    );
};

export default Person;
