import './form.css'
import './register.css'
import {LoggingProps} from "./props.ts";

const Register = ({setLogging}:LoggingProps)=>{
    return(
        <form id={"form"}>
            <h1>注册</h1>
            <input type={"text"} placeholder={"用户名"} name={"username"} />
            <input type={"password"} placeholder={"密码"} name={"password"} />
            <div id={'code'}>
                <input type={"text"} placeholder={"验证码"} name={"code"} />
                <button>发送验证码</button>
            </div>
            <button>注册</button>
            <p className={"link"} onClick={()=>setLogging(true)}>已有账号？</p>
        </form>
    )
}
export default Register