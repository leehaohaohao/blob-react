import './form.css'
import  './login.css'
import {LoggingProps} from "./props.ts";
const Login = ({setLogging}:LoggingProps) => {
    return (
        <form id={"form"}>
            <h1>登录</h1>
            <input type={"text"} placeholder={"邮箱"} name={"email"}/>
            <input type={"password"} placeholder={"密码"} name={"password"}/>
            <button>登录</button>
            <p className={"link"} onClick={()=>setLogging(false)}>还没账号？</p>
        </form>
    )
}
export default Login