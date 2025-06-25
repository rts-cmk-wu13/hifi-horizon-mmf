import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import Shopdetails from "./Pages/Details";
import { ErrorBoundary } from "./components/Error";
import Loading from "./components/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    hydrateFallbackElement: <Loading />,
    errorElement: <ErrorBoundary />,

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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
