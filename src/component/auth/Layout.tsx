import coverImage from '../../assets/cover.png'
import './layout.css'
import Register from "./Register.tsx";
import {useState} from "react";
import Login from "./Login.tsx";

const Layout = () =>{
    const [logging,setLogging] = useState(true);
    return (
        <div id={'mainContainer'}>
            <div id={'left'}>
                <img src={coverImage}/>
            </div>
            <div id={'right'}>
                {logging?<Login setLogging={setLogging}/>:<Register setLogging={setLogging}/>}
            </div>
        </div>
    )
}
export default Layout