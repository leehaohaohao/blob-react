import TagBar from "./TagBar.tsx";
import ArticleList from "./ArticleList.tsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

/**
 * @description
 * @author lihao
 * @date 2025/5/26 13:25
 */
const ArticleHub = () => {
    const [currentTag, setCurrentTag] = useState<string|null>(null);
    const location = useLocation();

    useEffect(() => {
        const tagParam = new URLSearchParams(location.search).get('tag') || 'random_post';
        if (tagParam !== currentTag) {
            setCurrentTag(tagParam);
        }
        console.log(tagParam,  'tagParam')
    }, [location.search]);
    return (
        <div>
            <TagBar currentTag={currentTag}/>
            <ArticleList currentTag={currentTag}/>
        </div>
    );
};

export default ArticleHub;