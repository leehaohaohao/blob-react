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
const NavBar = () => {
    return (
        <nav className={'nav-bar'}>
            <div className={'logo'}>
                <img src={logo} alt=""/>
                <div className={'app'}>blob</div>
            </div>

            <div className={'tab'}>
                <div className={'tab-item animation-container'}>
                    <p className={'tab-item-text text'}>首页</p>
                    <img src={home} className={'tab-item-icon icon'} alt={'首页'}/>
                </div>
                <div className={'tab-item animation-container'}>
                    <p className={'tab-item-text text'}>文章</p>
                    <img src={article} className={'tab-item-icon icon'} alt={'文章'}/>
                </div>
                <div className={'tab-item animation-container'}>
                    <p className={'tab-item-text text'}>聊天室</p>
                    <img src={chatroom} className={'tab-item-icon icon'} alt={'聊天室'}/>
                </div>
            </div>

            <div className={'search'}>
                <input type={'text'} placeholder={'搜索'}/>
                <img src={search} className={'search-icon'} alt={'搜索'}/>
            </div>

            <div className={'publish'}>
                <div className={'publish-container animation-container'}>
                    <p className={'publish-text text '}>发布</p>
                    <img src={publish} className={'publish-icon icon'} alt={'发布'}/>
                </div>
            </div>
            <div className={'info'}>
                <div className={'info-container'}>
                    <img src={avatar} className={'avatar'} alt={'头像'}/>
                    <div className={'dropdown-menu'}>
                        <ul>
                            <div className={'userinfo'}>
                                <div className={'name'}>
                                    <div className={'name-text'}>
                                        <span>姓名:</span>
                                    </div>
                                    <div className={'name-value'}>
                                        <span>李昊</span>
                                    </div>
                                </div>
                                <hr/>
                                <div className={'id'}>
                                    <div className={'id-text'}>
                                        <span>UID:</span>
                                    </div>
                                    <div className={'id-value'}>
                                        <span>123456789</span>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            <li>
                                <a>我的喜欢</a>
                            </li>
                            <li>
                                <a>我的关注</a>
                            </li>
                            <li>
                                <a>我的文章</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default NavBar