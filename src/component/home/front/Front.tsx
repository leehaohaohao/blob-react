/**
 * @description 默认首页
 * @author lihao
 * @date 2024/12/11 15:56
 */
import './front.css'
import {useEffect, useState} from "react";
import {getUserLikeOrCollect, getUserPost, PostItem} from "../../../api/feature/forum.ts";
import {useUser} from "../../provider/UserProvider.tsx";
import {useToast} from "../../provider/ToastContext.tsx";
import {updateUserTag} from "../../../api/feature/user.ts";
import {useNavigate} from "react-router-dom";

const Front = ()=>{
    const [isTagFormVisible,setTagFormVisible] = useState(false);
    const [tagsList,setTagsList] = useState<string[]>([]);
    const [coverUserPost,setCoverUserPost] = useState<PostItem[]>([]);
    const [coverUserLike,setCoverUserLike] = useState<PostItem[]>([]);
    const [coverUserCollect,setCoverUserCollect] = useState<PostItem[]>([]);
    const {user,error} = useUser();
    const {showToast} = useToast();
    const navigate = useNavigate();
    if(error!==null){
        showToast(error,'error');
    }
    useEffect(()=>{
        const userPost = async()=>{
            try{
                const data = await getUserPost('1','5','2');
                //console.log(data)
                setCoverUserPost(data.data);
            }catch (e){
                return e;
            }
        }
        userPost();
        const userLike = async()=>{
            try{
                const data = await getUserLikeOrCollect('1','5','0');
                if(data.success){
                    setCoverUserLike(data.data);
                }else{
                    showToast(typeof data.message === "string" ? data.message :"服务器异常，请联系管理员！",'error');
                }
            }catch (e){
                return e;
            }
        }
        userLike();
        const userCollect = async()=>{
            try{
                const data = await getUserLikeOrCollect('1','5','1');
                if(data.success){
                    setCoverUserCollect(data.data);
                }else{
                    showToast(typeof data.message === "string" ? data.message :"服务器异常，请联系管理员！",'error');
                }
            }catch (e){
                return e;
            }
        }
        userCollect();

    },[]);
    useEffect(() => {
        if (user?.selfTag && tagsList.length === 0) {
            const tag = user.selfTag.split('|');
            setTagsList(tag);
        }
    }, [user]);
    const updateTag = async()=>{
        try{
            const filteredTags = tagsList.filter(tag => tag.trim() !== '');
            const tag = filteredTags.join('|');
            console.log(tag,'更新标签')
            const data = await updateUserTag(tag);
            if(!data.success){
                showToast(typeof data.message === "string" ? data.message :'error');
            }
        }catch (e){
            console.error(e,"更新标签失败");
        }
    }
    const addTag = (e: React.MouseEvent) => {
        e.preventDefault();
        if (tagsList.length >= 5){
            showToast('最多添加5个标签','error');
            return;
        }
        const hasEmptyTag = tagsList.some(tag => tag.trim() === '');
        if (hasEmptyTag) {
            showToast('请先填写已有空标签再添加新标签', 'info');
            return;
        }
        setTagsList([...tagsList, ""]);
    };
    return (
        <div className={'front-container'}>
            <div className={'left'}>
                <div className={'left-box'}>
                    <div className={'front-post-cover'}>
                        <span>我 的 文 章</span>
                    </div>
                    {coverUserPost.map((post)=>{
                        return (
                            <div className={'front-like'}>
                                <div className={'front-imgContainer'} onClick={()=>{navigate('/article/content/'+post.postId)}}>
                                    <img className={'front-post-img'} src={post.cover} alt={'头像'}/>
                                    <div className={'front-post-title'}>
                                        {post.title}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <div className={'left-box'}>
                    <div className={'front-post-cover'}>
                        <span>我 的 喜 欢</span>
                    </div>
                    {
                        coverUserLike.map((post)=>{
                            return (
                                <div className={'front-like'}>
                                    <div className={'front-imgContainer'} onClick={()=>{navigate('/article/content/'+post.postId)}}>
                                        <img className={'front-post-img'} src={post.cover} alt={'头像'}/>
                                        <div className={'front-post-title'}>
                                            {post.title}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={'left-box'}>
                    <div className={'front-post-cover'}>
                        <span>我 的 收 藏</span>
                    </div>
                    {coverUserCollect.map((post)=>{
                        return (
                            <div className={'front-like'}>
                                <div className={'front-imgContainer'} onClick={()=>{navigate('/article/content/'+post.postId)}}>
                                    <img className={'front-post-img'} src={post.cover} alt={'头像'}/>
                                    <div className={'front-post-title'}>
                                        {post.title}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className={'right'}>
                <div className={'right-box'}>
                    <div className={'custom-tags'}>
                        <div className={'tag-list'}>
                            {tagsList.length > 0 ? (
                                tagsList.map((tag, index) => (
                                    <div className={'tag-box'} key={index} onClick={()=>{navigate('/article/'+tag)}}>
                                        {tag}
                                    </div>
                                ))):
                                (<></>)
                            }
                        </div>
                        <div className={'tag-button'}>
                            <button className={'tag-button-content'} onClick={()=>setTagFormVisible(!isTagFormVisible)}>
                                自定义标签
                            </button>
                        </div>
                    </div>
                    <div className={'right-info'}>
                        <div className={'right-info-container'} onClick={() => {
                            navigate('/home/person?tab=articles');
                        }}>
                            <span>文章数：</span>
                            <span>{user?.post}</span>
                        </div>
                        <div className={'right-info-container'}onClick={() => {
                            navigate('/home/person?tab=concerns');
                        }}>
                            <span>关注数：</span>
                            <span>{user?.concern}</span>
                        </div>
                        <div className={'right-info-container'}onClick={() => {
                            navigate('/home/person?tab=fans');
                        }}>
                            <span>粉丝数：</span>
                            <span>{user?.followers}</span>
                        </div>
                        <div className={'right-info-container'}>
                            <span>广告位招租</span>
                            <span>致电：110</span>
                        </div>
                    </div>
                    <div className={'feature-square'}>
                        <div className={'right-feature-container'} onClick={() => {
                            navigate('/home/future');
                        }}>
                            公告
                        </div>
                        <div className={'right-feature-container'} onClick={() => {
                            navigate('/home/feedback');
                        }}>
                            问题反馈
                        </div>
                        <div className={'right-feature-container'} onClick={() => {
                            navigate('/home/future');
                        }}>
                            不挂云盘
                        </div>
                        <div className={'right-feature-container'} onClick={() => {
                            navigate('/home/future');
                        }}>
                            不挂商场
                        </div>
                        <div className={'right-feature-container'} onClick={() => {
                            navigate('/home/future');
                        }}>
                            不挂考研
                        </div>
                        <div className={'right-feature-container'} onClick={() => {
                            navigate('/home/future');
                        }}>
                            不挂考公
                        </div>
                        <div className={'right-feature-container'} onClick={() => {
                            navigate('/home/future');
                        }}>
                            不挂英语
                        </div>
                        <div className={'right-feature-container'} onClick={() => {
                            navigate('/home/future');
                        }}>
                            不挂留学
                        </div>
                    </div>
                </div>
                {isTagFormVisible && (
                    //TODO 标签显示问题 && 添加标签超出内容框
                    <>
                    <div className={'overlay'} onClick={()=>{
                        setTagsList(tagsList.filter(tag => tag.trim() !== '')); // 清理空标签
                        updateTag();
                        setTagFormVisible(false)
                    }}></div>
                        <div className={'tag-form'}>
                            <p className={'tag-form-info'}>点击表单外区域自动关闭表单</p>
                            {tagsList.length > 0 ? (
                                tagsList.map((tag, index) => (
                                    <input className={'tag-form-box'} key={index} value={tag}
                                    onChange={(e)=>{
                                        const newTags = [...tagsList];
                                        newTags[index] = e.target.value;
                                        setTagsList(newTags);
                                    }}/>
                                ))
                            ) : (
                                <p>暂无标签！</p>
                            )}
                            <form className={'tag-form-content'} onSubmit={e => e.preventDefault()}>
                                <button className={'tag-add'} onClick={addTag}>添加标签</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default Front