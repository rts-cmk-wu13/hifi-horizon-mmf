import { createBrowserRouter } from "react-router";
import React, { lazy, Suspense } from "react";
import Layout from "./Layout";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import Shopdetails from "./Pages/Details";
import Login from "./Pages/logind";
import OpretProfil from "./Pages/opretprofil";
import MyProfile from "./Pages/myprofile";
import Logout from "./Pages/logout";
import ChangePasswordPage from "./components/Modify";
import Orders from "./Pages/orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,



    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop/:brand?",
        element: <Shop />,
      },
      {
        path: "/shop/product/:id",
        element: <Shopdetails />,
      },      
      {
        path: "About",
        element: <About />,
      },

      {
        path: "Contact",
        element: <Contact />,
      },

      {
        path: "FAQ",
        element: <FAQ />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "opretprofil",
        element: <OpretProfil />,
      },
      {
        path: "myprofile",
        element: <MyProfile />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "orders",
        element: <Orders />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
      
    ],
  },
]);

export default router;
