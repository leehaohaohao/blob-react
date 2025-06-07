/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import "./MaGroupInfo.css";
import {getGroupList, updateGroup} from "../../../api/feature/manager.ts";
import {GroupDto} from "../../../api/feature/group.ts";
const MaGroupInfo = () => {
    const [groups, setGroups] = useState<GroupDto[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const pageSize = 8;
    const [status, setStatus] = useState<0 | 1>(0);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editGroup, setEditGroup] = useState<GroupDto | null>(null);
    const [newAvatarPreview, setNewAvatarPreview] = useState<string>("http://localhost:9090/blob/img/defAva.png");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchGroups(pageNum.toString(), pageSize.toString(), status.toString());
    }, [pageNum, status]);
    const fetchGroups = async (pageNum: string, pageSize: string, status: string) => {
        setLoading(true);
        try {
            const data = await getGroupList(pageNum, pageSize, status);
            setGroups(data.data);
        } catch (error) {
            console.error(error);
            alert("获取群组数据失败");
        } finally {
            setLoading(false);
        }
    };
    // 打开编辑模态框
    const openModal = (group: GroupDto) => {
        setEditGroup(group);
        setNewAvatarPreview(group.avatar);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setEditGroup(null);
        setNewAvatarPreview("http://localhost:9090/blob/img/defAva.png");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };
    // 切换状态开关
    const toggleStatus = () => {
        setStatus((prev) => (prev === 0 ? 1 : 0));
        setPageNum(1);
    };
    // 分页按钮事件
    const goToFirstPage = () => setPageNum(1);
    const prevPage = () => setPageNum((p) => (p > 1 ? p - 1 : 1));
    const nextPage = () => setPageNum((p) => p + 1);
    // 状态更改按钮事件
    const changeStatus = async (group: GroupDto) => {
        const newStatus = group.status === 0 ? 1 : 0;
        if (!window.confirm(`确定更改此群状态为${newStatus === 0 ? "正常" : "异常"}吗？`)) return;

        try {
            const res = await updateGroup({ id: group.id, status: newStatus });
            if (res.success) {
                alert("状态修改成功");
                fetchGroups(pageNum.toString(), pageSize.toString(), status.toString());
            } else {
                alert(res.message || "状态修改失败");
            }
        } catch (error) {
            console.error(error);
            alert("状态修改失败");
        }
    };
    // 表单提交
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editGroup) return;

        try {
            const formData = new FormData(e.currentTarget);
            const id = formData.get("id") as string;
            const name = formData.get("name") as string;
            const file = (fileInputRef.current?.files && fileInputRef.current.files[0]) || null;

            const res = await updateGroup({ id, name, file });

            if (res.success) {
                alert("提交成功");
                closeModal();
                fetchGroups(pageNum.toString(), pageSize.toString(), status.toString());
            } else {
                alert(res.message || "提交失败");
            }
        } catch (error) {
            console.error(error);
            alert("提交失败");
        }
    };
    // 选择图片时预览
    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (ev.target?.result) setNewAvatarPreview(ev.target.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="ma-group-wrapper" style={{ padding: 24, backgroundColor: "var(--ma-color-bg)", height: "100%", width: "100%", fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>
            <div className="ma-group-table-container">
                <table className="ma-group-table">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>姓名</th>
                        <th>群名</th>
                        <th>群头像</th>
                        <th>创建时间</th>
                        <th>当前状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={7}>加载中...</td>
                        </tr>
                    ) : groups.length === 0 ? (
                        <tr>
                            <td colSpan={7}>暂无数据</td>
                        </tr>
                    ) : (
                        groups.map((group, index) => (
                            <tr key={group.id}>
                                <td>{(pageNum - 1) * pageSize + index + 1}</td>
                                <td>{group.userName}</td>
                                <td>{group.name}</td>
                                <td>
                                    <img
                                        style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }}
                                        src={group.avatar}
                                        alt="群头像"
                                    />
                                </td>
                                <td>{group.time}</td>
                                <td>{group.status === 0 ? "正常" : "异常"}</td>
                                <td>
                                    <button onClick={() => openModal(group)}>编辑</button>
                                    <button onClick={() => changeStatus(group)}>更改状态</button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* 分页和状态切换 */}
            <div className="ma-group-pagination" style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", padding: "12px 0" }}>
                <div
                    className="ma-group-toggle"
                    onClick={toggleStatus}
                    style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}
                >
                    <span id="statusLabel">{status === 0 ? "正常群组" : "异常群组"}</span>
                    <div className={`ma-group-switch ${status === 1 ? "active" : ""}`}>
                        <div className="ma-group-knob"></div>
                    </div>
                </div>

                <button className="ma-group-page-button" onClick={goToFirstPage} disabled={pageNum === 1}>
                    回到第一页
                </button>
                <button className="ma-group-page-button" onClick={prevPage} disabled={pageNum === 1} id="prevPage">
                    上一页
                </button>
                <button className="ma-group-page-button" onClick={nextPage} disabled={groups.length < pageSize} id="nextPage">
                    下一页
                </button>
            </div>

            {/* 模态框 */}
            {modalOpen && editGroup && (
                <div className="ma-group-modal" onClick={(e) => e.target === e.currentTarget && closeModal()}>
                    <div className="ma-group-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="ma-group-close" onClick={closeModal}>
              ×
            </span>
                        <form id="editForm" onSubmit={onSubmit}>
                            <input type="hidden" name="id" value={editGroup.id} />
                            <div className="ma-group-input-group">
                                <label htmlFor="name">群名:</label>
                                <input type="text" id="name" name="name" defaultValue={editGroup.name} required />
                            </div>
                            <div className="ma-group-input-group">
                                <label htmlFor="img">上传图片:</label>
                                <div className="ma-group-custom-file-upload">
                                    <label htmlFor="img" style={{ cursor: "pointer", color: "var(--ma-color-primary)" }}>
                                        选择图片
                                    </label>
                                    <input
                                        type="file"
                                        id="img"
                                        name="file"
                                        accept=".png,.jpg,.jpeg,.gif,.svg"
                                        onChange={onFileChange}
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                    />
                                </div>
                            </div>
                            <img
                                id="new-profile-pic"
                                src={newAvatarPreview}
                                alt="新头像"
                                className="ma-group-avatar"
                                style={{ width: 100, height: 100, borderRadius: "50%", marginBottom: 8 }}
                            />
                            <input type="submit" value="提交" />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default MaGroupInfo;
