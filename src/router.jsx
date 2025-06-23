import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Layout from "./Layout";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import Shopdetails from "./Pages/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <Layout />
      </Suspense>
    ),
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
        loader: async () => {
          await new Promise(res => setTimeout(res, 2000)); 
          return null;
        }
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
