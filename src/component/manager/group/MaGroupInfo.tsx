/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
const MaGroupInfo = () => {
    return (
        <div className="ma-group-info-container" style={{ height: '100%', width: '100%' }}>
            <iframe
                src="/group.html"
                title="群组管理"
                style={{
                    border: 'none',
                    width: '100%',
                    height: '100vh',
                }}
                scrolling="no"
            />
        </div>
    )
};
export default MaGroupInfo;