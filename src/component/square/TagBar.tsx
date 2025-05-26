/**
 * @description
 * @author lihao
 * @date 2025/5/26 13:18
 */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getHotTag, TagItem } from "../../api/forum/forum.ts";
import { useToast } from "../provider/ToastContext.tsx";
import "./TagBar.css"
interface TagBarProps {
    currentTag: string;
    setCurrentTag: (tag: string) => void;
}
const TagBar:React.FC<TagBarProps> = ({ currentTag, setCurrentTag })=> {
    const [hotTags, setHotTags] = useState<TagItem[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useToast();

    useEffect(() => {
        const tagParam = new URLSearchParams(location.search).get('tag') || 'random_post';
        setCurrentTag(tagParam);
    }, [location.search]);

    useEffect(() => {
        const fetchTags = async () => {
            const res = await getHotTag();
            if (!res.success) {
                showToast(typeof res.message === "string" ? res.message : 'error');
            } else {
                setHotTags(res.data);
            }
        };
        fetchTags();
    }, []);

    const handleClick = (tag: string) => {
        navigate(`/article?tag=${tag}`);
    };

    const isFreeTag = !hotTags.some(item => item.tag === currentTag) && currentTag !== 'random_post';

    return (
        <div className="tag-bar">
            <span
                className={`tag ${currentTag === 'random_post' ? 'active' : ''}`}
                onClick={() => handleClick('random_post')}
            >
                推荐
            </span>
            {hotTags.map(item => (
                <span
                    key={item.tag}
                    className={`tag ${currentTag === item.tag ? 'active' : ''}`}
                    onClick={() => handleClick(item.tag)}
                >
                    {item.tag}
                </span>
            ))}
            {isFreeTag && (
                <span className="tag active">{currentTag}</span>
            )}
        </div>
    );
};

export default TagBar;
