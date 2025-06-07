/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
/*
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
export default MaPost;*/
import { useEffect, useState } from "react";
import "./MaPost.css";

interface Article {
    postId: string;
    title: string;
    tag: string;
    postTime: string;
    otherInfoDto: {
        userInfoDto: {
            name: string;
        };
    };
}

const MaPost = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const pageSize = 8;
    const [isLoading, setIsLoading] = useState(false);
    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);

    useEffect(() => {
        getArticles(pageNum);
    }, [pageNum]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const getArticles = (page: number) => {
        setIsLoading(true);
        // TODO: 替换成你自己的接口调用逻辑
        // 模拟 fetch 调用
        /*
        fetch(articleInfo, {
          method: 'POST',
          headers: { 'Authorization': authorization },
          body: formData
        })
        */
        // 这里模拟接口返回，调用后用 setArticles 更新
        // 失败时调用 handleAlert

        // 示例假数据（你替换成接口结果）
        // 这里只是示例，后续自己改
        setTimeout(() => {
            const fakeData: Article[] = [
                {
                    postId: "1",
                    title: "示例文章标题1",
                    tag: "标签1|标签2",
                    postTime: new Date().toISOString(),
                    otherInfoDto: { userInfoDto: { name: "用户A" } },
                },
                {
                    postId: "2",
                    title: "示例文章标题2",
                    tag: "标签3",
                    postTime: new Date().toISOString(),
                    otherInfoDto: { userInfoDto: { name: "用户B" } },
                },
            ];
            setArticles(fakeData);
            setDisablePrev(page === 1);
            setDisableNext(fakeData.length < pageSize);
            setIsLoading(false);
        }, 500);
    };

    const approveArticle = (postId: string, status: number) => {
        // TODO: 调用审核接口 approve 逻辑
        // 调用成功后刷新当前页
        // 调用失败调用 handleAlert
        alert(`调用approveArticle接口: postId=${postId} status=${status}`);
    };

    return (
        <div className="ma-post-wrapper">
            <div className="ma-post-table-container">
                <table className="ma-post-table">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>用户名</th>
                        <th>文章标题</th>
                        <th>文章标签</th>
                        <th>发布时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!isLoading && articles.length === 0 && (
                        <tr>
                            <td colSpan={6}>暂无数据</td>
                        </tr>
                    )}
                    {articles.map((article, index) => (
                        <tr key={article.postId}>
                            <td>{(pageNum - 1) * pageSize + index + 1}</td>
                            <td>{article.otherInfoDto.userInfoDto.name}</td>
                            <td>
                                <a href={`detail.html?postId=${article.postId}`}>
                                    {article.title}
                                </a>
                            </td>
                            <td>
                                {article.tag.includes("|")
                                    ? article.tag.split("|").join(", ")
                                    : article.tag}
                            </td>
                            <td>{formatDate(article.postTime)}</td>
                            <td>
                                <button
                                    onClick={() => approveArticle(article.postId, 0)}
                                    className="ma-post-button"
                                >
                                    批准
                                </button>
                                <button
                                    onClick={() => approveArticle(article.postId, 3)}
                                    className="ma-post-button"
                                >
                                    拒绝
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="ma-post-pagination">
                <button
                    onClick={() => setPageNum(1)}
                    disabled={disablePrev}
                    className="ma-post-page-button"
                >
                    回到第一页
                </button>
                <button
                    onClick={() => setPageNum((p) => Math.max(1, p - 1))}
                    disabled={disablePrev}
                    className="ma-post-page-button"
                >
                    上一页
                </button>
                <button
                    onClick={() => setPageNum((p) => p + 1)}
                    disabled={disableNext}
                    className="ma-post-page-button"
                >
                    下一页
                </button>
            </div>
        </div>
    );
};

export default MaPost;

