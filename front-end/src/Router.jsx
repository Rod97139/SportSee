import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from 'react-router-dom';

import Home from './pages/Home.jsx';
import SelectUser from './pages/SelectUser';
import NotFound from './pages/NotFound';

const Router = () => {
    const AppLayout = () => (
        <>
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

