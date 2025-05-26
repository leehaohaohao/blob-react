import {createBrowserRouter} from "react-router-dom";
import Layout from "../page/Layout.tsx";
import Home from "../page/Home.tsx";
import Front from "../component/home/front/Front.tsx";
import {Feedback} from "../component/home/feedback/Feedback.tsx";
import ComingSoonPage from "../component/home/ComingSoonPage.tsx";
import Square from "../page/Square.tsx";
import ArticleHub from "../component/square/ArticleHub.tsx";
import PublishPost from "../component/home/publish/PublishPost.tsx";

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
            },
            {
                path:'publish',
                element:<PublishPost/>
            }
        ]
    },
    {
        path: '/article',
        element: <Square/>,
        children: [
            {
                path: '',
                element: <ArticleHub/>
            }
        ]
    }
    ])
export default router;