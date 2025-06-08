import {createBrowserRouter} from "react-router-dom";
import Layout from "../page/Layout.tsx";
import Home from "../page/Home.tsx";
import Front from "../component/home/front/Front.tsx";
import {Feedback} from "../component/home/feedback/Feedback.tsx";
import ComingSoonPage from "../component/home/ComingSoonPage.tsx";
import Square from "../page/Square.tsx";
import ArticleHub from "../component/square/ArticleHub.tsx";
import PublishPost from "../component/home/publish/PublishPost.tsx";
import PostDetail from "../component/square/PostDetail.tsx";
import Person from "../component/person/Person.tsx";
import NewTalk from "../component/talk/NewTalk.tsx";
import Manager from "../page/Manager.tsx";
import MaApiInfo from "../component/manager/api/MaApiInfo.tsx";
import MaPersonInfo from "../component/manager/person/MaPersonInfo.tsx";
import MaPost from "../component/manager/post/MaPost.tsx";
import MaGroupInfo from "../component/manager/group/MaGroupInfo.tsx";
import MaWebInfo from "../component/manager/info/MaWebInfo.tsx";
import MaFeedback from "../component/manager/feedback/MaFeedback.tsx";
import MLogin from "../component/auth/MLogin.tsx";
import MaApprovalPost from "../component/manager/post/MaApprovalPost.tsx";

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
            },
            {
                path: 'person',
                element: <Person/>
            },
            {
                path: 'person/:userId',
                element: <Person/>
            },
            {
                path:'talk',
                element: <NewTalk/>
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
            },
            {
                path: ':tag',
                element: <ArticleHub/>
            },
            {
                path: 'content/:postId',
                element: <PostDetail/>
            }
        ]
    },
    {
        path: '/mlogin',
        element: <MLogin/>
    },
    {
        path: '/manager',
        element: <Manager/>,
        children:[
            {
                path:'',
                element: <MaWebInfo/>
            },
            {
                path:'api',
                element: <MaApiInfo/>
            },
            {
                path:'person',
                element: <MaPersonInfo/>
            },
            {
                path:'post',
                element: <MaPost/>
            },
            {
                path:'approval/:postId',
                element: <MaApprovalPost/>
            },
            {
                path:'group',
                element: <MaGroupInfo/>
            },
            {
                path:'feedback',
                element: <MaFeedback/>
            },
        ]
    }

    ])
export default router;