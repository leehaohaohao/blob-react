import { useState, useEffect } from 'react';
import './form.css';
import './register.css';
import { LoggingProps } from "./props.ts";
import { useToast } from "../provider/ToastContext.tsx";
import { registerApi, sendEmailCode } from "../../api/auth/auth.ts";

const Register = ({ setLogging }: LoggingProps) => {
    const { showToast } = useToast();
    const [countdown, setCountdown] = useState(0);

    // 输入字段状态
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        let timer: number;
        if (countdown > 0) {
            timer = window.setTimeout(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleSendCode = async () => {
        if (!username) {
            showToast("请先输入邮箱", "error");
            return;
        }

        const res = await sendEmailCode(username); // 假设 username 是邮箱
        if (res.success) {
            showToast("发送验证码成功", "info");
            setCountdown(60);
        } else {
            showToast("验证码发送失败，请检查邮箱是否正确", "error");
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password || !code) {
            showToast("请填写完整信息", "error");
            return;
        }

        const res = await registerApi(username, password, code);
        if (res.success) {
            showToast("注册成功", "info");
            setLogging(true);
        } else {
            showToast("注册失败，请检查输入信息", "error");
        }
    };

    return (
        <form className="form" onSubmit={handleRegister}>
            <h1 className="register-title">注册</h1>
            <input
                className="log-input"
                type="text"
                placeholder="邮箱"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="log-input"
                type="password"
                placeholder="密码"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="code">
                <input
                    className="code-input"
                    type="text"
                    placeholder="验证码"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button
                    type="button"
                    className="code-button"
                    onClick={handleSendCode}
                    disabled={countdown > 0}
                >
                    {countdown > 0 ? `重新发送(${countdown}s)` : '发送验证码'}
                </button>
            </div>
            <button className="log-button" type="submit">注册</button>
            <p className="link" onClick={() => setLogging(true)}>已有账号？</p>
        </form>
    );
};

export default Register;

