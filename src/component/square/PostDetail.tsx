/**
 * @description
 * @author lihao
 * @date 2025/6/1 18:04
 */
import './PostDetail.css'
import CommentSection from "./CommentSection.tsx";
import {useEffect, useState} from "react";
import {getPostDetail, likeOrCollectPost, PostDetailItem} from "../../api/feature/forum.ts";
import {useNavigate, useParams} from "react-router-dom";
const PostDetail = () => {
    const [postDetailItem,setPostDetailItem]  = useState<PostDetailItem>();
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    useEffect(() => {
        const postDetail = async (postId:string) => {
            const data = await getPostDetail(postId);
            setPostDetailItem(data.data);
        }
        if(postId){
            postDetail(postId);
        }
    }, [postId]);
    // 点赞
    const handleLikeClick = async () => {
        if (!postDetailItem || !postId) return;

        const isLiked = postDetailItem.isLove;
        const newLikeCount = isLiked ? postDetailItem.postLike - 1 : postDetailItem.postLike + 1;

        // 乐观更新 UI
        setPostDetailItem({
            ...postDetailItem,
            isLove: !isLiked,
            postLike: newLikeCount
        });

        try {
            await likeOrCollectPost(postId, isLiked ? '1' : '0', '0');
        } catch (error) {
            // 接口失败回滚状态
            setPostDetailItem({
                ...postDetailItem,
                isLove: isLiked,
                postLike: postDetailItem.postLike
            });
            console.error(error);
        }
    };

// 收藏
    const handleCollectClick = async () => {
        if (!postDetailItem || !postId) return;

        const isCollected = postDetailItem.isCollect;
        const newCollectCount = isCollected ? postDetailItem.collect - 1 : postDetailItem.collect + 1;

        setPostDetailItem({
            ...postDetailItem,
            isCollect: !isCollected,
            collect: newCollectCount
        });

        try {
            await likeOrCollectPost(postId, isCollected ? '1' : '0', '1');
        } catch (error) {
            setPostDetailItem({
                ...postDetailItem,
                isCollect: isCollected,
                collect: postDetailItem.collect
            });
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="post-wrapper">
                <div className="post-detail-author">
                    <img
                        className="author-avatar"
                        src={postDetailItem?.photo}
                        alt="作者头像"
                    />
                    <div className="author-name">{ postDetailItem?.name}</div>
                    <div className="post-interact">
                        <div className="interact-item">
                            <svg
                                onClick={handleLikeClick}
                                className={`icon like-icon ${postDetailItem?.isLove ? 'liked' : ''}`}
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="4387"
                            >
                                <path
                                    d="M512 901.746939c-13.583673 0-26.122449-4.179592-37.093878-13.061225-8.881633-7.314286-225.697959-175.020408-312.424489-311.379592C133.746939 532.37551 94.040816 471.24898 94.040816 384.522449c0-144.718367 108.146939-262.269388 240.326531-262.269388 67.395918 0 131.657143 30.82449 177.632653 84.636735 45.453061-54.334694 109.191837-84.636735 177.110204-84.636735 132.702041 0 240.326531 117.55102 240.326531 262.269388 0 85.159184-37.093878 143.673469-67.395919 191.216327l-1.044898 1.567346c-86.726531 136.359184-303.542857 304.587755-312.424489 311.379592-10.44898 8.359184-22.987755 13.061224-36.571429 13.061225z"
                                    p-id="4388"
                                />
                            </svg>
                            <span className="count">{postDetailItem?.postLike}</span>
                        </div>

                        <div className="interact-item">
                            <svg
                                onClick={handleCollectClick}
                                className={`icon favorite-icon ${postDetailItem?.isCollect ? 'favorited' : ''}`} viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="5580" width="200" height="200">
                                <path
                                    d="M249.027212 1024a81.085086 81.085086 0 0 1-47.614289-15.359448 82.461037 82.461037 0 0 1-34.302767-81.917056l40.958528-251.894948a31.99885 31.99885 0 0 0-8.703687-27.647006L23.755308 466.452037a83.932984 83.932984 0 0 1-19.455301-84.988946 82.301042 82.301042 0 0 1 65.917631-55.805994L307.905096 289.306403a31.198879 31.198879 0 0 0 24.063135-17.919356l104.956229-223.351973a82.90902 82.90902 0 0 1 150.394595 0l104.540243 223.351973a31.99885 31.99885 0 0 0 24.063135 17.919356l237.463466 36.350694a83.453001 83.453001 0 0 1 46.590326 140.79494l-175.609689 180.729505a32.606828 32.606828 0 0 0-8.703687 27.647006l40.958528 251.894948a83.804988 83.804988 0 0 1-34.302767 81.917056 81.853058 81.853058 0 0 1-88.060836 4.607834l-206.712571-114.683878a32.670826 32.670826 0 0 0-30.718896 0l-207.352548 115.19586a87.964839 87.964839 0 0 1-40.446547 10.239632z"
                                    p-id="5581">
                                </path>
                            </svg>
                            <span className="count">{postDetailItem?.collect}</span>
                        </div>
                    </div>
                </div>
                <div className="post-detail-container">
                    <div className="post-detail-header">
                        <span className="post-title-text">{postDetailItem?.title}</span>
                        <span className="post-detail-time">
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

                    <div className="post-detail-tagContainer">
                        {
                            postDetailItem?.tag.split('|').map((tag, index) => (
                                <div key={index} className="post-detail-tag" onClick={() => {navigate(`/article/${tag}`);}}>
                                    {tag}
                                </div>
                            ))
                        }
                    </div>
                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{__html: postDetailItem?.postContent || '<h1>正在加载中！</h1>'}}
                    />
                </div>
                <div className="post-comment-container">
                    <CommentSection postId={postDetailItem?.postId}/>
                </div>
            </div>
        </div>
    );
};
export default PostDetail;
