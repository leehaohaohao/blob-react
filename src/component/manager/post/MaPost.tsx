/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import { useEffect, useState } from "react";
import "./MaPost.css";
import {approvalPost, getApprovalList, PostItem} from "../../../api/feature/forum.ts";
import {useToast} from "../../provider/ToastContext.tsx";

const MaPost = () => {
    const [articles, setArticles] = useState<PostItem[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const pageSize = 10;
    const [isLoading, setIsLoading] = useState(false);
    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);
    const {showToast}=useToast();
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
    const getArticles = async (page: number) => {
        setIsLoading(true);
        const data = await getApprovalList(pageNum.toString(), pageSize.toString());
        if(!data.success){
            showToast(typeof data.message === "string" ? data.message :"获取失败",'error');
            return;
        }
        setArticles(data.data);
        setDisablePrev(page === 1);
        setDisableNext(data.data.length < pageSize);
        setIsLoading(false);
    };

    const approveArticle = async (postId: string, status: number) => {
        const data = await approvalPost(postId, status.toString());
        if(data.success){
            showToast(data.data,"info");
            getArticles(pageNum);
        }
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
                                <a href={`/manager/approval/${article.postId}`}>
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