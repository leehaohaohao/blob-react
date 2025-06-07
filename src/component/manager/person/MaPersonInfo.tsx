/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
/*
import './MaPersonInfo.css'
const MaPersonInfo = () => {
    return (
        <div className="ma-person-info-container" style={{ height: '100%', width: '100%' }}>
            <iframe
                src="/person.html"
                title="用户管理"
                style={{
                    border: 'none',
                    width: '100%',
                    height: '100vh',
                }}
                scrolling="no"
            />
        </div>
    )
};
export default MaPersonInfo;*/
/**
 * @description 用户管理页面 React 重构版
 * @author li
 * @date 2025/6/7
 */
import React, { useEffect, useState } from 'react';
import './MaPersonInfo.css';
import {getUserList, updatePerson} from "../../../api/feature/manager.ts";
import {UserInfoDto} from "../../../api/feature/user.ts";
import {useToast} from "../../provider/ToastContext.tsx";


const PAGE_SIZE = 8;

const MaPersonInfo = () => {
    const [list, setList] = useState<UserInfoDto[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const [status, setStatus] = useState(0);
    const [selectedUser, setSelectedUser] = useState<UserInfoDto | null>(null);
    const [showModal, setShowModal] = useState(false);
    const {showToast} = useToast();
    useEffect(() => {
        fetchUserList();
    }, [pageNum, status]);

    const fetchUserList = async () => {
        const data = await getUserList(pageNum.toString(), PAGE_SIZE.toString(), status.toString());
        setList(data.data);
    };

    const toggleStatus = () => {
        setStatus(prev => (prev === 0 ? 1 : 0));
        setPageNum(1);
    };

    const openEditModal = (user: UserInfoDto) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleStatusChange = async (user: UserInfoDto) => {
        const newStatus = user.status === 0 ? 1 : 0;
        const confirmChange = window.confirm(`确定更改此人状态为 ${newStatus === 0 ? '正常' : '异常'} 吗？`);
        if (!confirmChange) return;
        try {
            await updatePerson({
                userId: user.userId,
                status: newStatus.toString()
            });
            fetchUserList();
        } catch (err) {
            console.error(err);
            showToast("更新失败", "error");
        }
    };


    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const userId = formData.get('userId') as string;
            const name = formData.get('name') as string;
            const telephone = formData.get('telephone') as string;
            const gender = formData.get('gender') as string;
            const file = formData.get('file') as File;
            const status = selectedUser?.status?.toString() ?? '0'; // 默认取当前状态

            await updatePerson({
                userId,
                name,
                telephone,
                gender,
                status,
                file: file instanceof File && file.name ? file : null
            });

            setShowModal(false);
            fetchUserList();
        } catch (err: any) {
            alert(err?.message || '更新失败');
        }
    };


    return (
        <div className="ma-person-wrapper">
            <div className="ma-person-table-container">
                <table className="ma-person-table">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>姓名</th>
                        <th>邮箱</th>
                        <th>电话</th>
                        <th>性别</th>
                        <th>上次登陆时间</th>
                        <th>当前状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((user, index) => (
                        <tr key={user.userId}>
                            <td>{(pageNum - 1) * PAGE_SIZE + index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.telephone}</td>
                            <td>{user.gender === 0 ? '男' : '女'}</td>
                            <td>{user.lastLoginTime ?? '暂未登录'}</td>
                            <td>{user.status === 0 ? '正常' : '异常'}</td>
                            <td>
                                <button onClick={() => openEditModal(user)}>编辑</button>
                                <button onClick={() => handleStatusChange(user)}>更改状态</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="ma-person-pagination">
                    <div className="ma-person-toggle" onClick={toggleStatus}>
                        <span>{status === 0 ? '正常用户' : '异常用户'}</span>
                        <div className={`ma-person-switch ${status === 1 ? 'active' : ''}`}>
                            <div className="ma-person-knob" />
                        </div>
                    </div>
                    <button onClick={() => setPageNum(1)}>回到第一页</button>
                    <button disabled={pageNum === 1} onClick={() => setPageNum(p => p - 1)}>上一页</button>
                    <button disabled={list.length < PAGE_SIZE} onClick={() => setPageNum(p => p + 1)}>下一页</button>
                </div>
            </div>

            {showModal && selectedUser && (
                <div className="ma-person-modal">
                    <div className="ma-person-modal-content">
                        <span className="ma-person-close" onClick={() => setShowModal(false)}>×</span>
                        <form onSubmit={handleFormSubmit}>
                            <input type="hidden" name="userId" value={selectedUser.userId} />
                            <div className="ma-person-input-group">
                                <label>名字:</label>
                                <input type="text" name="name" defaultValue={selectedUser.name} />
                            </div>
                            <div className="ma-person-input-group">
                                <label>电话:</label>
                                <input type="text" name="telephone" defaultValue={selectedUser.telephone} />
                            </div>
                            <div className="ma-person-input-group">
                                <label>性别:</label>
                                <div className="ma-person-gender-group">
                                    <label htmlFor="male">
                                        <input type="radio" id="male" name="gender" value="0" /> 男
                                    </label>
                                    <label htmlFor="female">
                                        <input type="radio" id="female" name="gender" value="1" /> 女
                                    </label>
                                </div>
                            </div>
                            <div className="ma-person-input-group">
                                <label>上传图片:</label>
                                <input type="file" name="file" accept="image/*" />
                            </div>
                            <img src={selectedUser.photo} alt="预览" className="ma-person-avatar" />
                            <input type="submit" value="提交" />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaPersonInfo;

