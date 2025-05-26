import NavBar from "../component/home/NavBar.tsx";
import {Outlet} from "react-router-dom";

/**
 * @description 
 * @author lihao
 * @date 2025/5/26 10:17
 */
const Square = () => {
    return (
        <div className={'container'}>
            <NavBar/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};
export default Square;