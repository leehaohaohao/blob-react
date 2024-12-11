import {createBrowserRouter} from "react-router-dom";
import Layout from "../page/Layout.tsx";
import Home from "../page/Home.tsx";
import Front from "../component/home/front/Front.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>
    },
    {
        path: '/home',
        element: <Home/>,
        children: [
            {
                path: '',
                element: <Front/>
            }
        ]
    }
    ])
export default router;