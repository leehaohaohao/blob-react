/**
 * @description
 * @author lihao
 * @date 2025/5/26 14:00
 */
import './ArticleCard.css';
import React, { useState } from 'react';
import { PostItem } from '../../api/feature/forum.ts';
import { concernOther } from '../../api/feature/social.ts'; // 使用你提供的关注接口

interface AuthorInfo {
    userInfoDto: {
        userId: string;
        name: string;
        photo: string;
    };
    status: number;
}

interface ArticleCardProps {
    post: PostItem;
    authorInfo?: AuthorInfo;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post, authorInfo }) => {
    const author = authorInfo?.userInfoDto ?? post.otherInfoDto?.userInfoDto;
    const initialStatus = authorInfo?.status ?? post.otherInfoDto?.status ?? 0;

    const [followStatus, setFollowStatus] = useState(initialStatus);
    const [loading, setLoading] = useState(false);

    if (!author) {
        return (
            <div className="article-card">
                <a href={`/article/content/${post.postId}`}>
                    <img src={post.cover} alt="封面" className="article-card-cover" />
                    <div className="article-card-title">{post.title}</div>
                </a>
                <div className="article-card-tags">
                    {post.tag.split('|').map(tag => (
                        <a key={tag} href={`/article/tag=${tag}`} className="article-card-tag">{tag}</a>
                    ))}
                </div>
                <div className="article-card-user-info">
                    <span>作者信息缺失</span>
                </div>
            </div>
        );
    }

    const handleFollow = async () => {
        if (loading || followStatus !== 0) return;
        setLoading(true);
        try {
            const res = await concernOther(author.userId);
            if (res.success) {
                setFollowStatus(1);
            } else {
                setFollowStatus(2);
            }
        } catch (error) {
            console.error('关注失败', error);
            setFollowStatus(2);
        } finally {
            setLoading(false);
        }
    };

    const renderStatus = () => {
        switch (followStatus) {
            case 0:
                return <div className="article-card-follow-btn" onClick={handleFollow}>+关注</div>;
            case 1:
                return <div className="article-card-follow-status">你的关注</div>;
            case 2:
                return <div className="article-card-follow-status error">关注失败</div>;
            case 3:
                return <div className="article-card-follow-status">互关好友</div>;
            case 4:
                return <div className="article-card-follow-status self">我</div>;
            default:
                return null;
        }
    };

    return (
        <div className="article-card">
            <a href={`/article/content/${post.postId}`}>
                <img src={post.cover} alt="封面" className="article-card-cover" />
                <div className="article-card-title">{post.title}</div>
            </a>
            <div className="article-card-tags">
                {post.tag.split('|').map(tag => (
                    <a key={tag} href={`/article/tag=${tag}`} className="article-card-tag">{tag}</a>
                ))}
            </div>
            <div className="article-card-user-info">
                <a className="article-card-user-link" href={`/home/person/${author.userId}`}>
                    <img src={author.photo} alt="用户头像" className="article-card-avatar" />
                    <span>{author.name}</span>
                </a>
                {renderStatus()}
            </div>
        </div>
    );
};

export default ArticleCard;
