/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import './MaPost.css'
const MaPost = () => {
    return (
        <div>
            <div className="ma-post-info-container" style={{ height: '100%', width: '100%' }}>
                <iframe
                    src="/approval.html"
                    title="文章审核页面"
                    style={{
                        border: 'none',
                        width: '100%',
                        height: '90vh',
                    }}
                    scrolling="no"
                />
            </div>
        </div>
    )
};
export default MaPost;