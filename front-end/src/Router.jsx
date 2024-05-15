import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from 'react-router-dom';

import Home from './pages/home/Home.jsx';
import SelectUser from './pages/selectUser/SelectUser.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import Header from "./components/layout/header/Header.jsx";
import SideBar from "./components/layout/sideBar/SideBar.jsx";

const Router = () => {
    const AppLayout = () => (
        <>
            <Header />
            <SideBar />
            <Outlet />
        </>
    );
    const router = createBrowserRouter([
        {
        element: <AppLayout />,
        children: [

        {
            path: "/",
            element: <SelectUser />,
        },
        {
            path: "/user/:userId",
            element: <Home />,
        },
        {
            path: "*",
            element: <NotFound/>,
        },
        ]
    },
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default Router;

