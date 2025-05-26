import {createBrowserRouter} from "react-router-dom";
import Layout from "../page/Layout.tsx";
import Home from "../page/Home.tsx";
import Front from "../component/home/front/Front.tsx";
import {Feedback} from "../component/home/feedback/Feedback.tsx";
import ComingSoonPage from "../component/home/ComingSoonPage.tsx";

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
            },
            {
                path: 'feedback',
                element:<Feedback/>
            },
            {
                path:'future',
                element:<ComingSoonPage/>
            }
        ]
    }
    ])
export default router;