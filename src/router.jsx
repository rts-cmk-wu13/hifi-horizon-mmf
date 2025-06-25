import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Layout from "./Layout";

// Eagerly import all pages
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import Shopdetails from "./Pages/Details";
import Login from "./Pages/logind";
import MyProfile from "./Pages/myprofile";
import OpretProfil from "./Pages/opretprofil";
import Logout from "./Pages/logout";
import ChangePasswordPage from "./components/Modify";
import Orders from "./Pages/orders";
import Kurv from "./Pages/kurv";
import Payment from "./Pages/payment";
import Invoice from "./Pages/invoice";

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
        path: "shop/:brand?",
        element: <Shop />,
      },
      {
        path: "shop/product/:id",
        element: <Shopdetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "faq",
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
        path: "kurv",
        element: <Kurv />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
