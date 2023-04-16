import {createBrowserRouter} from "react-router-dom"
import Error from "./Error"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import AuthLayout from "./layouts/AuthLayout"
import Detail, {loader as DetailLoader} from "./pages/Detail"
import RegisterLayout from "./layouts/RegisterLayout"
import Register from "./pages/register"
const Router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "products/:productId",
                element: <Detail/>,
                loader: DetailLoader,
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