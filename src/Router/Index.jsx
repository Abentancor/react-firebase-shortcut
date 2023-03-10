import { createBrowserRouter } from "react-router-dom";

import LayoutPublic from "../Layouts/LayoutPublic";
import LayoutPrivate from "../Layouts/LayoutPrivate"

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import Redirect from "../Pages/Redirect";

export const router = createBrowserRouter([{
    path:'/',
    element:<LayoutPublic/>,
    children:[
        {
            index:true,
            element:<Home/>,
        },
        {
            path:'/login',
            element:<Login/>,
        },
       {
            path:'/register',
             element:<Register/>,
        },
        {
            path:'/:nanoid',
             element:<Redirect/>,
        },
        {
            path:'/dashboard',
            element:<LayoutPrivate/>,
            children:[
                {
                    index:true,
                    element:<Dashboard/>
                }
            ]
        },]
}])