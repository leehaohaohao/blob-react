import {createBrowserRouter} from "react-router-dom";
import Layout from "../page/Layout.tsx";
import Home from "../page/Home.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>
    },
    {
        path: '/home',
        element: <Home/>
    }
    ])
export default router;