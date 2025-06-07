/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import { useNavigate, useLocation } from "react-router-dom";
import './MaContent.css';

const MaContent = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: "网站信息", path: "/manager" },
        { label: "API详情", path: "/manager/api" },
        { label: "人员管理", path: "/manager/person" },
        { label: "群组管理", path: "/manager/group" },
        { label: "文章审批管理", path: "/manager/post" },
        { label: "问题反馈管理", path: "/manager/feedback" },
    ];

    const getActiveClass = (path: string) => {
        if (path === "/manager") {
            return location.pathname === "/manager" ? "active" : "";
        } else {
            return location.pathname.startsWith(path) ? "active" : "";
        }
    };

    return (
        <div className="ma-layout">
            <aside className="ma-sidebar">
                <h2 className="ma-sidebar-title">后台功能</h2>
                <ul className="ma-menu">
                    {menuItems.map((item) => (
                        <li
                            key={item.path}
                            className={`ma-menu-item ${getActiveClass(item.path)}`}
                            onClick={() => navigate(item.path)}
                        >
                            <span className="ma-menu-dot" />
                            {item.label}
                        </li>
                    ))}
                </ul>
            </aside>
            <div className="ma-main">
                {children}
            </div>
        </div>
    );
};

export default MaContent;
