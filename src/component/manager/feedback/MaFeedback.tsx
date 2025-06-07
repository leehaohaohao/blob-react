/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import { useEffect, useState } from "react";
import "./MaFeedback.css";
import {ErrorItem, getErrorItemList, updateFeedbackStatus} from "../../../api/feature/feedback.ts";
import {useToast} from "../../provider/ToastContext.tsx";
const pageSize = 4;

const MaFeedback = () => {
    const [feedbackList, setFeedbackList] = useState<ErrorItem[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);
    const {showToast} = useToast();
    const fetchFeedback = async (page: number) => {
        setLoading(true);
        try {
            const data = await getErrorItemList(pageNum.toString(), pageSize.toString());
            setFeedbackList(data.data);
            setDisablePrev(page === 1);
            setDisableNext(data.data.length < pageSize);
        } catch (error) {
            console.error(error);
            showToast("请求失败，请重试",'error');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchFeedback(pageNum);
    }, [pageNum]);

    // 集成更新接口
    const markAsCompleted = async (feedbackId: number | string) => {
        if (!window.confirm("确定将此反馈标记为完成吗？")) {
            return;
        }
        try {
            const res = await updateFeedbackStatus({ feedbackId, status: "1" }); // 这里 status 可根据后台要求替换
            if (res.success) {
                showToast("更新成功", "success");
                fetchFeedback(pageNum);
            } else {
                showToast(res.message || "更新失败", "error");
            }
        } catch (error) {
            console.error(error);
            showToast("更新失败，请重试", "error");
        }
    };

    const goToFirstPage = () => {
        setPageNum(1);
    };

    const prevPage = () => {
        if (pageNum > 1) setPageNum(pageNum - 1);
    };

    const nextPage = () => {
        setPageNum(pageNum + 1);
    };

    return (
        <div className="ma-feedback-wrapper" style={{ height: "100%", width: "100%" }}>
            <div className="ma-group-table-container">
                <table className="ma-group-table">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>问题类型</th>
                        <th>内容</th>
                        <th>时间</th>
                        <th>图片</th>
                        <th>用户</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={7}>加载中...</td>
                        </tr>
                    ) : feedbackList.length === 0 ? (
                        <tr>
                            <td colSpan={7}>暂无数据</td>
                        </tr>
                    ) : (
                        feedbackList.map((item, index) => (
                            <tr key={item.feedbackId}>
                                <td>{(pageNum - 1) * pageSize + index + 1}</td>
                                <td>{item.type}</td>
                                <td>{item.content}</td>
                                <td>{item.time}</td>
                                <td>
                                    {item.file ? (
                                        <img
                                            src={item.file}
                                            alt="反馈图片"
                                            style={{ maxWidth: 100, maxHeight: 100, borderRadius: 6 }}
                                        />
                                    ) : (
                                        "无"
                                    )}
                                </td>
                                <td>{item.name}</td>
                                <td>
                                    <button onClick={() => markAsCompleted(item.feedbackId)}>完成</button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
            <div className="ma-feedback-pagination">
                <button className="ma-feedback-page-button" onClick={goToFirstPage} disabled={pageNum === 1}>
                    回到第一页
                </button>
                <button
                    className="ma-feedback-page-button"
                    onClick={prevPage}
                    disabled={disablePrev}
                >
                    上一页
                </button>
                <button
                    className="ma-feedback-page-button"
                    onClick={nextPage}
                    disabled={disableNext}
                >
                    下一页
                </button>
            </div>
        </div>
    );
};

export default MaFeedback;
