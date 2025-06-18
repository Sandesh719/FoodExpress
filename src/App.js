import React,{lazy, Suspense} from "react";
import {createRoot} from "react-dom/client";
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
import Body from "./components/Body.js";
import About from "./components/About.js"
import Error from "./components/Error.js";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Profile from "./components/Profile.js";
import RestaurantMenu from "./components/RestaurantMenu.js"
import { createBrowserRouter,Outlet,RouterProvider } from "react-router";
import Shimmmer from "./components/Shimmer.js";
import { CartProvider } from "./context/CartContext.js";
/*
App layout
Header
    - logo
    - nav items(right side)
    - cart
Body
    - Search Bar
    - restraunt list
        - restraunt card
            - image
            - name
            - rating
            - cusines
Footer
    - links
    - copyright
*/

const Instamart = lazy(() => import("./components/Instamart.js"))

const AppLayout = ()=>{
    return (
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <CartProvider><AppLayout/></CartProvider>,
        errorelement: <Error/>,
        children: [
        {
            path: "/",
            element: <Body/>,
        },
        {
            path: "/about",
            element: <About/>,
            children:[{
                path: "profile",
                element: <Profile/>
            }]
        },
        {
            path: "/contact",
            element: <Contact/>,
        },
        {
            path: "/restaurant/:Resid",
            element: <RestaurantMenu/>
        },
        {
            path: "/cart",
            element: <Cart/>
        },
        {
            path: "/instamart",
            element: 
                <Suspense fallback={<Shimmmer/>}><Instamart/></Suspense> 
        }
    ]
    },
    ]
    )

const root = createRoot(document.getElementById("root"))

root.render(<RouterProvider router={appRouter}/>);