import {createBrowserRouter, Navigate} from "react-router-dom"
import Error from "./Error"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import AuthLayout from "./layouts/AuthLayout"
import Detail, {loader as DetailLoader} from "./pages/Detail"
 
import RegisterLayout from "./layouts/RegisterLayout"
import Register from "./pages/register"
 
import Cart from "./pages/Cart"
 
 
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
                element: <Home/>
            },
            {
                path: "products/:productId",
                element: <Detail/>,
                loader: DetailLoader,
            },

            {
                path: "/cart",
                element: <Cart />,
            }
        ]
    },
    {
        element: <AuthLayout/>,
        children: [
            {
                path:"/Login",
                element: <Login/>
            }
        ]   
    },
    {
        element: <RegisterLayout/>,
        children: [
            {
                path:"/Register",
                element: <Register/>
            }
        ]
    }
  
])

export default Router