import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Spinner from "./components/load"; // Use your Spinner

// Lazy load all pages
const Home = React.lazy(() => import("./Pages/Home"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Shop = React.lazy(() => import("./Pages/Shop"));
const About = React.lazy(() => import("./Pages/About"));
const Contact = React.lazy(() => import("./Pages/Contact"));
const FAQ = React.lazy(() => import("./Pages/FAQ"));
const Shopdetails = React.lazy(() => import("./Pages/Details"));
const Login = React.lazy(() => import("./Pages/logind"));
const MyProfile = React.lazy(() => import("./Pages/myprofile"));
const OpretProfil = React.lazy(() => import("./Pages/opretprofil"));
const Logout = React.lazy(() => import("./Pages/logout"));
const ChangePasswordPage = React.lazy(() => import("./components/Modify"));
const Orders = React.lazy(() => import("./Pages/orders"));
const Kurv = React.lazy(() => import("./Pages/kurv"));
const Payment = React.lazy(() => import("./Pages/payment"));
const Invoice = React.lazy(() => import("./Pages/invoice"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "shop/:brand?",
        element: (
          <Suspense fallback={<Spinner />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "shop/product/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <Shopdetails />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Spinner />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Spinner />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "faq",
        element: (
          <Suspense fallback={<Spinner />}>
            <FAQ />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Spinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "opretprofil",
        element: (
          <Suspense fallback={<Spinner />}>
            <OpretProfil />
          </Suspense>
        ),
      },
      {
        path: "myprofile",
        element: (
          <Suspense fallback={<Spinner />}>
            <MyProfile />
          </Suspense>
        ),
      },
      {
        path: "logout",
        element: (
          <Suspense fallback={<Spinner />}>
            <Logout />
          </Suspense>
        ),
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<Spinner />}>
            <ChangePasswordPage />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<Spinner />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: "kurv",
        element: (
          <Suspense fallback={<Spinner />}>
            <Kurv />
          </Suspense>
        ),
      },
      {
        path: "payment",
        element: (
          <Suspense fallback={<Spinner />}>
            <Payment />
          </Suspense>
        ),
      },
      
      {
        path: "invoice",
        element: (
          <Suspense fallback={<Spinner />}>
            <Invoice />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
