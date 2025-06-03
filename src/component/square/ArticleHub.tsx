import TagBar from "./TagBar.tsx";
import ArticleList from "./ArticleList.tsx";
import {useParams} from "react-router-dom";

/**
 * @description
 * @author lihao
 * @date 2025/5/26 13:25
 */

const ArticleHub = () => {
    const { tag } = useParams<{ tag?: string }>();
    const currentTag = tag || 'random_post';

    return (
        <div>
            <TagBar currentTag={currentTag}/>
            <ArticleList currentTag={currentTag}/>
        </div>
    );
};

export default ArticleHub;
