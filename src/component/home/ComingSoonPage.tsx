/**
 * @description
 * @author lihao
 * @date 2025/5/26 10:01
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComingSoonPage.css';

const ComingSoonPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="comingsoon-page">
            <div className="icon-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="clock-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#409eff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            </div>
            <h1 className="title">敬请期待</h1>
            <p className="subtitle">该功能正在紧张开发中，马上就好！</p>
            <button className="back-btn" onClick={() => navigate(-1)}>
                返回上一页
            </button>
        </div>
    );
};

export default ComingSoonPage;
