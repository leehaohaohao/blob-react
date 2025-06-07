/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import './MaFeedback.css'
const MaFeedback = () => {
    return (
        <div className="ma-web-info-container" style={{ height: '100%', width: '100%' }}>
            <iframe
                src="/fb.html"
                title="反馈信息管理"
                style={{
                    border: 'none',
                    width: '100%',
                    height: '100vh',
                }}
                scrolling="no"
            />
        </div>
    )
}
export default MaFeedback;