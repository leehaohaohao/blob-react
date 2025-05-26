import {Outlet} from "react-router-dom";
import NavBar from "../component/home/NavBar.tsx";
import Footer from "../component/home/Footer.tsx";
import './home.css'
/**
 * @description 主页
 * @author lihao
 * @date 2024/12/10 23:40
 */
const Home = () =>{
    return (
            <div className={"container"}>
                <NavBar/>
                <main>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
    )
}
export default Home;