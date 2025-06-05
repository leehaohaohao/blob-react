/**
 * @description
 * @author lihao
 * @date 2025/6/5
 */
import React, { useEffect, useState } from "react";
import ArticleCard from "../square/ArticleCard.tsx";
import { PostItem } from "../../api/feature/forum.ts";
import { ApiResponse } from "../../api/axios.ts";

const COLUMN_COUNT = 4;

interface Props {
    status: "0" | "1"; // 0喜欢，1收藏
    otherId?: string | null;
    fetchFunc: (
        pageNum: string,
        pageSize: string,
        status: string,
        otherId: string|null
    ) => Promise<ApiResponse<PostItem[]>>;
}

const LikeOrCollectList: React.FC<Props> = ({ otherId = null,status, fetchFunc }) => {
    const [postList, setPostList] = useState<PostItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetchFunc("1", "30", status, otherId);
                if (isMounted) {
                    setPostList(res.data || []);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("加载列表失败", error);
                    setPostList([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [status, fetchFunc]);

    const authorInfo = postList.length > 0 ? postList[0].otherInfoDto : undefined;

    if (loading) {
        return <div style={{ textAlign: "center", padding: 40 }}>加载中...</div>;
    }

    if (postList.length === 0) {
        return <div style={{ textAlign: "center", padding: 40, color: "#888" }}>这里还没有内容哦~</div>;
    }

    const columns: PostItem[][] = Array.from({ length: COLUMN_COUNT }, () => []);
    postList.forEach((post, index) => {
        columns[index % COLUMN_COUNT].push(post);
    });

    return (
        <div className="article-columns-wrapper">
            {columns.map((colPosts, colIndex) => (
                <div
                    className="article-column"
                    key={colIndex}
                >
                    {colPosts.map((post) => (
                        <ArticleCard key={post.postId} post={post} authorInfo={authorInfo}/>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default LikeOrCollectList;
