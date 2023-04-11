import {createBrowserRouter} from "react-router-dom"
import Error from "./Error"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"

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
    }
])

export default Router