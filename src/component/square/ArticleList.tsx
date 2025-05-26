/**
 * @description
 * @author lihao
 * @date 2025/5/26 13:48
 */
import { useEffect, useState } from "react";
import { getTagPostList, PostItem } from "../../api/forum/forum.ts";
import ArticleCard from "./ArticleCard.tsx";
import './ArticleList.css'

interface ArticleListProps {
    currentTag: string;
}

const COLUMN_COUNT = 5;

const ArticleList: React.FC<ArticleListProps> = ({ currentTag }) => {
    const [postList, setPostList] = useState<PostItem[]>([]);

    useEffect(() => {
        const fetchTagPost = async () => {
            const res = await getTagPostList(currentTag, '1', '30'); // 多取一点
            console.log(res);
            setPostList(res.data.list);
        };
        fetchTagPost();
    }, [currentTag]);

    const handleFollow = (userId: string) => {
        console.log("关注用户：", userId);
        // TODO: 发请求改变状态
    };

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
                        <ArticleCard key={post.postId} post={post} onFollowClick={handleFollow} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ArticleList;
