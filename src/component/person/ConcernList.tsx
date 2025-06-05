/**
 * @description 关注或粉丝列表组件
 * @author lihao
 * @date 2025/6/5
 */
import React, { useEffect, useState } from "react";
import { getConcernList, ConcernItem } from "../../api/feature/social.ts";
import "./ConcernList.css";
import UserCard from "./UserCard.tsx";

const COLUMN_COUNT = 4;

interface ConcernListProps {
    status: "0" | "1"; // 0 表示查看关注，1 表示查看粉丝
    otherId?: string | null; // 为空表示查自己
}

const ConcernList: React.FC<ConcernListProps> = ({ status, otherId = "" }) => {
    const [userList, setUserList] = useState<ConcernItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getConcernList("1", "30", status, otherId || "");
                if (isMounted) {
                    setUserList(data.data || []);
                    console.log(data.data);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("加载列表失败", error);
                    setUserList([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [status, otherId]);

    if (loading) {
        return <div style={{ textAlign: "center", padding: 40 }}>加载中...</div>;
    }

    if (userList.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
                {status === "0" ? "你还没有关注任何人~" : "还没有人关注你~"}
            </div>
        );
    }

    const columns: ConcernItem[][] = Array.from({ length: COLUMN_COUNT }, () => []);
    userList.forEach((item, index) => {
        columns[index % COLUMN_COUNT].push(item);
    });

    return (
        <div className="concern-columns-wrapper">
            {columns.map((colUsers, colIndex) => (
                <div className="concern-column" key={colIndex}>
                    {colUsers.map(({ userInfoDto, status }) => (
                        <UserCard key={userInfoDto.userId} user={userInfoDto} status={status} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ConcernList;
