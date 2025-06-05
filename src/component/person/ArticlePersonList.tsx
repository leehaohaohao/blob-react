/**
 * @description 个人主页文章列表组件
 * @author lihao
 * @date 2025/6/5
 */
import React, { useEffect, useState } from "react";
import ArticleCard from "../square/ArticleCard.tsx";
import { PostItem } from "../../api/feature/forum.ts";
import { ApiResponse } from "../../api/axios.ts";

const COLUMN_COUNT = 4;

interface Props {
    otherId?: string | null;
    fetchFunc: (
        pageNum: string,
        pageSize: string,
        otherId: string | null
    ) => Promise<ApiResponse<PostItem[]>>;
}

const ArticlePersonList: React.FC<Props> = ({ otherId = null, fetchFunc }) => {
    const [postList, setPostList] = useState<PostItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                // 传递 otherId，保证不是 undefined
                const res = await fetchFunc("1", "30", otherId);
                if (isMounted) {
                    setPostList(res.data || []);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("加载文章失败", error);
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
    }, [otherId, fetchFunc]);

    const authorInfo = postList.length > 0 ? postList[0].otherInfoDto : undefined;

    if (loading) {
        return <div style={{ textAlign: "center", padding: 40 }}>加载中...</div>;
    }

    if (postList.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
                这里还没有文章，快去写第一篇吧！
            </div>
        );
    }

    const columns: PostItem[][] = Array.from({ length: COLUMN_COUNT }, () => []);
    postList.forEach((post, index) => {
        columns[index % COLUMN_COUNT].push(post);
    });

    return (
        <div
            className="article-columns-wrapper"
        >
            {columns.map((colPosts, colIndex) => (
                <div
                    className="article-column"
                    key={colIndex}
                >
                    {colPosts.map((post) => (
                        <ArticleCard
                            key={post.postId}
                            post={post}
                            authorInfo={authorInfo}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ArticlePersonList;
