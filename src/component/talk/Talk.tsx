/**
 * @description 群组聊天主组件，支持加入群组+拉取历史消息
 * @author li
 * @date 2025/6/6
 */
import React, { useState, useEffect } from "react";
import "./Talk.css";
import {
    GroupItem,
    selectGroupById,
    selectGroupList,
    selectMyGroup,
    addGroup,
    selectGroupCommentList, GroupCommentItem,
} from "../../api/feature/group.ts";
import { useToast } from "../provider/ToastContext.tsx";
import { closeWebSocket, connectWebSocket, setOnMessage } from "./wsClient.ts";
import { useUser } from "../provider/UserProvider.tsx";


const Talk: React.FC = () => {
    const [myGroup, setMyGroup] = useState<GroupItem | null>(null);
    const [recommendedGroups, setRecommendedGroups] = useState<GroupItem[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<GroupItem | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const [messages, setMessages] = useState<GroupCommentItem[]>([]);
    const { showToast } = useToast();
    const { user } = useUser();

    const authHeader = localStorage.getItem("token") || "";
    const userId = user?.userId || "";

    // 初始化加载我的群组和推荐群组
    useEffect(() => {
        const fetchData = async () => {
            try {
                const myGroupRes = await selectMyGroup();
                if (myGroupRes.success) {
                    setMyGroup(myGroupRes.data);
                    setSelectedGroup(myGroupRes.data);
                }

                const recommendedRes = await selectGroupList("1", "10");
                if (recommendedRes.success) {
                    setRecommendedGroups(recommendedRes.data);
                }
            } catch (e) {
                console.error("初始化加载群组失败:", e);
                showToast("初始化加载群组失败", "error");
            }
        };
        fetchData();
    }, [showToast]);

    // 每次选中群组变更，调用加入群组接口 + 拉取历史消息
    useEffect(() => {
        const joinAndLoadMessages = async (group: GroupItem | null) => {
            if (!group) {
                setMessages([]);
                return;
            }
            try {
                const addRes = await addGroup(group.id);
                if (addRes.success) {
                    const historyRes = await selectGroupCommentList(group.id, "1", "10");
                    console.log("历史消息:", historyRes);
                    if (historyRes.success) {
                        setMessages(historyRes.data.commentList || []);
                    } else {
                        setMessages([]);
                        showToast("获取历史消息失败", "error");
                    }
                } else {
                    setMessages([]);
                    showToast("加入群组失败", "error");
                }
            } catch (e) {
                console.error("加入群组或拉消息异常:", e);
                setMessages([]);
                showToast("加入群组或拉消息异常", "error");
            }
        };

        joinAndLoadMessages(selectedGroup);
    }, [selectedGroup, showToast]);

    // 连接 websocket，监听消息
    useEffect(() => {
        connectWebSocket(authHeader, userId);

        setOnMessage((msg) => {
            console.log("收到消息:", msg);
            // 这里可以判断 msg.groupId === selectedGroup?.id 来决定是否显示消息
        });

        return () => {
            closeWebSocket();
        };
    }, [authHeader, userId, selectedGroup]);

    // 搜索群组
    const handleSearch = async () => {
        if (!searchValue.trim()) {
            // 为空时恢复推荐列表
            try {
                const data = await selectGroupList("1", "10");
                if (data.success) {
                    setRecommendedGroups(data.data);
                }
            } catch {
                showToast("加载推荐群组失败", "error");
            }
            return;
        }
        try {
            const res = await selectGroupById(searchValue.trim());
            if (res.success && res.data) {
                setSelectedGroup(res.data);
                setRecommendedGroups([res.data]);
            } else {
                showToast("未找到对应群组", "error");
            }
        } catch (error) {
            console.error("搜索失败:", error);
            showToast("搜索失败", "error");
        }
    };

    // 点击选择群组
    const handleSelectGroup = (group: GroupItem) => {
        setSelectedGroup(group);
    };

    return (
        <div className="talk-container">
            <div className="talk-banner">
                <div className="talk-banner-content">
                    欢迎来到不挂科交流室！🎓 请遵守以下规则，保持社区和谐：
                    尊重他人：请勿发布侮辱、歧视或攻击性言论。合法内容：请勿发布任何违法、违规或侵权内容。保护隐私：请勿泄露他人的个人信息。
                </div>
            </div>
            <div className="talk-area-container">
                <div className="talk-area">
                    <div className="talk-left">
                        <div className="talk-room-head">
                            <div className="talk-room-title">
                                {selectedGroup ? selectedGroup.name : "讨论区"}
                            </div>
                            <div className="talk-room-id">
                                GID: {selectedGroup ? selectedGroup.id : "无"}
                            </div>
                        </div>

                        <div className="talk-room-content">
                            {!selectedGroup && (
                                <div className="talk-placeholder">
                                    请在右侧选择一个群组开始聊天 👈
                                </div>
                            )}

                            {selectedGroup && messages.length === 0 && (
                                <div className="talk-placeholder">暂无聊天记录</div>
                            )}

                            {selectedGroup && messages.length > 0 && (
                                <div className="talk-message-list">
                                    {messages.map((msg,index) => (
                                        <div key={index} className="talk-message-item">
                                            <span className="talk-message-user">{msg.name}:</span>{" "}
                                            <span className="talk-message-content">{msg.content}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {selectedGroup && (
                            <div className="talk-room-input">
                                <input type="text" placeholder="开始聊天吧" />
                                <button type="button">发送</button>
                            </div>
                        )}
                    </div>

                    <div className="talk-right">
                        <div className="talk-group-list-head">
                            <input
                                type="text"
                                placeholder="请输入GID"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />
                            <button type="button" onClick={handleSearch}>
                                搜索
                            </button>
                        </div>

                        <div className="talk-group-list">
                            {recommendedGroups.map((group) => (
                                <div
                                    key={group.id}
                                    className={`talk-group-chip ${
                                        selectedGroup?.id === group.id ? "selected" : ""
                                    }`}
                                    onClick={() => handleSelectGroup(group)}
                                >
                                    <img
                                        className="talk-group-avatar"
                                        src={group.avatar}
                                        alt="头像"
                                    />
                                    <div className="talk-group-info">
                                        <div className="talk-group-name">{group.name}</div>
                                        <div className="talk-group-gid">GID: {group.id}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="talk-group-my">
                            <div className="talk-group-my-head">我的群组</div>
                            {myGroup ? (
                                <div
                                    className={`talk-my-group-chip ${
                                        selectedGroup?.id === myGroup.id ? "selected" : ""
                                    }`}
                                    onClick={() => handleSelectGroup(myGroup)}
                                >
                                    <img
                                        className="talk-group-avatar"
                                        src={myGroup.avatar}
                                        alt="头像"
                                    />
                                    <div className="talk-group-info">
                                        <div className="talk-group-name">{myGroup.name}</div>
                                        <div className="talk-group-gid">GID: {myGroup.id}</div>
                                    </div>
                                </div>
                            ) : (
                                <button>创建群组</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Talk;
