import {createBrowserRouter, Navigate} from "react-router-dom"
import Error from "./Error"
import DefaultLayout from "./layouts/DefaultLayout"
import Home, {loader as homeLoader} from "./pages/Home"
import Login, {action as loginAction} from "./pages/Login"
import AuthLayout from "./layouts/AuthLayout"
import Detail, {loader as detailLoader} from "./pages/Detail"
 
import RegisterLayout from "./layouts/RegisterLayout"
import Register, {action as registerAction} from "./pages/register"

import Cart, {action as cartAction} from "./pages/Cart"
import User from "./pages/User"
import Help from "./pages/Help"
import Purchases, {loader as purchasesLoader} from "./pages/Purchases"
 
 
const Router = createBrowserRouter([
    {
        element: <Navigate to="/home"/>,
        path:"/"
    },
    {
        element: <DefaultLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/home",
                element: <Home/>,
                loader: homeLoader
            },
            {
                path: "products/:productId",
                element: <Detail/>,
                loader: detailLoader,
            },

            {
                path: "/cart",
                element: <Cart />,
                action: cartAction,
            },
            {
                path: "/user",
                element: <User/>
            },
            {
                path: "/help",
                element: <Help/>
            },
            {
                path: "/user/purchases",
                element: <Purchases />,
                loader: purchasesLoader,
            }
        ]
    },
    {
        element: <AuthLayout/>,
        children: [
            {
                path:"/Login",
                element: <Login/>,
                action: loginAction
            }
        ]   
    },
    {
        element: <RegisterLayout/>,
        children: [
            {
                path:"/register",
                element: <Register/>,
                action: registerAction,
            }
        ]
    }
  
])

export default Router