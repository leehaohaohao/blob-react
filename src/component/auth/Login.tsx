/**
 * @description 登录组件
 * @author lihao
 * @date 2024/12/10 20-51
 */
import './form.css'
import  './login.css'
import {LoggingProps} from "./props.ts";
import {useState} from "react";
import {loginApi} from "../../api/auth/auth.ts";
import * as React from "react";
const Login = ({setLogging}:LoggingProps) => {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    //登陆请求
    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("email",email);
        formData.append("password",password);
        const res = await loginApi(formData);
        const token = res.data.data;
        console.log(token)
        localStorage.setItem("token",token);
        //TODO 跳转页面
    }
    return (
        <form className={"form"} onSubmit={handleSubmit}>
            <h1>登录</h1>
            <input type={"text"} placeholder={"邮箱"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type={"password"} placeholder={"密码"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button>登录</button>
            <p className={"link"} onClick={()=>setLogging(false)}>还没账号？</p>
        </form>
    )
}
export default Login