/**
 * @description 旧版聊天室嵌入展示页面（iframe模式）
 * @author lihao
 * @date 2025/6/6
 */

const NewTalk = () => {
    return (
        <div style={{ width: "100%", height: "100%", padding: "0", margin: "0", overflow: "hidden" }}>
            <iframe
                src="/chat.html"
                title="旧版聊天室"
                style={{
                    width: "100%",
                    height: "700px", // 或改为 100vh
                    border: "none",
                    overflow: "hidden" // 关键：禁用 iframe 自身滚动
                }}
                scrolling="no" // 兼容性属性，部分浏览器支持
            />
        </div>
    );
};

export default NewTalk;
