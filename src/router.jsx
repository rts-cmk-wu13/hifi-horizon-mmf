import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Layout from "./Layout";
import Spinner from "./components/load";


const Home = lazy(() => import("./Pages/Home"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Shop = lazy(() => import("./Pages/Shop"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const FAQ = lazy(() => import("./Pages/FAQ"));
const Login = lazy(() => import("./Pages/logind"));
const OpretProfil = lazy(() => import("./Pages/opretprofil"));
const MyProfile = lazy(() => import("./Pages/myprofile"));
const Logout = lazy(() => import("./Pages/logout"));
const ChangePasswordPage = lazy(() => import("./components/Modify"));
const Orders = lazy(() => import("./Pages/orders"));

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
        path: "Shop",
        element: <Shop />,
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
