/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import './MaNavBar.css';
import { useUser } from '../provider/UserProvider.tsx';

const MaNavBar = () => {
    const { user } = useUser();

    return (
        <div className="ma-navbar">
            <div className="ma-navbar-left">管理后台</div>
            <div className="ma-navbar-right">
                管理员 {user?.name || '未知用户'}，你好
            </div>
        </div>
    );
};

export default MaNavBar;
