/**
 * @description
 * @author lihao
 * @date 2025/5/26 13:48
 */
import { useEffect, useState } from "react";
import { getTagPostList, PostItem } from "../../api/feature/forum.ts";
import ArticleCard from "./ArticleCard.tsx";
import './ArticleList.css'
import {useToast} from "../provider/ToastContext.tsx";

interface ArticleListProps {
    currentTag: string|null;
}

const COLUMN_COUNT = 5;

const ArticleList: React.FC<ArticleListProps> = ({ currentTag }) => {
    const [postList, setPostList] = useState<PostItem[]>([]);
    const {showToast} = useToast();
    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();

        const fetchTagPost = async () => {
            try {
                const res = await getTagPostList(
                    typeof currentTag === "string" ? currentTag : 'random_post',
                    '1',
                    '25',
                    { signal: abortController.signal }
                );
                if (isMounted) {
                    if(res.success){
                        setPostList(res.data.list);
                        if(res.data.list.length === 0){
                            showToast("没有找到相关文章",  "info");
                        }
                    }

                }
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.error("Fetch error:", error);
                }
            }
        };

        fetchTagPost();

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [currentTag]);

    // 分配到5列
    const columns: PostItem[][] = Array.from({ length: COLUMN_COUNT }, () => []);
    postList.forEach((post, index) => {
        columns[index % COLUMN_COUNT].push(post);
    });

    return (
        <div className="article-columns-wrapper">
            {columns.map((colPosts, colIndex) => (
                <div className="article-column" key={colIndex}>
                    {colPosts.map(post => (
                        <ArticleCard key={post.postId} post={post}/>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ArticleList;
