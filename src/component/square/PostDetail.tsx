/**
 * @description
 * @author lihao
 * @date 2025/6/1 18:04
 */
import './PostDetail.css'
import CommentSection from "./CommentSection.tsx";
const PostDetail = () => {
    const htmlContent = `
      <h1>标题</h1>
      <p>段落1</p>
      <p>段落2</p>
      <p>段落3</p>
    `;
    // 模拟后端返回的点赞收藏状态和数量
    const liked = true;
    const favorited = true;
    const likeCount = 123;
    const favoriteCount = 45;

    return (
        <div className="container">
            <div className="post-wrapper">
                <div className="post-detail-author">
                    <img
                        className="author-avatar"
                        src="https://i.pravatar.cc/80"
                        alt="作者头像"
                    />
                    <div className="author-name">李浩</div>
                    {/* 点赞收藏区域 */}
                    <div className="post-interact">
                        <div className="interact-item">
                            <svg
                                className={`icon like-icon ${liked ? 'liked' : ''}`}
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="4387"
                            >
                                <path
                                    d="M512 901.746939c-13.583673 0-26.122449-4.179592-37.093878-13.061225-8.881633-7.314286-225.697959-175.020408-312.424489-311.379592C133.746939 532.37551 94.040816 471.24898 94.040816 384.522449c0-144.718367 108.146939-262.269388 240.326531-262.269388 67.395918 0 131.657143 30.82449 177.632653 84.636735 45.453061-54.334694 109.191837-84.636735 177.110204-84.636735 132.702041 0 240.326531 117.55102 240.326531 262.269388 0 85.159184-37.093878 143.673469-67.395919 191.216327l-1.044898 1.567346c-86.726531 136.359184-303.542857 304.587755-312.424489 311.379592-10.44898 8.359184-22.987755 13.061224-36.571429 13.061225z"
                                    p-id="4388"
                                />
                            </svg>
                            <span className="count">{likeCount}</span>
                        </div>

                        <div className="interact-item">
                            <svg className={`icon favorite-icon ${favorited ? 'favorited' : ''}`} viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="5580" width="200" height="200">
                                <path
                                    d="M249.027212 1024a81.085086 81.085086 0 0 1-47.614289-15.359448 82.461037 82.461037 0 0 1-34.302767-81.917056l40.958528-251.894948a31.99885 31.99885 0 0 0-8.703687-27.647006L23.755308 466.452037a83.932984 83.932984 0 0 1-19.455301-84.988946 82.301042 82.301042 0 0 1 65.917631-55.805994L307.905096 289.306403a31.198879 31.198879 0 0 0 24.063135-17.919356l104.956229-223.351973a82.90902 82.90902 0 0 1 150.394595 0l104.540243 223.351973a31.99885 31.99885 0 0 0 24.063135 17.919356l237.463466 36.350694a83.453001 83.453001 0 0 1 46.590326 140.79494l-175.609689 180.729505a32.606828 32.606828 0 0 0-8.703687 27.647006l40.958528 251.894948a83.804988 83.804988 0 0 1-34.302767 81.917056 81.853058 81.853058 0 0 1-88.060836 4.607834l-206.712571-114.683878a32.670826 32.670826 0 0 0-30.718896 0l-207.352548 115.19586a87.964839 87.964839 0 0 1-40.446547 10.239632z"
                                    p-id="5581">
                                </path>
                            </svg>
                            <span className="count">{favoriteCount}</span>
                        </div>
                    </div>
                </div>
                <div className="post-detail-container">
                    <div className="post-detail-header">
                        <span className="post-title-text">标题</span>
                        <span className="post-detail-time">发布于 2025-06-01 18:04:23</span>
                    </div>

                    <div className="post-detail-tagContainer">
                        <div className="post-detail-tag">标签1</div>
                    </div>
                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{__html: htmlContent}}
                    />
                </div>

                <div className="post-comment-container">
                    <CommentSection/>
                </div>
            </div>
        </div>
    );
};


export default PostDetail;
