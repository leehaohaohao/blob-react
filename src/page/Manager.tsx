/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import {Outlet} from "react-router-dom";
import Footer from "../component/home/Footer.tsx";
import MaNavBar from "../component/manager/MaNavBar.tsx";
import MaContent from "../component/manager/MaContent.tsx";

const Manager = ()=>{
    return (
        <div className={"container"}>
            <MaNavBar/>
            <MaContent>
                <main>
                    <Outlet/>
                </main>
            </MaContent>
            <Footer/>
        </div>
    )
}
export default Manager;