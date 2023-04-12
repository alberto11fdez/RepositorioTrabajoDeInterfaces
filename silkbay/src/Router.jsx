import {createBrowserRouter} from "react-router-dom"
import Error from "./Error"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import AuthLayout from "./layouts/AuthLayout"

const Router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home/>
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
    }
])

export default Router