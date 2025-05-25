/**
 * @description 默认首页
 * @author lihao
 * @date 2024/12/11 15:56
 */
import './front.css'
import {useEffect, useState} from "react";
import {getUserInfo} from "../../../api/user/user.ts";
import {getUserLikeOrCollect, getUserPost, PostItem} from "../../../api/forum/forum.ts";

const Front = ()=>{
    const [isTagFormVisible,setTagFormVisible] = useState(false);
    const [tagsList,setTagsList] = useState<string[]>([]);
    const [coverUserPost,setCoverUserPost] = useState<PostItem[]>([]);
    const [coverUserLike,setCoverUserLike] = useState<PostItem[]>([]);
    const [coverUserCollect,setCoverUserCollect] = useState<PostItem[]>([]);
    useEffect(()=>{
        const userInfo = async()=>{
            try{
                const data = await getUserInfo();
                //console.log(data)
                const user = data.data;
                const tags = user.selfTag.split('|');
                setTagsList(tags);
            }catch (e){
                return e;
            }
        }
        userInfo();
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
                //console.log(data);
                setCoverUserLike(data.data);
            }catch (e){
                return e;
            }
        }
        userLike();
        const userCollect = async()=>{
            try{
                const data = await getUserLikeOrCollect('1','5','1');
                //console.log(data);
                setCoverUserCollect(data.data);
            }catch (e){
                return e;
            }
        }
        userCollect();
    },[])

    return (
        <div className={'front-container'}>
            <div className={'left'}>
                <div className={'left-box'}>
                    <div className={'front-post-cover'}>
                        <span>我 的 文 章</span>
                    </div>
                    {coverUserPost.map((post)=>{
                        //TODO 点击后跳转至文章详情
                        return (
                            <div className={'front-like'}>
                                <div className={'front-imgContainer'}>
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
                    {coverUserLike.map((post)=>{
                        //TODO 点击后跳转至文章详情
                        return (
                            <div className={'front-like'}>
                                <div className={'front-imgContainer'}>
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
                        //TODO 点击后跳转至文章详情
                        return (
                            <div className={'front-like'}>
                                <div className={'front-imgContainer'}>
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
                                    <div className={'tag-box'} key={index} >
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
                        <div className={'right-info-container'}>
                            <span>文章数：</span>
                            <span>3</span>
                        </div>
                        <div className={'right-info-container'}>
                            <span>粉丝数：</span>
                            <span>2</span>
                        </div>
                        <div className={'right-info-container'}>
                            <span>关注数：</span>
                            <span>1</span>
                        </div>
                    </div>
                    <div className={'feature-square'}>
                        <div className={'right-feature-container'}>
                            公告
                        </div>
                        <div className={'right-feature-container'}>
                            问题反馈
                        </div>
                        <div className={'right-feature-container'}>
                            不挂云盘
                        </div>
                        <div className={'right-feature-container'}>
                            不挂商场
                        </div>
                        <div className={'right-feature-container'}>
                            不挂考研
                        </div>
                        <div className={'right-feature-container'}>
                            不挂考公
                        </div>
                        <div className={'right-feature-container'}>
                            不挂英语
                        </div>
                        <div className={'right-feature-container'}>
                            不挂留学
                        </div>
                    </div>
                </div>
                {isTagFormVisible && (
                    <>
                    <div className={'overlay'} onClick={()=>setTagFormVisible(false)}></div>
                        <div className={'tag-form'}>
                            <p className={'tag-form-info'}>点击表单外区域自动关闭表单</p>
                            {tagsList.length > 0 ? (
                                tagsList.map((tag, index) => (
                                    <input className={'tag-form-box'} key={index} value={tag}/>
                                ))
                            ) : (
                                <p>暂无标签！</p>
                            )}
                            <form className={'tag-form-content'}>
                                <button className={'tag-add'}>添加标签</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default Front