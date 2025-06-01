/**
 * @description
 * @author lihao
 * @date 2025/5/26 14:00
 */
import './ArticleCard.css';
import { PostItem } from "../../api/forum/forum.ts";

interface ArticleCardProps {
    post: PostItem;
    onFollowClick: (userId: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post, onFollowClick }) => {
    const author = post.otherInfoDto.userInfoDto;

    const renderStatus = () => {
        switch (post.otherInfoDto.status) {
            case 0:
                return <div className="article-card-follow-btn" onClick={() => onFollowClick(author.userId)}>+</div>;
            case 1:
                return <div className="article-card-follow-status">你的关注</div>;
            case 2:
                return <div className="article-card-follow-status">+（失败）</div>;
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
            <a href={`/article/content?postId=${post.postId}`}>
                <img src={post.cover} alt="封面" className="article-card-cover" />
                <div className="article-card-title">{post.title}</div>
            </a>
            <div className="article-card-tags">
                {post.tag.split('|').map(tag => (
                    <a key={tag} href={`/article?tag=${tag}`} className="article-card-tag">{tag}</a>
                ))}
            </div>
            <div className="article-card-user-info">
                <a className="article-card-user-link" href={`/center?userId=${author.userId}`}>
                    <img src={author.photo} alt="用户头像" className="article-card-avatar" />
                    <span>{author.name}</span>
                </a>
                {renderStatus()}
            </div>
        </div>
    );
};

export default ArticleCard;
