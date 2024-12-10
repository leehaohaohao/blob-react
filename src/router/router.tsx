import {createBrowserRouter} from "react-router-dom";
import Layout from "../component/auth/Layout.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>
    }
    ])
export default router;