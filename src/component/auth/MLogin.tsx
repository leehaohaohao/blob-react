/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import './form.css'
import  './login.css'
import {useState} from "react";
import {mLoginApi} from "../../api/auth/auth.ts";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import coverImage from "../../assets/cover.png";
const MLogin = () => {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const navigate = useNavigate();
    //登陆请求
    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        const data = await mLoginApi(email,password);
        const token = data.data;
        console.log(token);
        localStorage.setItem("token",token);
        navigate("/manager")
    }
    return (
        <div id={'mainContainer'}>
            <div id={'left'}>
                <img src={coverImage}/>
            </div>
            <div id={'right'}>
                <form className={"form"} onSubmit={handleSubmit}>
                    <h1>登录</h1>
                    <input className={'log-input'} type={"text"} placeholder={"邮箱"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input className={'log-input'} type={"password"} placeholder={"密码"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button className={'log-button'}>登录</button>
                    <p className={"link"} onClick={()=>{
                        navigate("/");
                    }}>普通用户？</p>
                </form>
            </div>
        </div>
    )
}
export default MLogin