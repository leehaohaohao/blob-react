/**
 * @description 导航栏
 * @author lihao
 * @date 2024/12/10 23:44
 */
import './nav-bar.css'
import '../../animation/text-icon.css'
import logo from '../../assets/logo.jpg';
import home from '../../assets/icon/home.png'
import article from '../../assets/icon/article.png'
import chatroom from '../../assets/icon/chatroom.png'
import search from '../../assets/icon/search.png'
import publish from '../../assets/icon/publish.png'
import avatar from '../../assets/default/avatar.png'
import {useUser} from "../provider/UserProvider.tsx";
import {useToast} from "../provider/ToastContext.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
const NavBar = () => {
    const {user,error} = useUser();
    const {showToast} = useToast();
    if(error!==null){
        showToast(error,'error');
    }
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        const trimmed = keyword.trim();
        if (trimmed) {
            navigate(`/article/${encodeURIComponent(trimmed)}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <nav className={'nav-bar'}>
            <div className={'logo'}>
                <img src={logo} alt=""/>
                <div className={'app'}>blob</div>
            </div>

            <div className={'tab'}>
                <div className={'tab-item animation-container'} onClick={()=>{
                    navigate('/home');
                }}>
                    <p className={'tab-item-text text'}>首页</p>
                    <img src={home} className={'tab-item-icon icon'} alt={'首页'}/>
                </div>
                <div className={'tab-item animation-container'} onClick={()=>{
                    navigate('/article');
                }}>
                    <p className={'tab-item-text text'}>文章</p>
                    <img src={article} className={'tab-item-icon icon'} alt={'文章'}/>
                </div>
                <div className={'tab-item animation-container'}>
                    <p className={'tab-item-text text'}>聊天室</p>
                    <img src={chatroom} className={'tab-item-icon icon'} alt={'聊天室'}/>
                </div>
            </div>

            <div className={'search'}>
                <input
                    type="text"
                    placeholder="搜索"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img
                    src={search}
                    className="search-icon"
                    alt="搜索"
                    onClick={handleSearch}
                    style={{cursor: 'pointer'}}
                />
            </div>

            <div className={'publish'}>
                <div className={'publish-container animation-container'} onClick={()=>{
                    navigate('/home/publish');
                }}>
                    <p className={'publish-text text '}>发布</p>
                    <img src={publish} className={'publish-icon icon'} alt={'发布'}/>
                </div>
            </div>
            <div className={'info'}>
                <div className={'info-container'}>
                    <img src={user===null?avatar:user.photo} className={'avatar'} alt={'头像'}/>
                    <div className={'dropdown-menu'}>
                        <div className={'userinfo'}>
                            <div className={'user-row'}>
                                <span className={'label'}>姓名:</span>
                                <span className={'value'}>{user===null?'不挂用户':user.name}</span>
                            </div>
                            <div className={'user-row'}>
                                <span className={'label'}>UID:</span>
                                <span className={'value uid'}>{user===null?'123456':user.userId}</span>
                            </div>
                        </div>
                        <ul className={'menu-list'}>
                            <li><a>我的喜欢</a></li>
                            <li><a>我的关注</a></li>
                            <li><a>我的文章</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav>
    )
}
export default NavBar